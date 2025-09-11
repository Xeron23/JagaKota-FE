import React from "react";
import ReportCard from "@/components/ReportCard";
import FilterSelect from "@/components/FilterSelect";
import SearchBar from "@/components/SearchBar";


const VERIFICATION_STATUS_OPTIONS = [
  { label: "Pending", value: "PENDING" },
  { label: "Verified", value: "VERIFIED" },
  { label: "Rejected", value: "REJECTED" },
];

const ReportGrid = ({
  reports = [],
  isLoading,
  isError,
  errorMessage,
  emptyMessage = "Tidak ada laporan ditemukan.",
  verificationStatus = "",
  onVerificationStatusChange,
  searchQuery = "",
  onSearchQueryChange,
  searchDelay = 400,
}) => {
  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between gap-4">

        {/* Filter */}
        <div className="w-56">
          <FilterSelect
            placeholder="Pilih status verifikasi"
            options={VERIFICATION_STATUS_OPTIONS}
            value={verificationStatus}
            onChange={onVerificationStatusChange}
            allLabel="Semua Status"
          />
        </div>

        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChange={onSearchQueryChange}
          delay={searchDelay}
          placeholder="Cari judul, deskripsi, atau lokasi"
          ariaLabel="Cari laporan"
          className="w-96 self-end"
        />
      </div>

      {/* List Laporan */}
      {isError ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {errorMessage || "Gagal memuat laporan"}
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-lg bg-slate-200"
            />
          ))}
        </div>
      ) : !reports.length ? (
        <div className="rounded-md border border-slate-200 bg-white p-6 text-center text-slate-600">
          {emptyMessage}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reports.map((r) => (
            <ReportCard key={r.report_id} report={r} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportGrid;
