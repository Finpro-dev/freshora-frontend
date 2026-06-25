"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SalesOverviewChartProps {
  data: any[];
  isLoading: boolean;
  xAxisDataKey: string;
  isSingleMonth: boolean;
}

export default function SalesOverviewChart({
  data,
  isLoading,
  xAxisDataKey,
  isSingleMonth,
}: SalesOverviewChartProps) {
  return (
    <div className="bg-white rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
      <h3 className="text-lg font-semibold text-brand-mist-800 mb-4">
        {isSingleMonth ? "Daily Sales Overview" : "Monthly Sales Overview"}
      </h3>
      <div className="h-80">
        {isLoading ? (
          <div className="h-full flex items-center justify-center text-brand-mist-400 text-sm">
            Loading chart data...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey={xAxisDataKey} stroke="#64748b" />
              <YAxis
                stroke="#64748b"
                tickFormatter={(v) => `Rp${(v / 1000000).toFixed(1)}jt`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderColor: "#e2e8f0",
                }}
              />
              <Legend />
              <Bar
                dataKey="totalSales"
                fill="#059669"
                name="Total Sales"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
