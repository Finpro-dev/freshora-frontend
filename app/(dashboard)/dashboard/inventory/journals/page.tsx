"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useGetStockJournals } from "../_hooks/use-stock";
import { Loader2, ArrowLeft, RefreshCw } from "lucide-react";

function getJournalBadgeColor(type: string) {
  if (
    type.includes("ADD") ||
    type.includes("IN") ||
    type.includes("CANCELED")
  ) {
    return "bg-brand-emerald-100 text-brand-emerald-700";
  }
  return "bg-red-100 text-red-700";
}

export default function StockJournalLogPage() {
  const [selectedStore] = useState<string | undefined>(undefined);
  const {
    data: journals = [],
    isLoading,
    isError,
    refetch,
  } = useGetStockJournals(selectedStore);

  const resolveActorDetails = (item: any) => {
    if (item.user) {
      return (
        <span className="text-brand-mist-800 font-medium">
          🧑‍💼 {item.user.firstName} {item.user.lastName} (Admin)
        </span>
      );
    }
    if (item.transactionId) {
      return (
        <span className="text-blue-600 font-semibold text-xs bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
          🛒 Automated Checkout
        </span>
      );
    }
    if (item.mutationId) {
      return (
        <span className="text-purple-600 font-semibold text-xs bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
          📦 Warehouse Mutation
        </span>
      );
    }
    return <span className="text-brand-mist-400">🤖 System Engine</span>;
  };

  if (isLoading) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center gap-2">
        <Loader2 className="w-8 h-8 animate-spin text-brand-emerald-700" />
        <p className="text-sm text-brand-mist-500 font-medium">
          Loading ledger streams...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-dvh flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-6 max-w-md text-center shadow-sm">
          <p className="font-semibold mb-1">Failed to Sync Logs</p>
          <p className="text-sm text-red-600">
            Error rendering server-side transaction ledgers.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-mist-800">
            Historical Inventory Audit Trail
          </h1>
          <p className="text-brand-mist-500">
            Immutable linear ledger tracks of physical mutations, distributions,
            and corrections.
          </p>
        </div>
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={() => refetch()}
            className="p-2.5 border border-brand-mist-300 rounded-lg bg-white hover:bg-brand-mist-50 text-brand-mist-500 transition-colors flex items-center justify-center shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <Link
            href="/dashboard/inventory"
            className="group flex items-center gap-2 px-4 py-2 border border-brand-mist-300 text-brand-mist-700 bg-white rounded-lg hover:bg-brand-mist-50 transition-all duration-200 text-sm font-medium shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Overview Inventory</span>
          </Link>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-xl border border-brand-mist-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-brand-mist-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Item Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Delta
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Allocation Sector
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Initiator Actor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-brand-mist-500 uppercase tracking-wider">
                Justification Narrative
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-mist-200">
            {journals.map((item) => (
              <tr
                key={item.stockJournalId}
                className="hover:bg-brand-mist-50 transition-colors text-sm"
              >
                <td className="px-6 py-4 text-xs text-brand-mist-500 whitespace-nowrap">
                  {new Date(item.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
                <td className="px-6 py-4 font-medium text-brand-mist-800">
                  {item.stock.product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-mono font-bold">
                  <span
                    className={
                      item.quantityChange > 0
                        ? "text-brand-emerald-600"
                        : "text-red-600"
                    }
                  >
                    {item.quantityChange > 0
                      ? `+${item.quantityChange}`
                      : item.quantityChange}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-0.5 inline-flex text-xs font-semibold rounded ${getJournalBadgeColor(item.type)}`}
                  >
                    {item.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {resolveActorDetails(item)}
                </td>
                <td
                  className="px-6 py-4 text-brand-mist-500 max-w-xs truncate"
                  title={item.reason || undefined}
                >
                  {item.reason || item.transactionId || item.mutationId || (
                    <span className="text-brand-mist-300">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Feed Card View */}
      <div className="lg:hidden space-y-4">
        {journals.map((item) => (
          <div
            key={item.stockJournalId}
            className="bg-white rounded-xl p-4 border border-brand-mist-200 shadow-sm space-y-3"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-brand-mist-800 text-sm">
                  {item.stock.product.name}
                </p>
                <p className="text-xs text-brand-mist-400">
                  {new Date(item.createdAt).toLocaleString("en-US", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </p>
              </div>
              <span
                className={`font-mono font-bold text-sm ${item.quantityChange > 0 ? "text-brand-emerald-600" : "text-red-600"}`}
              >
                {item.quantityChange > 0
                  ? `+${item.quantityChange}`
                  : item.quantityChange}
              </span>
            </div>
            <div className="space-y-1 text-xs text-brand-mist-600 pt-2 border-t border-brand-mist-100">
              <p>
                <span className="font-medium">Sector:</span> {item.type}
              </p>
              <p className="flex items-center gap-1">
                <span className="font-medium">Actor:</span>{" "}
                {resolveActorDetails(item)}
              </p>
              <p className="text-brand-mist-500 italic mt-1 truncate">
                "
                {item.reason ||
                  item.transactionId ||
                  item.mutationId ||
                  "Automated run trigger"}
                "
              </p>
            </div>
          </div>
        ))}
      </div>

      {journals.length === 0 && (
        <div className="bg-white rounded-xl p-8 text-center border border-brand-mist-200 shadow-sm">
          <p className="text-brand-mist-500">
            No operations records exist inside this transaction buffer window.
          </p>
        </div>
      )}
    </div>
  );
}
