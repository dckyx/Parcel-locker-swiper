import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function useSwiper(initialCity: string = "Białystok") {
  // State for storing locker list and loading state
  const [lockers, setLockers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState(initialCity);

  // Track feedback modal state (which locker and direction)
  const [activeAction, setActiveAction] = useState<{
    locker: any;
    direction: "left" | "right";
  } | null>(null);

  // Track card after vote (for exit animation)
  const [afterSubmit, setAfterSubmit] = useState<{
    name: string;
    direction: "left" | "right" | "skip";
  } | null>(null);

  // Fetch lockers from InPost API when city changes
  useEffect(() => {
    const fetchLockers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/inpost?city=${city}`);
        const data = await res.json();
        setLockers(data.items || []);
      } catch (error) {
        console.error("Błąd pobierania z API InPost: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLockers();
  }, [city]);

  // Save vote to Supabase database
  const submitVote = async (
    locker: any,
    voteDirection: string,
    reason: string,
  ) => {
    try {
      const { error } = await supabase.from("votes").insert([
        {
          locker_id: locker.name,
          vote_type: voteDirection,
          reason: reason,
          city: locker.address_details.city,
          street: locker.address_details.street,
          building_number: locker.address_details.building_number,
        },
      ]);
      if (error) {
        console.error("Błąd zapisu w Supabase: ", error);
      }
    } catch (err) {
      console.error("Nieoczekiwany błąd: ", err);
    }
  };

  // Handle card swipe - open feedback modal or skip directly
  const handleSwipe = (direction: string, swipedLocker: any) => {
    if (direction === "skip") {
      setAfterSubmit({ name: swipedLocker.name, direction: "skip" });
      return;
    }
    setActiveAction({
      locker: swipedLocker,
      direction: direction as "left" | "right",
    });
  };

  // Save vote with selected reason from modal
  const handleSelectReason = async (reason: string) => {
    if (!activeAction) return;
    const { locker, direction } = activeAction;

    setAfterSubmit({ name: locker.name, direction });
    setActiveAction(null);
    await submitVote(locker, direction, reason);
  };

  // Save vote without reason (skipped modal)
  const handleSkipReason = async () => {
    if (!activeAction) return;
    const { locker, direction } = activeAction;

    setAfterSubmit({ name: locker.name, direction });
    setActiveAction(null);
    await submitVote(locker, direction, "");
  };

  // Remove card from list after exit animation completes
  const handleAnimationComplete = (lockerName: string) => {
    setLockers((prev) => prev.filter((l) => l.name !== lockerName));
    setAfterSubmit(null);
  };

  return {
    lockers,
    loading,
    city,
    setCity,
    activeAction,
    setActiveAction,
    afterSubmit,
    handleSwipe,
    handleSelectReason,
    handleSkipReason,
    handleAnimationComplete,
  };
}
