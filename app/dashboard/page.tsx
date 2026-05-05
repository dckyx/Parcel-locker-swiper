"use client";
import { useDashboard } from "@/hooks/useDashboard";
import { getCityChartsData, getLockerChartsData } from "@/lib/analytics";
import CityStats from "@/components/CityStats";
import LockerStats from "@/components/LockerStats";
import Link from "next/link";
import { Package } from "lucide-react";
import { useState } from "react";
import Footer from "@/components/Footer";
export default function AdminPanel() {
  const {
    votes,
    cities,
    selectedCity,
    setSelectedCity,
    lockers,
    selectedLocker,
    setSelectedLocker,
  } = useDashboard();

  const [statsFilter, setStatsFilter] = useState<
    "all" | "parcel_locker" | "pop"
  >("all");

  const cityCharts = getCityChartsData(votes, selectedCity, statsFilter);
  const lockerCharts = getLockerChartsData(votes, selectedLocker);

  const handleChartClick = (state: any) => {
    if (state && state.activeLabel) setSelectedLocker(state.activeLabel);
  };

  const isCityView =
    cities.includes(selectedCity) && !selectedLocker && cityCharts;

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-8">
        {/* switch to main app button */}
        <Link
          href="/"
          className="absolute top-6 right-6 p-3 bg-white rounded-xl shadow-sm border-gray-100 text-gray-400 hover:text-blue-500 hover:shadow-md transition-all group"
          title="Main app"
        >
          <Package size={24} />
        </Link>
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Page header with back button */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              Dashboard
            </h1>
          </div>

          {/* City and locker input filters */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap gap-4">
            <div className="flex flex-col gap-2 w-64">
              <label className="text-sm font-medium text-gray-500">
                Wpisz miasto
              </label>
              <input
                type="text"
                list="cities-list"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                placeholder="Np. Białystok"
                className="p-2 border border-gray-200 rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-blue-500 transition-all text-black"
              />
              <datalist id="cities-list">
                {cities.map((city) => (
                  <option key={city} value={city} />
                ))}
              </datalist>
            </div>

            <div className="flex flex-col gap-2 w-64">
              <label className="text-sm font-medium text-gray-500">
                Wpisz paczkomat
              </label>
              <input
                type="text"
                list="lockers-list"
                value={selectedLocker}
                onChange={(e) => setSelectedLocker(e.target.value)}
                disabled={!cities.includes(selectedCity)}
                placeholder={
                  cities.includes(selectedCity)
                    ? "Np. BIA01A"
                    : "Najpierw wpisz miasto"
                }
                className="p-2 border border-gray-200 rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-black"
              />
              <datalist id="lockers-list">
                {lockers.map((locker) => (
                  <option key={locker} value={locker} />
                ))}
              </datalist>
            </div>
          </div>
          {selectedLocker && (
            <button
              onClick={() => setSelectedLocker("")}
              className="px-4 py-2 text-sm hover:bg-gray-300 text-gray-700 bg-gray-100 rounded-lg transition "
            >
              Wróć do widoku miasta
            </button>
          )}
          {/* City overview - shows top/flop lockers and overall stats */}
          {isCityView && (
            <CityStats
              data={cityCharts}
              onChartClick={handleChartClick}
              filter={statsFilter}
              setFilter={setStatsFilter}
            />
          )}

          {selectedLocker && (
            <LockerStats data={lockerCharts} lockerId={selectedLocker} />
          )}
        </div>
        <Footer className="mt-12 pb-8" />{" "}
      </div>
    </>
  );
}
