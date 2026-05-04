"use client";
import { useDashboard } from "@/hooks/useDashboard";
import { getCityChartsData, getLockerChartsData } from "@/lib/analytics";
import CityStats from "@/components/CityStats";
import LockerStats from "@/components/LockerStats";

export default function AdminPanel() {
  // Load votes, cities, and selected filters from dashboard
  const {
    votes,
    cities,
    selectedCity,
    setSelectedCity,
    lockers,
    selectedLocker,
    setSelectedLocker,
  } = useDashboard();

  // Calculate chart data based on selected city and locker
  const cityCharts = getCityChartsData(votes, selectedCity);
  const lockerCharts = getLockerChartsData(votes, selectedLocker);

  // Handle clicking on chart to select specific locker
  const handleChartClick = (state: any) => {
    if (state && state.activeLabel) setSelectedLocker(state.activeLabel);
  };

  // Determine if we're showing city overview or locker details
  const isCityView =
    cities.includes(selectedCity) && !selectedLocker && cityCharts;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page header with back button */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Panel Analityczny
          </h1>
          {selectedLocker && (
            <button
              onClick={() => setSelectedLocker("")}
              className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition"
            >
              Wróć do widoku miasta
            </button>
          )}
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
              placeholder="Zacznij wpisywać..."
              className="p-2 border border-gray-200 rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-blue-500 transition-all"
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
                  ? "Zacznij wpisywać..."
                  : "Najpierw wpisz miasto"
              }
              className="p-2 border border-gray-200 rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <datalist id="lockers-list">
              {lockers.map((locker) => (
                <option key={locker} value={locker} />
              ))}
            </datalist>
          </div>
        </div>

        {/* City overview - shows top/flop lockers and overall stats */}
        {isCityView && (
          <CityStats data={cityCharts} onChartClick={handleChartClick} />
        )}

        {/* Locker details - shows specific locker analytics */}
        {selectedLocker && (
          <LockerStats data={lockerCharts} lockerId={selectedLocker} />
        )}
      </div>
    </div>
  );
}
