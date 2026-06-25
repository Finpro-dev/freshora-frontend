"use client";

import { useAuthStore } from "@/shared/store/auth-store/AuthStoreProvider";
import DashboardWelcome from "./_components/DashboardWelcome";
import DashboardSalesChart from "./_components/DashboardSalesChart";
import DashboardAlerts from "./_components/DashboardAlerts";
import DashboardQuickLinks from "./_components/DashboardQuickLinks";
import { useLowStockAlerts, useRecentSales } from "./_hooks/use-dashboard";

export default function DashboardPage() {
  const firstName = useAuthStore((state) => state.firstName);
  const lastName = useAuthStore((state) => state.lastName);
  const role = useAuthStore((state) => state.role);

  const { data: lowStockAlerts, isLoading: isLoadingAlerts } =
    useLowStockAlerts();
  const { data: recentSales } = useRecentSales();

  return (
    <div className="min-h-dvh p-4 md:p-6 lg:p-8 space-y-6">
      <DashboardWelcome firstName={firstName} lastName={lastName} role={role} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardSalesChart data={recentSales || []} />
        </div>
        <div>
          <DashboardAlerts alerts={lowStockAlerts || []} />
        </div>
      </div>

      <DashboardQuickLinks />
    </div>
  );
}
