"use client";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const TOP_PRODUCTS = [
  {
    name: "Organic Tomatoes",
    sold: 234,
    revenue: "Rp 28.5M",
    trend: "up" as const,
  },
  {
    name: "Fresh Apples",
    sold: 189,
    revenue: "Rp 18.2M",
    trend: "up" as const,
  },
  {
    name: "Whole Milk",
    sold: 156,
    revenue: "Rp 12.4M",
    trend: "down" as const,
  },
  {
    name: "Sourdough Bread",
    sold: 98,
    revenue: "Rp 8.7M",
    trend: "up" as const,
  },
];

export default function TopProducts() {
  return (
    <div className="bg-white rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-brand-mist-800">
          Top Products
        </h3>
        <button className="text-sm text-brand-emerald-600 hover:text-brand-emerald-700 font-medium">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {TOP_PRODUCTS.map((product, index) => (
          <div key={product.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-mist-100 flex items-center justify-center text-sm font-bold text-brand-mist-600">
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-brand-mist-800">
                  {product.name}
                </p>
                <p className="text-xs text-brand-mist-500">
                  {product.sold} sold
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-brand-mist-800">
                {product.revenue}
              </p>
              <div
                className={`flex items-center justify-end gap-1 text-xs ${
                  product.trend === "up"
                    ? "text-brand-emerald-600"
                    : "text-red-600"
                }`}
              >
                {product.trend === "up" ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
