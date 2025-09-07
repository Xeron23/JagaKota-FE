import React, { useMemo, useState } from "react";
import { useGetReports } from "@/hooks/useGetReports";
import ReportCard from "@/components/ReportCard";
import { Button } from "@/components/ui/button";
import ProvinceRegencySelect from "@/components/ProvinceRegencySelect";

const ReportPage = () => {
  const [page, setPage] = useState(1); // offset
  const [provinceId, setProvinceId] = useState("");
  const [regencyId, setRegencyId] = useState("");
  const LIMIT = 10;

  const queryParams = useMemo(
    () => ({
      offset: page,
      limit: LIMIT,
      provinceId: provinceId || undefined,
      regencyId: regencyId || undefined,
    }),
    [page, LIMIT, provinceId, regencyId],
  );

  const { data, isLoading, isError, error, isFetching } =
    useGetReports(queryParams);
  const reports = data?.data ?? [];
  const meta = data?.meta ?? { page, limit: LIMIT, total: 0, totalPages: 1 };

  const onApplyFilter = () => {
    setPage(1);
  };

  const onResetFilter = () => {
    setProvinceId("");
    setRegencyId("");
    setPage(1);
  };

  return (
    <div className="px-6 py-8">
      {/* Jumbotron Filter */}
      <div className="mb-8 rounded-xl border border-slate-200 bg-slate-50/60 p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-800">Semua Laporan</h1>
        <p className="mt-1 text-slate-600">
          Cari laporan berdasarkan provinsi dan kabupaten/kota.
        </p>

        <div className="mt-5 space-y-4">
          <ProvinceRegencySelect
            provinceId={provinceId}
            regencyId={regencyId}
            onProvinceChange={setProvinceId}
            onRegencyChange={setRegencyId}
            theme="light"
          />

          <div className="flex items-end gap-2">
            <Button onClick={onApplyFilter} className="w-full sm:w-auto">
              Terapkan
            </Button>
            <Button
              variant="outline"
              onClick={onResetFilter}
              className="w-full sm:w-auto"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="mb-4 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
        <div className="text-sm text-slate-600">
          {isFetching
            ? "Memuat..."
            : `Halaman ${meta.page} dari ${meta.totalPages} • Total ${meta.total} laporan`}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={isLoading || meta.page <= 1}
          >
            Prev
          </Button>
          <Button
            onClick={() =>
              setPage((p) =>
                meta.totalPages ? Math.min(meta.totalPages, p + 1) : p + 1,
              )
            }
            disabled={
              isLoading ||
              (meta.totalPages ? meta.page >= meta.totalPages : false)
            }
          >
            Next
          </Button>
        </div>
      </div>

      {/* List Reports */}
      {isError && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error?.message || "Gagal memuat laporan"}
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-lg bg-slate-200"
            />
          ))}
        </div>
      ) : reports.length === 0 ? (
        <div className="rounded-md border border-slate-200 bg-white p-6 text-center text-slate-600">
          Tidak ada laporan ditemukan.
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

export default ReportPage;
