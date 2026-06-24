"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useGetStockJournals } from "../_hooks/use-stock";
import {
  Loader2,
  ArrowLeft,
  RefreshCw,
  Search,
  ArrowUpDown,
} from "lucide-react";

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

  // --- STATE FILTER & SORT ---
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc"); // Default: Terbaru dahulu

  const {
    data: journals = [],
    isLoading,
    isError,
    refetch,
  } = useGetStockJournals(selectedStore);

  // --- ENGINE FILTER & SORT (CLIENT-SIDE) ---
  const filteredAndSortedJournals = useMemo(() => {
    let result = [...journals];

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter((item) =>
        item.stock?.product?.name?.toLowerCase().includes(query),
      );
    }

    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [journals, searchQuery, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
  };

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
    <div className="min-h-dvh p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-mist-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-brand-mist-800">
            Historical Inventory Audit Trail
          </h1>
          <p className="text-sm text-brand-mist-500">
            Tracks of products mutations, distributions, and corrections.
          </p>
        </div>
        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
          <button
            onClick={() => refetch()}
            className="p-2.5 border border-brand-mist-300 rounded-lg bg-white hover:bg-brand-mist-50 text-brand-mist-500 transition-colors flex items-center justify-center shadow-sm"
            title="Refresh Data"
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

      {/* --- UTILITY CONTROL BAR (SEARCH & SORT) --- */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-brand-mist-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-brand-mist-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-emerald-500 bg-white text-brand-mist-800 shadow-sm"
          />
        </div>

        <button
          onClick={toggleSortOrder}
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 border border-brand-mist-300 rounded-xl bg-white hover:bg-brand-mist-50 text-sm font-bold text-brand-mist-700 shadow-sm transition-all shrink-0"
        >
          <ArrowUpDown className="w-4 h-4 text-brand-mist-500" />
          <span>
            Sort: {sortOrder === "desc" ? "Newest First" : "Oldest First"}
          </span>
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-xl border border-brand-mist-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-brand-mist-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-bold text-brand-mist-500 uppercase tracking-wider cursor-pointer hover:bg-brand-mist-100 transition-colors"
                onClick={toggleSortOrder}
              >
                <div className="flex items-center gap-1">
                  Timestamp
                  <ArrowUpDown className="w-3 h-3 text-brand-mist-400" />
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-brand-mist-500 uppercase tracking-wider">
                Item Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-brand-mist-500 uppercase tracking-wider">
                Qty
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-brand-mist-500 uppercase tracking-wider">
                Activity Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-brand-mist-500 uppercase tracking-wider">
                Updated By
              </th>
              <th className="px-6 py-3 text-left text-xs font-bold text-brand-mist-500 uppercase tracking-wider">
                Reference ID / Source
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-mist-200">
            {filteredAndSortedJournals.map((item) => (
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
                <td className="px-6 py-4 font-bold text-brand-mist-800">
                  {item.stock?.product?.name}
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
                {/* 👈 FIXED: Pembersihan Field Reason Menjadi ID Referensi Sistem */}
                <td className="px-6 py-4 font-mono text-xs text-brand-mist-500 max-w-xs truncate">
                  {item.transactionId || item.mutationId ? (
                    <span className="bg-brand-mist-50 px-2 py-1 rounded border border-brand-mist-200 block truncate">
                      {item.transactionId || item.mutationId}
                    </span>
                  ) : (
                    <span className="text-brand-mist-400 font-sans italic">
                      Manual Adjustment
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Feed Card View */}
      <div className="lg:hidden space-y-4">
        {filteredAndSortedJournals.map((item) => (
          <div
            key={item.stockJournalId}
            className="bg-white rounded-xl p-4 border border-brand-mist-200 shadow-sm space-y-3"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-brand-mist-800 text-sm">
                  {item.stock?.product?.name}
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
            <div className="space-y-1.5 text-xs text-brand-mist-600 pt-2 border-t border-brand-mist-100">
              <p>
                <span className="font-medium text-brand-mist-400">Sector:</span>{" "}
                <span
                  className={`px-1.5 py-0.5 text-[11px] font-semibold rounded ${getJournalBadgeColor(item.type)}`}
                >
                  {item.type}
                </span>
              </p>
              <div className="flex items-center gap-1">
                <span className="font-medium text-brand-mist-400">Actor:</span>{" "}
                {resolveActorDetails(item)}
              </div>
              {/* 👈 FIXED: Pembersihan Field Reason Mobile View */}
              <p className="text-brand-mist-500 font-mono text-[11px] mt-1 bg-brand-mist-50/50 p-1.5 rounded border border-brand-mist-100 truncate">
                Ref:{" "}
                {item.transactionId || item.mutationId || "Manual Adjustment"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State Guard */}
      {filteredAndSortedJournals.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center border border-brand-mist-200 shadow-sm">
          <p className="text-brand-mist-500 font-medium">
            {journals.length === 0
              ? "No operations records exist inside this transaction buffer window."
              : "No stock journal logs match your current search criteria."}
          </p>
        </div>
      )}
    </div>
  );
}
