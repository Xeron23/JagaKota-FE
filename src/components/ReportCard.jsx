// ...existing code...
const STATUS_STYLES = {
  PENDING: "bg-amber-100 text-amber-800 ring-amber-200",
  APPROVED: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  VERIFIED: "bg-emerald-100 text-emerald-800 ring-emerald-200",
  REJECTED: "bg-rose-100 text-rose-800 ring-rose-200",
};

function formatDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export default function ReportCard({
  report,
  href,
  onClick,
  className = "",
  loading = false,
}) {
  if (loading) {
    return (
      <div
        className={`overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm ${className}`}
      >
        <div className="grid animate-pulse md:grid-cols-[320px,1fr]">
          <div className="h-52 w-full bg-gray-200 md:h-[220px]" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-6 w-3/4 rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-5/6 rounded bg-gray-200" />
            <div className="mt-3 h-9 w-28 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <article
        className={`flex items-center justify-center rounded-2xl border border-dashed border-gray-300/60 bg-white p-8 text-sm text-gray-500 ${className}`}
      >
        Tidak ada data laporan
      </article>
    );
  }

  const badge =
    STATUS_STYLES[report.verification_status] ||
    "bg-gray-100 text-gray-700 ring-gray-200";
  const dateLabel = formatDate(report.createdAt);
  const detailsHref = href ?? `/reports/${report.report_id}`;
  const address = report.address ?? "Lokasi tidak tersedia";

  return (
    <article
      className={`group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm ring-1 ring-black/0 transition focus-within:shadow-lg hover:shadow-lg hover:ring-black/5 ${className}`}
    >
      <div className="grid md:grid-cols-[320px,1fr]">
        <div className="relative">
          <img
            src={report.photoUrl}
            alt={report.title}
            className="h-52 w-full object-cover md:h-full"
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 hidden items-center gap-2 bg-gradient-to-t from-black/40 to-transparent p-3 md:hidden">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium ring-1 ring-inset ${badge}`}
            >
              {report.verification_status}
            </span>
            <span className="text-[10px] text-white/90">{dateLabel}</span>
          </div>
        </div>

        <div className="flex h-full flex-col p-5">
          <div className="mb-3 flex items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${badge}`}
            >
              {report.verification_status}
            </span>
            <span className="text-xs text-gray-500">{dateLabel}</span>
            <span className="ml-auto inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
              Progress: {report._count?.progressUpdates ?? 0}
            </span>
          </div>

          <h3 className="line-clamp-1 text-lg font-semibold text-gray-900">
            {report.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm text-gray-700">
            {report.description}
          </p>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <div className="flex min-w-0 items-center gap-2">
              <span className="truncate font-medium text-gray-800">
                @{report.author?.username}
              </span>
              <span aria-hidden>•</span>
              <span className="truncate">{address}</span>
            </div>

            {onClick ? (
              <button
                onClick={onClick}
                className="rounded-md bg-gray-900 px-3 py-1.5 text-white hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
              >
                Lihat Detail
              </button>
            ) : (
              <a
                href={detailsHref}
                className="rounded-md bg-gray-900 px-3 py-1.5 text-white hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
              >
                Lihat Detail
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
