"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  PanInfo,
  useAnimation,
} from "framer-motion";
import { MapPin, CreditCard, Accessibility } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

export default function Card({
  locker,
  onSwipe,
  isExiting,
  onExitComplete,
}: {
  locker: any;
  onSwipe: (dir: string, locker: any) => void;
  isExiting?: string | null;
  onExitComplete?: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const controls = useAnimation();

  useEffect(() => {
    if (isExiting) {
      controls
        .start({
          x: isExiting === "left" ? -400 : isExiting === "right" ? 400 : 0,
          y: isExiting === "skip" ? 400 : 0,
          opacity: 0,
          rotate: isExiting === "left" ? -20 : isExiting === "right" ? 20 : 0,
          transition: { duration: 0.4, ease: "easeOut" },
        })
        .then(() => {
          if (onExitComplete) onExitComplete();
        });
    }
  }, [isExiting, controls, onExitComplete]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const pix = 100;
    if (info.offset.x > pix) onSwipe("right", locker);
    else if (info.offset.x < -pix) onSwipe("left", locker);
  };

  return (
    <motion.div
      animate={controls}
      style={{ x, y, rotate }}
      drag={isExiting ? false : "x"}
      dragConstraints={{ left: 0, right: 0 }} // card wents back to middle if not dragged properly
      dragElastic={0.7} // how much can be dragged out of the middle
      onDragEnd={handleDragEnd}
      className="absolute w-80 h-[28rem] bg-white rounded-3xl shadow-lg overflow-hidden cursor-grab active:cursor-grabbing border border-gray-100 will-change-transform"
    >
      {/* photo */}
      <div className="h-1/2 bg-gray-100 relative">
        <Image
          src={
            locker.image_url ||
            "https://via.placeholder.com/400x200?text=Brak+zdjęcia"
          }
          alt={locker.name || "Paczkomat"}
          fill
          className="object-cover pointer-events-none"
        />
      </div>

      {/* description */}
      <div className="p-5 flex flex-col justify-between h-1/2 bg-white">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{locker.name}</h2>
          <p className="text-sm text-gray-500 mt-2 flex items-start gap-1">
            <MapPin size={16} className="shrink-0 mt-0.5 text-gray-400" />{" "}
            {locker.address_details.city}, ul. {locker.address.line1}
          </p>
        </div>

        {/* tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {locker.easy_access_zone && (
            <span className="flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-100 text-xs px-2 py-1 rounded-full">
              <Accessibility size={12} /> Ułatwiony dostęp{" "}
            </span>
          )}
          {locker.payment_available && (
            <span className="flex items-center gap-1 bg-green-50 text-green-700 border boerder-green-100 text-xs px-2 py-1 rounded-full">
              <CreditCard size={12} /> Płacisz na miejscu{" "}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
