"use client";
import { useEffect, useState } from "react";
import { X, Heart, SkipForward, MapPin } from "lucide-react";
import Card from "@/components/Card";
import Feedback from "@/components/Feedback";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [lockers, setLockers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeAction, setActiveAction] = useState<{
    locker: any;
    direction: "left" | "right";
  } | null>(null);
  const [afterSubmit, setAfterSubmit] = useState<{
    name: string;
    direction: "left" | "right" | "skip";
  } | null>(null);
  const [city, setCity] = useState("Olecko");
  const [isEditingCity, setIsEditingCity] = useState(false);
  const [tempCity, setTempCity] = useState(city);

  useEffect(() => {
    const fetchLockers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/inpost?city=${city}`);
        const data = await res.json();

        if (data.items) {
          setLockers(data.items);
        } else {
          setLockers([]);
        }
      } catch (error) {
        console.error("Error while fetching parcel lockers: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLockers();
  }, [city]);

  const handleSwipe = async (direction: string, swipedLocker: any) => {
    console.log(`Swiped ${direction}: ${swipedLocker.name}`);
    if (direction === "skip") {
      setAfterSubmit({ name: swipedLocker.name, direction: "skip" });
    } else {
      setActiveAction({
        locker: swipedLocker,
        direction: direction as "left" | "right",
      });
      try {
        const { error } = await supabase.from("votes").insert([
          {
            locker_id: swipedLocker.name,
            vote_type: direction,
            reason: "",
          },
        ]);
        if (error) {
          console.error("Error while saving to Supabase: ", error);
        } else {
          console.log("Sent to supabase");
        }
      } catch (err) {
        console.error("Error with sending to supabase: ", err);
      }
    }
  };

  const handleButtonAction = (action: "left" | "right" | "skip") => {
    const topLocker = lockers[0];
    if (!topLocker) return;
    handleSwipe(action, topLocker);
  };

  const handleSelectReason = async (reason: string) => {
    if (!activeAction) return;
    const lockerToVote = activeAction.locker;
    const voteDirection = activeAction.direction;
    setAfterSubmit({
      name: activeAction.locker.name,
      direction: activeAction.direction,
    });
    setActiveAction(null);

    // pushing to supabase
    try {
      const { error } = await supabase.from("votes").insert([
        {
          locker_id: lockerToVote.name,
          vote_type: voteDirection,
          reason: reason,
        },
      ]);
      if (error) {
        console.error("Error while saving to Supabase: ", error);
      } else {
        console.log("Sent to supabase");
      }
    } catch (err) {
      console.error("Error with sending to supabase: ", err);
    }
  };

  const handleAnimationComplete = (lockerName: string) => {
    setLockers((prev) => prev.filter((l) => l.name !== lockerName));
    setAfterSubmit(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500 animate-pulse">
          Searching for InPost parcel lockers...
        </p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 overflow-hidden">
      <div className="w-80 bg-white rounded-2xl shadow-sm border border-gray-100 p-3 mb-6 flex items-center gap-3 transition-all">
        <MapPin size={20} className="text-gray-400 shrink-0" />
        {isEditingCity ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setCity(tempCity);
              setIsEditingCity(false);
            }}
            className="w-full"
          >
            <input
              type="text"
              value={tempCity}
              onChange={(e) => setTempCity(e.target.value)}
              onBlur={() => {
                setCity(tempCity);
                setIsEditingCity(false);
              }}
              autoFocus
              className="w-full outline-none text-gray-800 font-medium bg-transparent"
            />
          </form>
        ) : (
          <div
            onClick={() => setIsEditingCity(true)}
            className="w-full cursor-pointer text-gray-800 font-medium truncate"
          >
            {city}
          </div>
        )}
      </div>

      <h1 className="text-3xl font-bold mb-8 text-gray-800 tracking-tight">
        Parcel locker swiper
      </h1>

      {lockers.length === 0 ? (
        <div className="flex items-center justify-center w-80 h-[28rem] bg-white rounded-3xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-center px-4">
            All parcel lockers have been reviewed!
          </p>
        </div>
      ) : (
        <>
          <div className="relative w-80 h-[28rem]">
            {[...lockers].reverse().map((locker) => (
              <Card
                key={locker.name}
                locker={locker}
                onSwipe={handleSwipe}
                isExiting={
                  afterSubmit?.name === locker.name
                    ? afterSubmit.direction
                    : null
                }
                onExitComplete={() => handleAnimationComplete(locker.name)}
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={() => handleButtonAction("left")}
              className="w-14 h-14 flex items-center justify-center bg-white text-red-500 rounded-full shadow-lg border border-gray-100 hover:bg-red-50 transition-colors"
            >
              <X size={28} strokeWidth={3} />
            </button>

            <button
              onClick={() => handleButtonAction("skip")}
              className="w-12 h-12 flex items-center justify-center bg-white text-gray-400 rounded-full shadow-md border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <SkipForward size={20} strokeWidth={2.5} />
            </button>

            <button
              onClick={() => handleButtonAction("right")}
              className="w-14 h-14 flex items-center justify-center bg-white text-green-500 rounded-full shadow-lg border border-gray-100 hover:bg-green-50 transition-colors"
            >
              <Heart size={28} strokeWidth={3} />
            </button>
          </div>
        </>
      )}

      <Feedback
        activeAction={activeAction}
        onClose={() => setActiveAction(null)}
        onSkip={() => {
          if (!activeAction) return;
          setAfterSubmit({
            name: activeAction.locker.name,
            direction: activeAction.direction,
          });
          setActiveAction(null);
        }}
        onSelect={handleSelectReason}
      />
    </main>
  );
}
