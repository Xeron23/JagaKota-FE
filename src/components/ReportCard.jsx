import { Button } from "./ui/button";
import { MapPin, Calendar, User } from "lucide-react";

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

function toTitleCase(input = "") {
  const KEEP_UPPER = new Set(["RT", "RW", "DKI", "DIY"]);
  return String(input)
    .split(/(\s|-|\/)/g)
    .map((part) => {
      const upper = part.toUpperCase();
      if (KEEP_UPPER.has(upper)) return upper;
      return /^[A-Za-zÀ-ÖØ-öø-ÿ]/.test(part)
        ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
        : part;
    })
    .join("");
}

function formatAddress(address) {
  if (!address) return "Lokasi tidak tersedia";
  if (typeof address === "string") return toTitleCase(address);
  const street = address.street ? toTitleCase(address.street) : undefined;
  const regency = address.regency?.name
    ? toTitleCase(address.regency.name)
    : undefined;
  const province = address.province?.name
    ? toTitleCase(address.province.name)
    : undefined;
  const parts = [regency, province, street].filter(Boolean);
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
        className={`group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}
      >
        <div className="h-48 w-full animate-pulse bg-gray-200" />
        <div className="flex flex-1 flex-col p-4">
          <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-gray-200" />
          <div className="mt-auto flex flex-col gap-2 pt-4">
            <div className="h-4 w-full animate-pulse self-end rounded bg-gray-200" />
            <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200" />
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
      className={`group flex flex-col overflow-hidden rounded-2xl border border-gray-200/70 bg-white shadow-sm transition-all duration-300 hover:shadow-lg ${className}`}
    >
      <div className="relative">
        {report?.photoUrl ? (
          <img
            src={report.photoUrl}
            alt={report.title || "Foto laporan"}
            className="h-48 w-full rounded-t-2xl object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-48 w-full items-center justify-center bg-gray-100 text-gray-400">
            <span>Gambar tidak tersedia</span>
          </div>
        )}

        {/* Gradient overlay biar teks/label lebih jelas */}
        <div className="absolute inset-0 rounded-t-2xl bg-gradient-to-t from-black/30 via-black/10 to-transparent" />

        {status && (
          <span
            className={`absolute right-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-semibold ring-1 backdrop-blur-sm ${badge}`}
          >
            {toTitleCase(status)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        <h3 className="line-clamp-2 text-lg font-semibold text-gray-800 group-hover:text-gray-900">
          {report?.title || "Judul Laporan Tidak Tersedia"}
        </h3>

        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
          <p className="line-clamp-1">{addressLabel}</p>
        </div>

        <div className="mt-auto pt-4">
          <div className="mb-3 flex items-center justify-between gap-3 text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <User className="h-3 w-3" />
              <span>{usernameLabel}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              <span>{dateLabel}</span>
            </div>
          </div>
          <Button
            href={detailsHref}
            onClick={onClick}
            className="transition-color duration-600 w-full justify-center rounded-lg bg-gradient-to-r from-gray-900 to-gray-700 px-4 py-2 text-sm font-medium text-white shadow-md hover:from-gray-800 hover:to-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            Lihat Detail
          </Button>
        </div>
      </div>
    </article>
  );
}
