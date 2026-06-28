"use client";

import { ArrowUpDown } from "lucide-react";

interface JournalTableProps {
  items: any[];
}

export default function JournalTable({ items }: JournalTableProps) {
  if (items.length === 0) return null;

  function getBadgeColor(type: string) {
    if (
      type.includes("ADD") ||
      type.includes("IN") ||
      type.includes("CANCELED")
    ) {
      return "bg-brand-emerald-100 text-brand-emerald-700";
    }
    return "bg-red-100 text-red-700";
  }

  function resolveActor(item: any) {
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
  }

  return (
    <div className="hidden lg:block bg-brand-mist-100/10 rounded-xl border border-brand-mist-200 shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-brand-mist-50">
          <tr>
            <th
              className="px-6 py-3 text-left text-xs font-bold text-brand-mist-500 uppercase tracking-wider cursor-pointer hover:bg-brand-mist-100 transition-colors"
              onClick={() => {}}
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
          {items.map((item) => (
            <tr
              key={item.stockJournalId}
              className="hover:bg-brand-mist-50/40 transition-colors text-sm"
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
                  className={`px-2 py-0.5 inline-flex text-xs font-semibold rounded ${getBadgeColor(item.type)}`}
                >
                  {item.type}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {resolveActor(item)}
              </td>
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
  );
}
