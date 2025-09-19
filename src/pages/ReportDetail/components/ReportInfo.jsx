import React from "react";
import {
  Calendar,
  MapPin,
  FileText,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
} from "lucide-react";

const ReportInfo = ({ report }) => {
  const getStatusConfig = (status) => {
    const statusConfig = {
      PENDING: {
        icon: Clock,
        color: "text-yellow-600",
        bg: "bg-yellow-100",
        label: "Menunggu Verifikasi",
      },
      VERIFIED: {
        icon: CheckCircle,
        color: "text-green-600",
        bg: "bg-green-100",
        label: "Terverifikasi",
      },
      REJECTED: {
        icon: XCircle,
        color: "text-red-600",
        bg: "bg-red-100",
        label: "Ditolak",
      },
      IN_PROGRESS: {
        icon: AlertCircle,
        color: "text-blue-600",
        bg: "bg-blue-100",
        label: "Sedang Diproses",
      },
    };
    return statusConfig[status] || statusConfig.PENDING;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const statusConfig = getStatusConfig(report.verification_status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div className="flex-1">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">
            {report.title}
          </h2>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {formatDate(report.createdAt)}
            </div>
          </div>
        </div>

        <div
          className={`flex items-center rounded-full px-3 py-2 ${statusConfig.bg}`}
        >
          <StatusIcon className={`mr-2 h-4 w-4 ${statusConfig.color}`} />
          <span className={`text-sm font-medium ${statusConfig.color}`}>
            {statusConfig.label}
          </span>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h3 className="mb-3 flex items-center text-lg font-semibold text-gray-900">
          <FileText className="mr-2 h-5 w-5 text-gray-600" />
          Deskripsi Laporan
        </h3>
        <p className="leading-relaxed text-gray-700">{report.description}</p>
      </div>

      {/* Location */}
      <div className="mb-6">
        <h3 className=" flex items-center text-lg font-semibold text-gray-900">
          <MapPin className="mr-2 h-5 w-5 text-gray-600" />
          Lokasi
        </h3>
        <div className="rounded-lg bg-gray-50 p-4 space-y-4">
          <p className="mb-2 font-medium text-gray-900">
            Alamat : {report.address.street}
          </p>
          <div className="grid grid-cols-1 gap-4 text-sm text-gray-600 md:grid-cols-2">
            <div>
              <span className="font-medium">Provinsi:</span>{" "}
              {report.address.province.name}
            </div>
            <div>
              <span className="font-medium">Kota/Kabupaten:</span>{" "}
              {report.address.regency.name}
            </div>
          </div>
        </div>
      </div>

      {/* Verification Notes */}
      {report.verification_notes && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="mb-3 text-lg font-semibold text-gray-900">
            Catatan Verifikasi
          </h3>
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p className="text-blue-800">{report.verification_notes}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportInfo;
