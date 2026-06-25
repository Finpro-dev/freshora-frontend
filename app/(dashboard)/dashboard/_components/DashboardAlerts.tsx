"use client";

import { AlertTriangle, Package } from "lucide-react";

interface Alert {
  stockId: string;
  productName: string;
  storeName: string;
  quantity: number;
  unit: string;
}

interface DashboardAlertsProps {
  alerts: Alert[];
}

export default function DashboardAlerts({ alerts }: DashboardAlertsProps) {
  return (
    <div className="bg-white rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-red-500" />
        <h3 className="text-lg font-semibold text-brand-mist-800">
          Low Stock Alerts
        </h3>
      </div>
      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Package className="w-10 h-10 text-brand-emerald-500 mb-2" />
            <p className="text-sm text-brand-mist-500">
              All stock levels are healthy
            </p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.stockId}
              className="flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-100"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-brand-mist-800 truncate">
                  {alert.productName}
                </p>
                <p className="text-xs text-brand-mist-500 truncate">
                  {alert.storeName}
                </p>
              </div>
              <div className="text-right ml-3">
                <span className="text-sm font-bold text-red-600">
                  {alert.quantity}
                </span>
                <span className="text-xs text-red-500 block">left</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
