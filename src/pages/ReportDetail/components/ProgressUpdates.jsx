import React from "react";
import {
  Clock,
  User,
  Camera,
  CheckCircle,
  AlertCircle,
  XCircle,
  FileText,
  Eye,
} from "lucide-react";

const ProgressUpdates = ({ progressUpdates, totalUpdates }) => {
  const getStageConfig = (stage) => {
    const stageConfig = {
      RECEIVED: {
        icon: FileText,
        color: "text-blue-600",
        bg: "bg-blue-100",
        border: "border-blue-200",
        label: "Diterima",
        description: "Laporan telah diterima sistem",
      },
      VERIFIED: {
        icon: CheckCircle,
        color: "text-green-600",
        bg: "bg-green-100",
        border: "border-green-200",
        label: "Diverifikasi",
        description: "Laporan telah diverifikasi",
      },
      IN_PROGRESS: {
        icon: AlertCircle,
        color: "text-orange-600",
        bg: "bg-orange-100",
        border: "border-orange-200",
        label: "Sedang Dikerjakan",
        description: "Perbaikan sedang berlangsung",
      },
      COMPLETED: {
        icon: CheckCircle,
        color: "text-green-600",
        bg: "bg-green-100",
        border: "border-green-200",
        label: "Selesai",
        description: "Perbaikan telah selesai",
      },
      REJECTED: {
        icon: XCircle,
        color: "text-red-600",
        bg: "bg-red-100",
        border: "border-red-200",
        label: "Ditolak",
        description: "Laporan ditolak",
      },
    };
    return stageConfig[stage] || stageConfig.RECEIVED;
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

  const formatDateShort = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="flex items-center text-lg font-semibold text-gray-900">
          <Clock className="mr-2 h-5 w-5 text-gray-600" />
          Progress Laporan
        </h3>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
          {totalUpdates} Update{totalUpdates !== 1 ? "s" : ""}
        </span>
      </div>

      {progressUpdates && progressUpdates.length > 0 ? (
        <div className="space-y-6">
          {progressUpdates.map((update, index) => {
            const stageConfig = getStageConfig(update.stage);
            const StageIcon = stageConfig.icon;
            const isLatest = index === progressUpdates.length - 1;

            return (
              <div key={update.report_progress_id} className="relative">
                {/* Timeline line */}
                {index < progressUpdates.length - 1 && (
                  <div className="absolute left-6 top-12 h-full w-0.5 bg-gray-200"></div>
                )}

                <div className="flex items-start space-x-4">
                  {/* Timeline icon */}
                  <div
                    className={`h-12 w-12 flex-shrink-0 rounded-full border-2 ${stageConfig.bg} ${stageConfig.border} flex items-center justify-center ${isLatest ? "ring-2 ring-blue-200 ring-offset-2" : ""}`}
                  >
                    <StageIcon className={`h-5 w-5 ${stageConfig.color}`} />
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div
                      className={`rounded-lg border p-4 ${isLatest ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-white"}`}
                    >
                      {/* Header */}
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span
                            className={`rounded-full px-3 py-1 text-sm font-medium ${stageConfig.bg} ${stageConfig.color}`}
                          >
                            {stageConfig.label}
                          </span>
                          {isLatest && (
                            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                              Terbaru
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="mr-1 h-4 w-4" />
                          {formatDateShort(update.createdAt)}
                        </div>
                      </div>

                      {/* Progress notes */}
                      <p className="mb-3 leading-relaxed text-gray-700">
                        {update.progress_notes}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-600">
                          <User className="mr-1 h-4 w-4" />
                          <span className="font-medium">
                            @{update.reviewer.username}
                          </span>
                        </div>

                        {update.photo_url && (
                          <div className="flex items-center space-x-2">
                            <Camera className="h-4 w-4 text-gray-500" />
                            <button className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700">
                              <Eye className="mr-1 h-4 w-4" />
                              Lihat Foto
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Photo preview */}
                      {update.photo_url && (
                        <div className="mt-3 border-t border-gray-200 pt-3">
                          <img
                            src={update.photo_url}
                            alt={`Progress ${stageConfig.label}`}
                            className="h-48 w-full cursor-pointer rounded-lg object-cover transition-opacity hover:opacity-90"
                          />
                        </div>
                      )}
                    </div>

                    {/* Full date display */}
                    <div className="ml-1 mt-2 text-xs text-gray-500">
                      {formatDate(update.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-8 text-center text-gray-500">
          <Clock className="mx-auto mb-3 h-12 w-12 text-gray-300" />
          <p className="font-medium">Belum ada update progress laporan</p>
          <p className="text-sm">
            Progress update akan muncul ketika ada perkembangan terbaru
          </p>
        </div>
      )}
    </div>
  );
};

export default ProgressUpdates;
