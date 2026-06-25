"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SalesByCategoryChartProps {
  data: any[];
  colors: string[];
}

export default function SalesByCategoryChart({
  data,
  colors,
}: SalesByCategoryChartProps) {
  return (
    <div className="bg-white rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
      <h3 className="text-lg font-semibold text-brand-mist-800 mb-4">
        Sales by Category
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="totalSales"
              nameKey="categoryName"
              cx="50%"
              cy="50%"
              outerRadius={100}
              labelLine={false}
            >
              {data.map((_: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", borderColor: "#e2e8f0" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
