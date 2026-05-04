"use client";
import { AnimatePresence } from "framer-motion";
import Card from "@/components/Card";
import Feedback from "@/components/Feedback";
import LocationHeader from "@/components/LocationHeader";
import SwipeControls from "@/components/SwipeControls";
import { useSwiper } from "@/hooks/useSwiper";

export default function Home() {
  // Load swiper state and handlers from custom hook
  const {
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
  } = useSwiper("Białystok");

  // Show only top 2 cards in the stack
  const visibleLockers = lockers.slice(0, 2);

  // Handle button clicks - swipe the top card
  const handleButtonAction = (action: "left" | "right" | "skip") => {
    const topLocker = lockers[0];
    if (topLocker) handleSwipe(action, topLocker);
  };

  // Show loading state
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
      {/* Location selector at top */}
      <LocationHeader city={city} setCity={setCity} />

      <h1 className="text-3xl font-bold mb-8 text-gray-800 tracking-tight">
        Parcel locker swiper
      </h1>

      {/* Empty state or card stack */}
      {lockers.length === 0 ? (
        <div className="flex items-center justify-center w-80 h-[28rem] bg-white rounded-3xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-center px-4">
            All parcel lockers have been reviewed!
          </p>
        </div>
      ) : (
        <>
          {/* Draggable card stack */}
          <div className="relative w-80 h-[28rem]">
            <AnimatePresence initial={false}>
              {[...visibleLockers].reverse().map((locker, index) => (
                <Card
                  key={locker.name}
                  locker={locker}
                  onSwipe={handleSwipe}
                  isNext={visibleLockers.length === 2 && index === 0}
                  isExiting={
                    afterSubmit && afterSubmit.name === locker.name
                      ? afterSubmit.direction
                      : null
                  }
                  onExitComplete={() => handleAnimationComplete(locker.name)}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Control buttons */}
          <SwipeControls onAction={handleButtonAction} />
        </>
      )}

      {/* Feedback modal */}
      <Feedback
        activeAction={activeAction}
        onClose={() => setActiveAction(null)}
        onSkip={handleSkipReason}
        onSelect={handleSelectReason}
      />
    </main>
  );
}
