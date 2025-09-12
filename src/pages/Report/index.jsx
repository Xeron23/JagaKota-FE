import React, { useMemo, useState, useEffect } from "react";
import { useGetReports } from "@/hooks/useGetReports";
import ReportFilter from "./components/ReportFilter";
import ReportPagination from "./components/ReportPagination";
import ReportGrid from "./components/ReportGrid";
import { useLocation } from "react-router-dom";

const ReportPage = () => {
  const location = useLocation();
  const [page, setPage] = useState(1); // page mulai dari 1

  const [draftProvinceId, setDraftProvinceId] = useState("");
  const [draftRegencyId, setDraftRegencyId] = useState("");

  const [appliedProvinceId, setAppliedProvinceId] = useState("");
  const [appliedRegencyId, setAppliedRegencyId] = useState("");
  const [appliedVerificationStatus, setAppliedVerificationStatus] =
    useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const LIMIT = 8;

  useEffect(() => {
    if (location.state?.provinceId && location.state?.regencyId) {
      const { provinceId, regencyId } = location.state;
      console.log(provinceId, regencyId);
      setDraftProvinceId(provinceId);
      setDraftRegencyId(regencyId);
      setAppliedProvinceId(provinceId);
      setAppliedRegencyId(regencyId);
      setPage(1);

      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [location.state]);

  const queryParams = useMemo(
    () => ({
      page: page,
      limit: LIMIT,
      provinceId: appliedProvinceId || undefined,
      regencyId: appliedRegencyId || undefined,
      verificationStatus: appliedVerificationStatus || undefined,
    }),
    [
      page,
      LIMIT,
      appliedProvinceId,
      appliedRegencyId,
      appliedVerificationStatus,
    ],
  );

  const { data, isLoading, isError, error, isFetching } =
    useGetReports(queryParams);

  const reports = useMemo(() => {
    const raw = data?.data ?? [];
    if (!searchQuery.trim()) return raw;
    const q = searchQuery.trim().toLowerCase();
    return raw.filter(
      (r) =>
        r.title?.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q) ||
        r.address?.street?.toLowerCase().includes(q) ||
        r.address?.regency?.name?.toLowerCase().includes(q) ||
        r.address?.province?.name?.toLowerCase().includes(q),
    );
  }, [data, searchQuery]);

  const meta = data?.meta ?? { page, limit: LIMIT, total: 0, totalPages: 1 };

  const handleApplyFilter = () => {
    setAppliedProvinceId(draftProvinceId || "");
    setAppliedRegencyId(draftRegencyId || "");
    setPage(1);
  };

  const handleResetFilter = () => {
    setDraftProvinceId("");
    setDraftRegencyId("");
    setAppliedProvinceId("");
    setAppliedRegencyId("");
    setAppliedVerificationStatus("");
    setSearchQuery("");
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
        onApply={handleApplyFilter}
        onReset={handleResetFilter}
      />

      <ReportGrid
        reports={reports}
        isLoading={isLoading}
        isError={isError}
        errorMessage={error?.message}
        emptyMessage={"Tidak ada laporan ditemukan"}
        verificationStatus={appliedVerificationStatus}
        onVerificationStatusChange={(val) => {
          setAppliedVerificationStatus(val || "");
          setPage(1);
        }}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
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
