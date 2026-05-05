"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  PanInfo,
  useAnimation,
} from "framer-motion";
import {
  MapPin,
  CreditCard,
  Accessibility,
  Clock,
  Info,
  Building,
  TreePine,
} from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

export default function Card({
  locker,
  onSwipe,
  isExiting,
  onExitComplete,
  isNext,
}: {
  locker: any;
  onSwipe: (dir: string, locker: any) => void;
  isExiting?: string | null;
  onExitComplete?: () => void;
  isNext?: boolean;
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

  const handleDragEnd = (_event: unknown, info: PanInfo) => {
    const pix = 100;
    if (info.offset.x > pix) onSwipe("right", locker);
    else if (info.offset.x < -pix) onSwipe("left", locker);
  };

  return (
    <motion.div
      style={{ x, y, rotate, zIndex: isNext ? 0 : 1 }}
      animate={controls}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      className="absolute w-80 h-[28rem] bg-white rounded-3xl shadow-lg overflow-hidden cursor-grab active:cursor-grabbing border border-gray-100 will-change-transform flex flex-col"
    >
      {/* Photo */}
      <div className="h-1/2 bg-gray-100 relative shrink-0">
        <Image
          src={
            locker.image_url ||
            "https://via.placeholder.com/400x200?text=Brak+zdjęcia"
          }
          alt={locker.name || "Paczkomat"}
          fill
          className="object-cover pointer-events-none"
          sizes="(max-width: 768px) 100vw, 320px"
        />
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col h-1/2 bg-white overflow-y-auto custom-scrollbar">
        {/* header and address */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 leading-tight">
            {locker.name}
          </h2>
          <p className="text-xs text-gray-500 mt-1.5 flex items-start gap-1.5">
            <MapPin size={14} className="shrink-0 mt-0.5 text-gray-400" />
            <span>
              ul. {locker.address_details?.street}{" "}
              {locker.address_details?.building_number},<br />
              {locker.address_details?.post_code} {locker.address_details?.city}
            </span>
          </p>
        </div>

        {/* localisation and opening hours */}
        <div className="mt-3 space-y-2">
          {locker.location_description && (
            <p className="text-xs text-gray-600 flex items-start gap-1.5 leading-snug">
              <Info size={14} className="shrink-0 mt-0.5 text-blue-500" />
              {locker.location_description}
            </p>
          )}

          <p className="text-xs text-gray-700 flex items-start gap-1.5 font-medium">
            <Clock size={14} className="shrink-0 mt-0.5 text-orange-500" />
            {locker.location_247
              ? "Czynne 24/7"
              : locker.opening_hours || "Brak danych o godzinach"}
          </p>
        </div>

        {/* badges */}
        <div className="flex flex-wrap gap-2 mt-auto pt-4">
          {/* outdoor/indoor */}
          {locker.location_type && (
            <span className="flex items-center gap-1 bg-gray-50 text-gray-600 border border-gray-200 text-[10px] px-2 py-1 rounded-full font-medium">
              {locker.location_type === "Indoor" ? (
                <>
                  <Building size={12} /> Wewnątrz
                </>
              ) : (
                <>
                  <TreePine size={12} /> Na zewnątrz
                </>
              )}
            </span>
          )}

          {/* easy access */}
          {locker.easy_access_zone && (
            <span className="flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-100 text-[10px] px-2 py-1 rounded-full font-medium">
              <Accessibility size={12} /> Ułatwiony dostęp
            </span>
          )}

          {/* payment */}
          {locker.payment_available && (
            <span
              className="flex items-center gap-1 bg-green-50 text-green-700 border border-green-100 text-[10px] px-2 py-1 rounded-full font-medium"
              title={locker.payment_point_descr}
            >
              <CreditCard size={12} /> Płacisz na miejscu
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
