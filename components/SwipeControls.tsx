import { X, Heart, SkipForward } from "lucide-react";

interface SwipeControlsProps {
  onAction: (action: "left" | "right" | "skip") => void;
}

export default function SwipeControls({ onAction }: SwipeControlsProps) {
  return (
    <div className="flex items-center justify-center gap-6 mt-8">
      {/* Dislike button */}
      <button
        onClick={() => onAction("left")}
        className="w-14 h-14 flex items-center justify-center bg-white text-red-500 rounded-full shadow-lg border border-gray-100 hover:bg-red-50 transition-colors"
      >
        <X size={28} strokeWidth={3} />
      </button>

      {/* Skip button */}
      <button
        onClick={() => onAction("skip")}
        className="w-12 h-12 flex items-center justify-center bg-white text-gray-400 rounded-full shadow-md border border-gray-100 hover:bg-gray-50 transition-colors"
      >
        <SkipForward size={20} strokeWidth={2.5} />
      </button>

      {/* Like button */}
      <button
        onClick={() => onAction("right")}
        className="w-14 h-14 flex items-center justify-center bg-white text-green-500 rounded-full shadow-lg border border-gray-100 hover:bg-green-50 transition-colors"
      >
        <Heart size={28} strokeWidth={3} />
      </button>
    </div>
  );
}
