import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, XCircle } from "lucide-react";
import { useGetReportById } from "../../hooks/useGetReportById";
import ReportImages from "./components/ReportImages";
import ReportInfo from "./components/ReportInfo";
import ProgressUpdates from "./components/ProgressUpdates";
import LocationMap from "./components/LocationMap";

const ReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Use the custom hook to fetch report data
  const { data: report, isLoading: loading, error } = useGetReportById(id);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Memuat detail laporan...</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <XCircle className="mx-auto mb-4 h-16 w-16 text-red-500" />
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            {error?.message || "Laporan tidak ditemukan"}
          </h2>
          <p className="mb-4 text-sm text-gray-600">
            {error?.response?.status === 404
              ? "Laporan dengan ID tersebut tidak ditemukan"
              : error?.response?.status === 403
                ? "Anda tidak memiliki akses untuk melihat laporan ini"
                : "Terjadi kesalahan saat memuat laporan"}
          </p>
          <button
            onClick={() => navigate("/laporan")}
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Kembali ke daftar laporan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/laporan")}
                className="flex items-center text-gray-600 transition-colors duration-200 hover:text-gray-900"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Kembali
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Images */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ReportImages photoUrl={report.photoUrl} title={report.title} />
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6 lg:col-span-2">
            {/* Report Information */}
            <ReportInfo report={report} />

            {/* Location Map */}
            <LocationMap
              latitude={report.address.latitude}
              longitude={report.address.longitude}
              address={report.address}
            />

            {/* Progress Updates */}
            <ProgressUpdates
              progressUpdates={report.progressUpdates}
              totalUpdates={report._count.progressUpdates}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
