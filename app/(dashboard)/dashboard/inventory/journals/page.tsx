"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useGetStockJournals } from "../_hooks/use-stock";
import { toast } from "sonner";
import JournalHeader from "./_components/JournalHeader";
import JournalControls from "./_components/JournalControls";
import JournalTable from "./_components/JournalTable";
import JournalMobileCards from "./_components/JournalMobileCards";

export default function StockJournalLogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const {
    data: journals = [],
    isLoading,
    isError,
    refetch,
  } = useGetStockJournals();

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

  if (isLoading) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center gap-3">
        <span className="text-sm text-brand-mist-500 font-medium">
          Loading ledger streams...
        </span>
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
      <JournalHeader onRefresh={refetch} />
      <JournalControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortOrder={sortOrder}
        onToggleSort={toggleSortOrder}
      />
      <JournalTable items={filteredAndSortedJournals} />
      <JournalMobileCards items={filteredAndSortedJournals} />

      {filteredAndSortedJournals.length === 0 && (
        <div className="bg-brand-mist-100/10 rounded-xl p-12 text-center border border-brand-mist-200 shadow-sm">
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
