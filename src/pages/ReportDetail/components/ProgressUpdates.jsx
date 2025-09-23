import React from "react";
import { Clock, User, Camera, Eye, X } from "lucide-react";

const ProgressUpdates = ({ progressUpdates, totalUpdates }) => {
  const getStageConfig = (stage) => {
    const stageConfig = {
      REVIEW: {
        color: "text-blue-600",
        bg: "bg-blue-100",
        border: "border-blue-200",
        label: "Dalam Peninjauan",
        description: "Laporan sedang dalam proses review",
      },
      INPROGRESS: {
        color: "text-orange-600",
        bg: "bg-orange-100",
        border: "border-orange-200",
        label: "Dalam Progress",
        description: "Perbaikan sedang berlangsung",
      },
      COMPLETED: {
        color: "text-green-600",
        bg: "bg-green-100",
        border: "border-green-200",
        label: "Selesai",
        description: "Perbaikan telah selesai",
      },
    };
    return stageConfig[stage];
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

  const sortedUpdates = progressUpdates
    ? [...progressUpdates].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      )
    : [];

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

      {sortedUpdates && sortedUpdates.length > 0 ? (
        <div className="space-y-6">
          {sortedUpdates.map((update, index) => {
            const stageConfig = getStageConfig(update.stage);
            const isLatest = index === 0;

            return (
              <div key={update.report_progress_id} className="relative">
                <div className="flex items-start space-x-4">
                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div
                      className={`rounded-lg border p-4 ${isLatest ? "border-gray-400 bg-gray-50" : "border-gray-200 bg-white"}`}
                    >
                      <div className="flex gap-4">
                        {/* foto */}
                        {update.photo_url && (
                          <div className="flex-shrink-0">
                            <img
                              src={update.photo_url}
                              alt={`Progress ${stageConfig.label}`}
                              className="h-24 w-24 cursor-pointer rounded-lg object-cover transition-opacity hover:opacity-90 sm:h-32 sm:w-32"
                            />
                          </div>
                        )}

                        {/* deskripsi */}
                        <div className="min-w-0 flex-1">
                          <div className="mb-3 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span
                                className={`rounded-full px-3 py-1 text-sm font-medium ${stageConfig.bg} ${stageConfig.color}`}
                              >
                                {stageConfig.label}
                              </span>
                              {isLatest && (
                                <span className="rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-800">
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
                                <button
                                  onClick={() =>
                                    window.open(update.photo_url, "_blank")
                                  }
                                  className="flex items-center text-sm font-medium text-gray-800 hover:text-black"
                                >
                                  <Eye className="mr-1 h-4 w-4" />
                                  Lihat Foto
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
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
