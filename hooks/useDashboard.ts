import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function useDashboard() {
  // All votes from database
  const [votes, setVotes] = useState<any[]>([]);
  // List of unique cities from votes
  const [cities, setCities] = useState<string[]>([]);
  // Currently selected city for filtering
  const [selectedCity, setSelectedCity] = useState<string>("");

  // Lockers in selected city
  const [lockers, setLockers] = useState<string[]>([]);
  // Currently selected locker for detailed view
  const [selectedLocker, setSelectedLocker] = useState<string>("");

  // Fetch all votes on component mount
  useEffect(() => {
    const fetchVotes = async () => {
      const { data, error } = await supabase.from("votes").select("*");
      if (error) {
        console.error("Błąd pobierania z Supabase:", error);
        return;
      }
      if (data) {
        setVotes(data);
        const uniqueCities = Array.from(
          new Set(data.map((v) => v.city)),
        ).filter(Boolean) as string[];
        setCities(uniqueCities);
      }
    };
    fetchVotes();
  }, []);

  // Update lockers list when city selection changes
  useEffect(() => {
    if (cities.includes(selectedCity)) {
      const cityVotes = votes.filter((v) => v.city === selectedCity);
      const uniqueLockers = Array.from(
        new Set(cityVotes.map((v) => v.locker_id)),
      ).filter(Boolean) as string[];
      setLockers(uniqueLockers);

      // Reset selected locker if not in current city
      if (!uniqueLockers.includes(selectedLocker)) {
        setSelectedLocker("");
      }
    } else {
      setLockers([]);
      setSelectedLocker("");
    }
  }, [selectedCity, votes, cities]);

  return {
    votes,
    cities,
    selectedCity,
    setSelectedCity,
    lockers,
    selectedLocker,
    setSelectedLocker,
  };
}
