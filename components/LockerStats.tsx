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

export default function LockerStats({
  data,
  lockerId,
}: {
  data: any;
  lockerId: string;
}) {
  if (!data || !lockerId) return null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-bold text-gray-800">
        Szczegóły: {lockerId}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <h2 className="text-lg font-bold mb-2 text-gray-800 text-center">
            Likes vs Dislikes
          </h2>
          <div className="h-64 flex-1">
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
            Feedback pozytywny
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
            Feedback negatywny
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
