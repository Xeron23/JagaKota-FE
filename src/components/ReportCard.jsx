import { Button } from "./ui/button";
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
      <article
        className={`group h-full overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm ${className} flex flex-col`}
      >
        <div className="flex flex-col">
          <div className="h-48 w-full animate-pulse bg-gray-200" />
          <div className="flex flex-1 flex-col gap-3 p-5">
            <div className="h-5 w-28 animate-pulse rounded bg-gray-200" />
            <div className="h-6 w-2/3 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
            <div className="mt-auto h-10 w-full animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </article>
    );
  }

  const status = String(report?.verification_status || "").toUpperCase();
  const badge =
    STATUS_STYLES[status] || "bg-gray-100 text-gray-700 ring-gray-200";
  const dateLabel = formatDate(report?.createdAt);
  const detailsHref =
    href ?? (report?.report_id ? `/reports/${report.report_id}` : "#");
  const addressLabel = formatAddress(report?.address);
  const usernameLabel = report?.author?.username
    ? `@${report.author.username}`
    : "Pengguna anonim";

  return (
    <article
      className={`group h-full overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:shadow-lg ${className} flex flex-col`}
    >
      <div className="flex flex-col">
        <div className="relative p-3">
          {report?.photoUrl ? (
            <img
              src={report.photoUrl}
              alt={report.title || "Foto laporan"}
              className="h-48 w-full rounded-xl object-cover"
              loading="lazy"
            />
          ) : (
            <div className="h-48 w-full bg-gray-100" />
          )}
        </div>

        <div className="flex flex-1">
          <div className="flex w-full flex-col gap-4 px-4 pb-4">
            <div className="flex items-start gap-3">
              <h3 className="line-clamp-2 flex-1 text-xl font-semibold">
                {report?.title}
              </h3>

              {status && (
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-sm font-medium ring-1 ${badge}`}
                >
                  {status.charAt(0) + status.slice(1).toLowerCase()}
                </span>
              )}
            </div>

            <p className="text-sm font-thin">{report.description}</p>
            <p className="text-sm font-thin">{addressLabel}</p>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              {dateLabel && <span>{dateLabel}</span>}
              {dateLabel && usernameLabel && <span>•</span>}
              {usernameLabel && <span>{usernameLabel}</span>}
            </div>

            <div className="mt-auto space-y-2">
              {/* <p className="text-end text-xs text-gray-600">{dateLabel}</p> */}
              <Button
                href={detailsHref}
                onClick={onClick}
                className="w-full justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
              >
                Lihat Detail
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
