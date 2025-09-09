import React from "react";
import { Button } from "@/components/ui/button";

const ReportPagination = ({
  page,
  totalPages = 1,
  total = 0,
  isLoading,
  isFetching,
  onPrev,
  onNext,
}) => {
  return (
    <div className="mt-6 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
      <div className="text-sm text-slate-600">
        {isFetching
          ? "Memuat..."
          : `Halaman ${page} dari ${totalPages} • Total ${total} laporan`}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={onPrev}
          disabled={isLoading || page <= 1}
        >
          Prev
        </Button>
        <Button
          onClick={onNext}
          disabled={isLoading || (totalPages ? page >= totalPages : false)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ReportPagination;
