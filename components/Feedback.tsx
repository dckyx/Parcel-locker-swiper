"use client";

import { motion, AnimatePresence } from "framer-motion";

const reasons = {
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 z-50 flex items-end justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative bg-white w-full max-w-md rounded-t-3xl p-6 pb-12 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 text-gray-500 hover:text-gray-900 focus:outline-none"
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-xl font-bold text-gray-800 mb-5 text-center">
              {activeAction.direction === "right"
                ? "Za co lubisz ten punkt?"
                : "Co jest nie tak z tym punktem?"}
            </h3>
            <div className="flex flex-col gap-3">
              {reasons[
                activeAction.locker.type[0] === "pop" ? "pop" : "parcel_locker"
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
            <button
              type="button"
              onClick={onSkip}
              className="mt-6 w-full py-3 px-4 bg-yellow-100 border border-yellow-200 rounded-xl text-yellow-900 font-semibold hover:bg-yellow-200 transition-colors"
            >
              Pomiń
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
