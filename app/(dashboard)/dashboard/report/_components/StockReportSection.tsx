"use client";

import { StockSummaryTable } from "./StockSummaryTable";
import { StockHistoryTable } from "./StockHistoryTable";

interface StockReportSectionProps {
  stockSummary: any[];
  stockDetail: any;
}

export default function StockReportSection({
  stockSummary,
  stockDetail,
}: StockReportSectionProps) {
  return (
    <div className="space-y-6">
      <div className="bg-brand-mist-100/10 rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
        <h3 className="text-lg font-semibold text-brand-mist-800 mb-4">
          Stock Summary by Product
        </h3>
        <div className="h-80 overflow-y-auto">
          <StockSummaryTable data={stockSummary} />
        </div>
      </div>

      <div className="bg-brand-mist-100/10 rounded-xl p-4 md:p-6 border border-brand-mist-200 shadow-sm">
        <h3 className="text-lg font-semibold text-brand-mist-800 mb-4">
          Stock History Detail
        </h3>
        <div className="h-80 overflow-y-auto">
          <StockHistoryTable data={stockDetail?.journals || []} />
        </div>
      </div>
    </div>
  );
}
