// Simple, safe report card for your API shape
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

function formatAddress(address) {
  if (!address) return "Lokasi tidak tersedia";
  if (typeof address === "string") return address;
  const street = address.street;
  const regency = address.regency?.name;
  const province = address.province?.name;
  const parts = [street, regency, province].filter(Boolean);
  return parts.length ? parts.join(", ") : "Lokasi tidak tersedia";
}

export default function ReportCard({
  report = {},
  href,
  onClick,
  className = "",
  loading = false,
}) {
  if (loading) {
    return (
      <article className={`rounded-2xl border border-black/5 bg-white shadow-sm ${className}`}>
        <div className="flex flex-col">
          <div className="h-48 w-full animate-pulse bg-gray-200" />
          <div className="flex h-full flex-col gap-3 p-5">
            <div className="h-5 w-28 animate-pulse rounded bg-gray-200" />
            <div className="h-6 w-2/3 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
            <div className="mt-2 h-8 w-28 animate-pulse self-end rounded bg-gray-200" />
          </div>
        </div>
      </article>
    );
  }

  const status = String(report?.verification_status || "").toUpperCase();
  const badge = STATUS_STYLES[status] || "bg-gray-100 text-gray-700 ring-gray-200";
  const dateLabel = formatDate(report?.createdAt);
  const detailsHref = href ?? (report?.report_id ? `/reports/${report.report_id}` : "#");
  const addressLabel = formatAddress(report?.address);
  const usernameLabel = report?.author?.username ? `@${report.author.username}` : "Pengguna anonim";

  return (
    <article className={`group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:shadow-lg ${className}`}>
      <div className="flex flex-col">
        <div className="relative">
          {report?.photoUrl ? (
            <img
              src={report.photoUrl}
              alt={report.title || "Foto laporan"}
              className="h-48 w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="h-48 w-full bg-gray-100" />
          )}
        </div>

        <div className="flex h-full flex-col p-5">
          <div className="mb-3 flex items-center gap-2">
            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${badge}`}>
              {status || "UNKNOWN"}
            </span>
            <span className="text-xs text-gray-500">{dateLabel}</span>
            <span className="ml-auto inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">
              Progress: {report?._count?.progressUpdates ?? 0}
            </span>
          </div>

          <h3 className="line-clamp-1 text-lg font-semibold text-gray-900">
            {report?.title || "Tanpa judul"}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm text-gray-700">
            {report?.description || "-"}
          </p>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <div className="flex min-w-0 items-center gap-2">
              <span className="truncate font-medium text-gray-800">{usernameLabel}</span>
              <span aria-hidden>•</span>
              <span className="truncate">{addressLabel}</span>
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