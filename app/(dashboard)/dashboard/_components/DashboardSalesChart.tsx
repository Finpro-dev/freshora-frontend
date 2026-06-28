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

interface SalesData {
  monthName?: string;
  dayName?: string;
  totalSales: number;
}

interface DashboardSalesChartProps {
  data: SalesData[];
}

export default function DashboardSalesChart({
  data,
}: DashboardSalesChartProps) {
  const xAxisKey =
    data.length > 0 && "dayName" in data[0] ? "dayName" : "monthName";

  return (
    <div className="bg-brand-mist-100/10 rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
      <h3 className="text-lg font-semibold text-brand-mist-800 mb-4">
        Sales Overview
      </h3>
      <div className="h-64">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-brand-mist-400 text-sm">
            No sales data available
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
                dataKey={xAxisKey}
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
                formatter={(value) => [
                  `Rp ${Number(value ?? 0).toLocaleString("id-ID")}`,
                  "Sales",
                ]}
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
                fill="currentColor"
                className="text-brand-emerald-600"
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
