"use client";

import { TrendingUp, Package } from "lucide-react";

interface Tab {
  id: "sales" | "stock";
  label: string;
  icon: typeof TrendingUp;
}

interface ReportTabsProps {
  activeTab: "sales" | "stock";
  onTabChange: (tab: "sales" | "stock") => void;
}

const tabs: Tab[] = [
  { id: "sales", label: "Sales Report", icon: TrendingUp },
  { id: "stock", label: "Stock Report", icon: Package },
];

export default function ReportTabs({
  activeTab,
  onTabChange,
}: ReportTabsProps) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === tab.id
              ? "bg-brand-emerald-100 text-brand-emerald-700"
              : "text-brand-mist-600 hover:bg-brand-mist-100"
          }`}
        >
          <tab.icon className="w-4 h-4" />
          {tab.label}
        </button>
      ))}
    </div>
  );
}
