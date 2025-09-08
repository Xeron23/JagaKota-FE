import React from "react";
import ProvinceRegencySelect from "@/components/ProvinceRegencySelect";
import { Button } from "@/components/ui/button";
import FilterSelect from "@/components/FilterSelect";

const STAGE_OPTIONS = [
  { label: "Review", value: "REVIEW" },
  { label: "In Progress", value: "INPROGRESS" },
  { label: "Completed", value: "COMPLETED" },
];

const VERIFICATION_STATUS_OPTIONS = [
  { label: "Pending", value: "PENDING" },
  { label: "Verified", value: "VERIFIED" },
  { label: "Rejected", value: "REJECTED" },
];

const ReportFilter = ({
  provinceId,
  regencyId,
  onProvinceChange,
  onRegencyChange,
  stage,
  progress,
  onStageChange,
  onProgressChange,
  onApply,
  onReset,
}) => {
  return (
    <div>
      <div className="mb-8 rounded-xl border border-slate-200 bg-slate-50/60 p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-800">Semua Laporan</h1>
        <p className="mt-1 text-slate-600">
          Cari laporan berdasarkan provinsi, kabupaten/kota, stage (progress),
          dan status verifikasi.
        </p>

        <div className="mt-5 space-y-4">
          <ProvinceRegencySelect
            provinceId={provinceId}
            regencyId={regencyId}
            onProvinceChange={onProvinceChange}
            onRegencyChange={onRegencyChange}
            theme="light"
          />

          <div className="flex items-end gap-2">
            <Button onClick={onApply} className="w-full sm:w-auto">
              Terapkan
            </Button>
            <Button
              variant="outline"
              onClick={onReset}
              className="w-full sm:w-auto"
            >
              Reset
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4 mb-4">
        <FilterSelect
          label="Stage (Progress)"
          placeholder="Pilih stage"
          options={STAGE_OPTIONS}
          value={stage}
          onChange={onStageChange}
          allLabel="Semua Stage"
        />
        <FilterSelect
          label="Status Verifikasi"
          placeholder="Pilih status verifikasi"
          options={VERIFICATION_STATUS_OPTIONS}
          value={progress}
          onChange={onProgressChange}
          allLabel="Semua Status"
        />
      </div>
    </div>
  );
};

export default ReportFilter;
