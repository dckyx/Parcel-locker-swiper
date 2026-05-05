"use client";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function CityStats({
  data,
  onChartClick,
  filter,
  setFilter,
}: {
  data: any;
  onChartClick: (state: any) => void;
  filter: "all" | "parcel_locker" | "pop";
  setFilter: (val: "all" | "parcel_locker" | "pop") => void;
}) {
  if (!data) return null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Przełącznik filtrów */}
      <div className="flex justify-center gap-2 bg-white p-1.5 rounded-xl shadow-sm border border-gray-100 w-fit mx-auto">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "all"
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Wszystkie
        </button>
        <button
          onClick={() => setFilter("parcel_locker")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "parcel_locker"
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Tylko Paczkomaty
        </button>
        <button
          onClick={() => setFilter("pop")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === "pop"
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Tylko Punkty POP
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-6 text-gray-800">
            Top 5 (Najlepszy bilans)
          </h2>
          <div className="h-64">
            <ResponsiveContainer
              width="100%"
              height="100%"
              minWidth={0}
              minHeight={0}
            >
              <BarChart
                data={data.top}
                onClick={onChartClick}
                style={{ cursor: "pointer" }}
              >
                <XAxis dataKey="name" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    color: "#111827",
                    backgroundColor: "#ffffff",
                  }}
                />
                <Legend />
                <Bar dataKey="likes" stackId="a" fill="#10B981" name="Likes" />
                <Bar
                  dataKey="dislikes"
                  stackId="a"
                  fill="#EF4444"
                  radius={[4, 4, 0, 0]}
                  name="Dislikes"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-6 text-gray-800">
            Flop 5 (Najgorszy bilans)
          </h2>
          <div className="h-64">
            <ResponsiveContainer
              width="100%"
              height="100%"
              minWidth={0}
              minHeight={0}
            >
              <BarChart
                data={data.flop}
                onClick={onChartClick}
                style={{ cursor: "pointer" }}
              >
                <XAxis dataKey="name" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    color: "#111827",
                    backgroundColor: "#ffffff",
                  }}
                />
                <Legend />
                <Bar dataKey="likes" stackId="a" fill="#10B981" name="Likes" />
                <Bar
                  dataKey="dislikes"
                  stackId="a"
                  fill="#EF4444"
                  radius={[4, 4, 0, 0]}
                  name="Dislikes"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <h2 className="text-lg font-bold mb-2 text-gray-800 text-center">
            Ogółem w mieście
          </h2>
          <div className="h-64">
            <ResponsiveContainer
              width="100%"
              height="100%"
              minWidth={0}
              minHeight={0}
            >
              <PieChart>
                <Pie
                  data={data.pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#10B981" />
                  <Cell fill="#EF4444" />
                </Pie>
                <Tooltip
                  contentStyle={{
                    color: "#111827",
                    backgroundColor: "#ffffff",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-2 text-gray-800 text-center">
            Top powody pozytywne
          </h2>
          <div className="h-64">
            <ResponsiveContainer
              width="100%"
              height="100%"
              minWidth={0}
              minHeight={0}
            >
              <BarChart data={data.topReasonsRight}>
                <XAxis
                  dataKey="name"
                  fontSize={10}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  direction="right"
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    color: "#111827",
                    backgroundColor: "#ffffff",
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="#10B981"
                  radius={[4, 4, 0, 0]}
                  name="Ilość"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-2 text-gray-800 text-center">
            Top powody negatywne
          </h2>
          <div className="h-64">
            <ResponsiveContainer
              width="100%"
              height="100%"
              minWidth={0}
              minHeight={0}
            >
              <BarChart data={data.topReasonsLeft}>
                <XAxis
                  dataKey="name"
                  fontSize={10}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    color: "#111827",
                    backgroundColor: "#ffffff",
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="#EF4444"
                  radius={[4, 4, 0, 0]}
                  name="Ilość"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
