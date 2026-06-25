"use client";

export default function ReportHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-mist-800">
          Reports & Analysis
        </h1>
        <p className="text-brand-mist-500">
          View and analyze sales and stock reports
        </p>
      </div>
    </div>
  );
}
