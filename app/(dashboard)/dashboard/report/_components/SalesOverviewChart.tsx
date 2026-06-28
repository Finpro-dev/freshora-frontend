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
    <div className="bg-brand-mist-100/10 rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
      <h3 className="text-lg font-semibold text-brand-mist-800 mb-4">
        {isSingleMonth ? "Daily Sales Overview" : "Monthly Sales Overview"}
      </h3>
      <div className="h-80">
        {isLoading ? (
          <div className="h-full flex items-center justify-center text-brand-mist-500 text-sm">
            Loading chart data...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="currentColor"
                className="text-brand-mist-200"
              />
              <XAxis
                dataKey={xAxisDataKey}
                stroke="currentColor"
                className="text-brand-mist-500"
                fontSize={12}
              />
              <YAxis
                stroke="currentColor"
                className="text-brand-mist-500"
                tickFormatter={(v) => `Rp${(v / 1000000).toFixed(1)}jt`}
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--brand-mist-100)",
                  borderColor: "var(--brand-mist-300)",
                  borderRadius: "8px",
                  color: "var(--foreground)",
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
