import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";

export default function LocationHeader({
  city,
  setCity,
}: {
  city: string;
  setCity: (c: string) => void;
}) {
  const [isEditingCity, setIsEditingCity] = useState(false);
  const [tempCity, setTempCity] = useState(city);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setCity(tempCity);
    setIsEditingCity(false);
  };

  return (
    <div className="w-50 bg-white rounded-2xl shadow-sm border border-gray-100 p-3 mb-6 flex items-center gap-3 transition-all mt-6 md:mt-0 md:w-80">
      <MapPin size={20} className="text-gray-400 shrink-0" />
      {/* Toggle between edit and view mode */}
      {isEditingCity ? (
        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="text"
            value={tempCity}
            onChange={(e) => setTempCity(e.target.value)}
            onBlur={() => handleSubmit()}
            autoFocus
            className="w-full outline-none text-gray-800 font-medium bg-transparent"
          />
        </form>
      ) : (
        <div
          onClick={() => {
            setIsEditingCity(true);
            setTempCity(city);
          }}
          className="w-full cursor-pointer text-gray-800 font-medium truncate"
        >
          {city}
        </div>
      )}
    </div>
  );
}
