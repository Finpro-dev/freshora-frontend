"use client";

import { RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface JournalHeaderProps {
  onRefresh: () => void;
}

export default function JournalHeader({ onRefresh }: JournalHeaderProps) {
  return (
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
          onClick={onRefresh}
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
  );
}
