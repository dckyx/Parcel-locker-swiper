"use client";

import { motion, AnimatePresence } from "framer-motion";

const reasons = {
  // Predefined reasons for parcel locker ratings
  parcel_locker: {
    right: [
      "Wygodny dojazd",
      "Zawsze są wolne skrytki",
      "Bezpieczna, oświetlona okolica",
      "Blisko miejsca, do którego uczęszczam",
      "Zawsze sprawny technicznie",
    ],
    left: [
      "Wiecznie przepełniony",
      "Ciężko się dostać",
      "Brak ekranu (dostęp tylko z aplikacji)",
      "Ciemne/nieprzyjemne miejsce",
      "Częste awarie",
    ],
  },
  // Predefined reasons for pickup point (POP) ratings
  pop: {
    right: [
      "Przesympatyczna obsługa",
      "Odbiór przy okazji zakupów",
      "Brak kolejek",
      "Długie godziny otwarcia",
      "Szybkie wydawanie paczek",
    ],
    left: [
      "Nieprzyjemny personel",
      "Gigantyczne kolejki",
      "Krótkie godziny otwarcia",
      "Ciężko zaparkować",
      "Trudno znaleźć wejście",
    ],
  },
};

export default function Feedback({
  activeAction,
  onClose,
  onSelect,
  onSkip,
}: any) {
  return (
    <AnimatePresence>
      {activeAction && (
        // Overlay backdrop
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center"
          onClick={onClose}
        >
          {/* Modal sheet with feedback reasons */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="bg-white w-full max-w-md rounded-t-3xl p-6 pb-12 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-5 text-center">
              {activeAction.direction === "right"
                ? "Za co lubisz ten punkt?"
                : "Co jest nie tak z tym punktem?"}
            </h3>
            {/* List of reasons to choose from */}
            <div className="flex flex-col gap-3">
              {reasons[
                (activeAction.locker.name || activeAction.locker.id || "")
                  .substring(0, 3)
                  .toUpperCase() === "POP"
                  ? "pop"
                  : "parcel_locker"
              ][activeAction.direction as "left" | "right"].map((reason) => (
                <button
                  key={reason}
                  onClick={() => onSelect(reason)}
                  className="w-full py-3 px-4 bg-gray-50 border border-gray-100 rounded-xl text-gray-700 font-medium hover:bg-gray-200 transition-colors active:scale-95"
                >
                  {reason}
                </button>
              ))}
            </div>
            {/* Skip feedback option */}
            <div className="mt-4">
              <button
                type="button"
                onClick={onSkip}
                className="w-full py-3 px-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 font-medium hover:bg-amber-100 transition-colors active:scale-95"
              >
                Pomiń
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
