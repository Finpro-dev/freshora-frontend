"use client";

interface JournalMobileCardsProps {
  items: any[];
}

export default function JournalMobileCards({ items }: JournalMobileCardsProps) {
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
    <div className="lg:hidden space-y-4">
      {items.map((item) => (
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
              className={`font-mono font-bold text-sm ${
                item.quantityChange > 0
                  ? "text-brand-emerald-600"
                  : "text-red-600"
              }`}
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
                className={`px-1.5 py-0.5 text-[11px] font-semibold rounded ${getBadgeColor(item.type)}`}
              >
                {item.type}
              </span>
            </p>
            <div className="flex items-center gap-1">
              <span className="font-medium text-brand-mist-400">Actor:</span>{" "}
              {resolveActor(item)}
            </div>
            <p className="text-brand-mist-500 font-mono text-[11px] mt-1 bg-brand-mist-50/50 p-1.5 rounded border border-brand-mist-100 truncate">
              Ref:{" "}
              {item.transactionId || item.mutationId || "Manual Adjustment"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
