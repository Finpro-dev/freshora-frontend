"use client";

import { useState } from "react";
import { useAuthStore } from "@/shared/store/auth-store/AuthStoreProvider";
import {
  useMonthlySalesReport,
  useSalesByCategory,
  useSalesByProduct,
  useStockSummary,
  useStockDetail,
  useStores,
} from "./_hooks/use-report";

import ReportHeader from "./_components/ReportHeader";
import ReportFilters from "./_components/ReportFilters";
import ReportTabs from "./_components/ReportTabs";
import SalesOverviewChart from "./_components/SalesOverviewChart";
import SalesByCategoryChart from "./_components/SalesByCategoryChart";
import { SalesByProductTable } from "./_components/SalesByProductTable";
import StockReportSection from "./_components/StockReportSection";

const CHART_COLORS = [
  "#059669",
  "#0891b2",
  "#7c3aed",
  "#f59e0b",
  "#ef4444",
  "#14b8a6",
];

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
  const isSuperAdmin = role === "SUPER_ADMIN";

  const [activeTab, setActiveTab] = useState<"sales" | "stock">("sales");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(0);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

  const { data: stores } = useStores();

  const { data: monthlySales, isLoading: isLoadingMonthly } =
    useMonthlySalesReport({
      year,
      month,
      storeId: isSuperAdmin ? selectedStoreId : null,
    });
  const { data: salesByCategory } = useSalesByCategory({
    year,
    month,
    storeId: isSuperAdmin ? selectedStoreId : null,
  });
  const { data: salesByProduct } = useSalesByProduct({
    year,
    month,
    storeId: isSuperAdmin ? selectedStoreId : null,
  });
  const { data: stockSummary } = useStockSummary({
    year,
    month,
    storeId: isSuperAdmin ? selectedStoreId : null,
  });
  const { data: stockDetail } = useStockDetail({
    year,
    month: month > 0 ? month : new Date().getMonth() + 1,
    storeId: isSuperAdmin ? selectedStoreId : null,
  });

  const isSingleMonth = month > 0;
  const xAxisDataKey = isSingleMonth ? "dayName" : "monthName";

  return (
    <div className="min-h-dvh p-4 md:p-6 lg:p-8">
      <ReportHeader />
      <ReportFilters
        isSuperAdmin={isSuperAdmin}
        selectedStoreId={selectedStoreId}
        onSelectStore={setSelectedStoreId}
        stores={stores || []}
        year={year}
        onYearChange={setYear}
        month={month}
        onMonthChange={setMonth}
        monthOptions={monthOptions}
      />
      <ReportTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "sales" && (
        <div className="space-y-6">
          <SalesOverviewChart
            data={monthlySales?.months || []}
            isLoading={isLoadingMonthly}
            xAxisDataKey={xAxisDataKey}
            isSingleMonth={isSingleMonth}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SalesByCategoryChart
              data={salesByCategory || []}
              colors={CHART_COLORS}
            />
            <div className="bg-brand-mist-100/10 rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
              <h3 className="text-lg font-semibold text-brand-mist-800 mb-4">
                Sales by Product
              </h3>
              <div className="h-80 overflow-y-auto">
                <SalesByProductTable data={salesByProduct || []} />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "stock" && (
        <StockReportSection
          stockSummary={stockSummary || []}
          stockDetail={stockDetail}
        />
      )}
    </div>
  );
}
