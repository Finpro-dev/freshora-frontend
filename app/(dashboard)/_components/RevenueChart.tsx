"use client";

const CHART_BARS = [
  { month: "Jan", value: 65 },
  { month: "Feb", value: 45 },
  { month: "Mar", value: 75 },
  { month: "Apr", value: 85 },
  { month: "May", value: 55 },
  { month: "Jun", value: 90 },
  { month: "Jul", value: 70 },
  { month: "Aug", value: 80 },
  { month: "Sep", value: 95 },
  { month: "Oct", value: 60 },
  { month: "Nov", value: 78 },
  { month: "Dec", value: 88 },
];

export default function RevenueChart() {
  return (
    <div className="xl:col-span-2 bg-white rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-brand-mist-800">
            Revenue Overview
          </h3>
          <p className="text-sm text-brand-mist-500">
            Monthly revenue performance
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-brand-emerald-500" />
            <span className="text-sm text-brand-mist-600">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-brand-mist-300" />
            <span className="text-sm text-brand-mist-600">Target</span>
          </div>
        </div>
      </div>
      <div className="h-64 flex items-end gap-2 md:gap-4">
        {CHART_BARS.map((bar) => (
          <div
            key={bar.month}
            className="flex-1 flex flex-col items-center gap-2"
          >
            <div
              className="w-full bg-brand-emerald-500/80 rounded-t-md hover:bg-brand-emerald-600 transition-colors"
              style={{ height: `${bar.value}%` }}
            />
            <span className="text-xs text-brand-mist-500 font-medium">
              {bar.month}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
