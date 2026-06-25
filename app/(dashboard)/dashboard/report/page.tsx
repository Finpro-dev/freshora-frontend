"use client";

import { useState } from "react";
import { ChevronDown, Package, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useAuthStore } from "@/shared/store/auth-store/AuthStoreProvider";
import { useMonthlySalesReport, useSalesByCategory, useSalesByProduct, useStockSummary, useStockDetail, useStores } from "./_hooks/use-report";
import { SalesByProductTable } from "./_components/SalesByProductTable";
import { StockHistoryTable } from "./_components/StockHistoryTable";
import { StockSummaryTable } from "./_components/StockSummaryTable";

const CHART_COLORS = ["#059669", "#0891b2", "#7c3aed", "#f59e0b", "#ef4444", "#14b8a6"];

const monthOptions = [
  { value: 0, label: "All Months" },
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

export default function ReportPage() {
  const role = useAuthStore((state) => state.role);
  const [activeTab, setActiveTab] = useState<"sales" | "stock">("sales");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(0);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  
  const { data: stores } = useStores();
  const isSuperAdmin = role === "SUPER_ADMIN";

  const { data: monthlySales, error: monthlySalesError, isLoading: isLoadingMonthly } = useMonthlySalesReport({ year, month, storeId: isSuperAdmin ? selectedStoreId : null });
  const { data: salesByCategory, error: salesByCategoryError } = useSalesByCategory({ year, month, storeId: isSuperAdmin ? selectedStoreId : null });
  const { data: salesByProduct } = useSalesByProduct({ year, month, storeId: isSuperAdmin ? selectedStoreId : null });
  const { data: stockSummary } = useStockSummary({ year, month, storeId: isSuperAdmin ? selectedStoreId : null });
  const { data: stockDetail } = useStockDetail({ 
    year, 
    month: month > 0 ? month : new Date().getMonth() + 1, 
    storeId: isSuperAdmin ? selectedStoreId : null,
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const tabs = [
    { id: "sales", label: "Sales Report", icon: TrendingUp },
    { id: "stock", label: "Stock Report", icon: Package },
  ];

  return (
    <div className="min-h-dvh p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-mist-800">Reports & Analysis</h1>
          <p className="text-brand-mist-500">View and analyze sales and stock reports</p>
        </div>
        <div className="flex items-center gap-3">
          {isSuperAdmin && (
            <div className="relative">
              <select
                value={selectedStoreId || ""}
                onChange={(e) => setSelectedStoreId(e.target.value || null)}
                className="appearance-none px-4 py-2.5 pr-10 rounded-lg border border-brand-mist-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm"
              >
                <option value="">All Stores</option>
                {(stores || []).map((store: { storeId: string; name: string }) => (
                  <option key={store.storeId} value={store.storeId}>{store.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-mist-500 pointer-events-none" />
            </div>
          )}
<select
             value={year}
             onChange={(e) => setYear(Number(e.target.value))}
             className="appearance-none px-4 py-2.5 pr-10 rounded-lg border border-brand-mist-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm"
           >
             <option value={2024}>2024</option>
             <option value={2025}>2025</option>
             <option value={2026}>2026</option>
             <option value={2027}>2027</option>
             <option value={2028}>2028</option>
           </select>
          <div className="relative">
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="appearance-none px-4 py-2.5 pr-10 rounded-lg border border-brand-mist-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-emerald-500 text-sm"
            >
              {monthOptions.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-mist-500 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "sales" | "stock")}
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

      {activeTab === "sales" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
            <h3 className="text-lg font-semibold text-brand-mist-800 mb-4">Monthly Sales Overview</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlySales?.months || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="monthName" stroke="#64748b" />
                  <YAxis stroke="#64748b" tickFormatter={(v) => `Rp${(v / 1000000).toFixed(1)}jt`} />
                  <Tooltip contentStyle={{ backgroundColor: "#fff", borderColor: "#e2e8f0" }} />
                  <Legend />
                  <Bar dataKey="totalSales" fill="#059669" name="Total Sales" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
              <h3 className="text-lg font-semibold text-brand-mist-800 mb-4">Sales by Category</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={salesByCategory || []}
                      dataKey="totalSales"
                      nameKey="categoryName"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      labelLine={false}
                    >
                      {(salesByCategory || []).map((_: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#fff", borderColor: "#e2e8f0" }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
              <h3 className="text-lg font-semibold text-brand-mist-800 mb-4">Sales by Product</h3>
              <div className="h-80 overflow-y-auto">
                <SalesByProductTable data={salesByProduct || []} />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "stock" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
            <h3 className="text-lg font-semibold text-brand-mist-800 mb-4">Stock Summary by Product</h3>
            <div className="h-80 overflow-y-auto">
              <StockSummaryTable data={stockSummary || []} />
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
            <h3 className="text-lg font-semibold text-brand-mist-800 mb-4">Stock History Detail</h3>
            <div className="h-80 overflow-y-auto">
              <StockHistoryTable data={stockDetail?.journals || []} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}