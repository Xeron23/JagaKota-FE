import React, { useMemo, useState } from "react";
import { useGetReports } from "@/hooks/useGetReports";
import ReportFilter from "./components/ReportFilter";
import ReportPagination from "./components/ReportPagination";
import ReportGrid from "./components/ReportGrid";

const ReportPage = () => {
  const [page, setPage] = useState(1); // offset

  const [draftProvinceId, setDraftProvinceId] = useState("");
  const [draftRegencyId, setDraftRegencyId] = useState("");
  const [draftStage, setDraftStage] = useState("");
  const [draftProgress, setDraftProgress] = useState("");

  const [appliedProvinceId, setAppliedProvinceId] = useState("");
  const [appliedRegencyId, setAppliedRegencyId] = useState("");
  const [appliedStage, setAppliedStage] = useState("");
  const [appliedProgress, setAppliedProgress] = useState("");

  const LIMIT = 10;

  const queryParams = useMemo(
    () => ({
      offset: page,
      limit: LIMIT,
      provinceId: appliedProvinceId || undefined,
      regencyId: appliedRegencyId || undefined,
      stage: appliedStage || undefined,
      progress: appliedProgress || undefined,
    }),
    [
      page,
      LIMIT,
      appliedProvinceId,
      appliedRegencyId,
      appliedStage,
      appliedProgress,
    ],
  );

  const { data, isLoading, isError, error, isFetching } =
    useGetReports(queryParams);
  const reports = data?.data ?? [];
  const meta = data?.meta ?? { page, limit: LIMIT, total: 0, totalPages: 1 };

  const handleApplyFilter = () => {
    setAppliedProvinceId(draftProvinceId || "");
    setAppliedRegencyId(draftRegencyId || "");
    setAppliedStage(draftStage || "");
    setAppliedProgress(draftProgress || "");
    setPage(1);
  };

  const handleResetFilter = () => {
    setDraftProvinceId("");
    setDraftRegencyId("");
    setDraftStage("");
    setDraftProgress("");
    setAppliedProvinceId("");
    setAppliedRegencyId("");
    setAppliedStage("");
    setAppliedProgress("");
    setPage(1);
  };

  return (
    <div className="px-6 py-8">
      <ReportFilter
        provinceId={draftProvinceId}
        regencyId={draftRegencyId}
        onProvinceChange={(id) => {
          setDraftProvinceId(id);
          setDraftRegencyId("");
        }}
        onRegencyChange={setDraftRegencyId}
        stage={draftStage}
        progress={draftProgress}
        onStageChange={setDraftStage}
        onProgressChange={setDraftProgress}
        onApply={handleApplyFilter}
        onReset={handleResetFilter}
      />

      <ReportGrid
        reports={reports}
        isLoading={isLoading}
        isError={isError}
        errorMessage={error?.message}
        emptyMessage={data?.message || "Tidak ada laporan ditemukan"}
      />

      <ReportPagination
        page={meta.page}
        totalPages={meta.totalPages}
        total={meta.total}
        isLoading={isLoading}
        isFetching={isFetching}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() =>
          setPage((p) =>
            meta.totalPages ? Math.min(meta.totalPages, p + 1) : p + 1,
          )
        }
      />
    </div>
  );
};
export default ReportPage;
