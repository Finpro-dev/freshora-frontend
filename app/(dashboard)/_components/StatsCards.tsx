"use client";

import {
  Users,
  ShoppingBag,
  Package,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const STATS = [
  {
    title: "Total Users",
    value: "2,543",
    change: "+12.5%",
    trend: "up" as const,
    icon: Users,
    color:
      "bg-brand-emerald-100 text-brand-emerald-700 border-brand-emerald-200",
  },
  {
    title: "Total Orders",
    value: "1,234",
    change: "+8.2%",
    trend: "up" as const,
    icon: ShoppingBag,
    color: "bg-blue-100 text-blue-700 border-blue-200",
  },
  {
    title: "Products",
    value: "856",
    change: "+3.1%",
    trend: "up" as const,
    icon: Package,
    color: "bg-purple-100 text-purple-700 border-purple-200",
  },
  {
    title: "Revenue",
    value: "Rp 45.2M",
    change: "-2.4%",
    trend: "down" as const,
    icon: DollarSign,
    color: "bg-amber-100 text-amber-700 border-amber-200",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      {STATS.map((stat) => (
        <div
          key={stat.title}
          className="bg-white rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg border ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <button className="p-2 rounded-lg hover:bg-brand-mist-200 transition-colors">
              <TrendingUp className="w-5 h-5 text-brand-mist-500" />
            </button>
          </div>
          <div>
            <h3 className="text-sm font-medium text-brand-mist-500 mb-1">
              {stat.title}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-brand-mist-800">
                {stat.value}
              </p>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === "up"
                    ? "text-brand-emerald-600"
                    : "text-red-600"
                }`}
              >
                {stat.trend === "up" ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {stat.change}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
