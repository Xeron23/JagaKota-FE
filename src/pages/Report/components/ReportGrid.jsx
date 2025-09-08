import React from "react";
import ReportCard from "@/components/ReportCard";

const ReportGrid = ({
  reports = [],
  isLoading,
  isError,
  errorMessage,
  emptyMessage = "Tidak ada laporan ditemukan.",
}) => {
  if (isError) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {errorMessage || "Gagal memuat laporan"}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-40 animate-pulse rounded-lg bg-slate-200" />
        ))}
      </div>
    );
  }

  if (!reports.length) {
    return (
      <div className="rounded-md border border-slate-200 bg-white p-6 text-center text-slate-600">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {reports.map((r) => (
        <ReportCard key={r.report_id} report={r} />
      ))}
    </div>
  );
};

export default ReportGrid;
