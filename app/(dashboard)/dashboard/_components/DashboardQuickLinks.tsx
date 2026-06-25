"use client";

import {
  Package,
  Store,
  Users,
  Tag,
  ClipboardList,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

const quickLinks = [
  {
    href: "/dashboard/product",
    label: "Products",
    icon: Package,
    color: "bg-blue-500",
  },
  {
    href: "/dashboard/store",
    label: "Stores",
    icon: Store,
    color: "bg-emerald-500",
  },
  {
    href: "/dashboard/people",
    label: "People",
    icon: Users,
    color: "bg-purple-500",
  },
  {
    href: "/dashboard/promotion",
    label: "Promotions",
    icon: Tag,
    color: "bg-amber-500",
  },
  {
    href: "/dashboard/inventory",
    label: "Inventory",
    icon: ClipboardList,
    color: "bg-cyan-500",
  },
  {
    href: "/dashboard/report",
    label: "Reports",
    icon: ClipboardList,
    color: "bg-rose-500",
  },
];

export default function DashboardQuickLinks() {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
      <h3 className="text-lg font-semibold text-brand-mist-800 mb-4">
        Quick Access
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {quickLinks.map((link) => {
          const Icon = link.icon;
          return (
            <button
              key={link.href}
              onClick={() => router.push(link.href)}
              className="group flex flex-col items-center gap-2 p-4 rounded-xl border border-brand-mist-200 hover:border-brand-mist-300 hover:shadow-md transition-all"
            >
              <div
                className={`p-3 rounded-xl ${link.color} text-white group-hover:scale-110 transition-transform`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-brand-mist-700">
                {link.label}
              </span>
              <ArrowRight className="w-3 h-3 text-brand-mist-400 group-hover:text-brand-mist-600 group-hover:translate-x-0.5 transition-all" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
