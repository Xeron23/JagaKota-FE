import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Calendar,
  MapPin,
  FileText,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  Heart,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { useLikes } from "../../../hooks/useLikes";
import { useComments } from "../../../hooks/useComment";
import toast from "react-hot-toast";

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

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",   
    });

  const username = localStorage.getItem("username");
  const statusConfig = getStatusConfig(report.verification_status);
  const StatusIcon = statusConfig.icon;

  const reportId = useMemo(() => report.report_id, [report]);

  // ====== LIKE STATE ======
  const initialLiked = report.isLiked;
  const initialCount = report.likesCount;
  const [liked, setLiked] = useState(Boolean(initialLiked));
  const [likeCount, setLikeCount] = useState(Number(initialCount) || 0);

  const {
    likeData,
    isLoadingLikes,
    createLike,
    deleteLike,
    isLiking,
    isUnliking,
  } = useLikes(reportId, username);

  useEffect(() => {
    if (likeData && !isLoadingLikes) {
      setLiked(likeData.isLikedByUser);
      setLikeCount(likeData.likesCount);
    }
  }, [likeData, isLoadingLikes]);

  const handleToggleLike = () => {
    if (!reportId || isLiking || isUnliking) return;

    if (liked) {
      setLiked(false);
      setLikeCount((c) => Math.max(0, c - 1));
      deleteLike.mutate(undefined, {
        onError: () => {
          setLiked(true);
          setLikeCount((c) => c + 1);
        },
      });
    } else {
      setLiked(true);
      setLikeCount((c) => c + 1);
      createLike.mutate(undefined, {
        onError: () => {
          setLiked(false);
          setLikeCount((c) => Math.max(0, c - 1));
        },
      });
    }
  };

  const likeBtnClasses = [
    "flex items-center rounded-full px-3 py-2 border transition-colors select-none",
    liked
      ? "bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100"
      : "bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200",
    (isLiking || isUnliking) && "opacity-60 cursor-not-allowed",
  ]
    .filter(Boolean)
    .join(" ");

  // ====== COMMENT STATE ======
  const { createComment, isCreating } = useComments(reportId);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const modalRef = useRef(null);

  const handleOpenComment = () => setIsCommentOpen(true);
  const handleCloseComment = () => {
    setIsCommentOpen(false);
    setCommentText("");
  };

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;
    createComment.mutate(
      { content: commentText },
      {
        onSuccess: () => {
          setCommentText("");
          toast.success("Komentar berhasil dibuat");
          handleCloseComment();
        },
      }
    );
  };

  // Close popup jika klik di luar modal
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        handleCloseComment();
      }
    };

    if (isCommentOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCommentOpen]);

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

        <div className="flex items-center gap-2">
          {/* comment */}
          <button
            type="button"
            className="flex items-center rounded-full bg-gray-100 border border-gray-200 px-3 py-2 text-gray-600 hover:bg-gray-200 transition-colors"
            onClick={handleOpenComment}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            <span className="text-sm font-medium">Komentar</span>
            {/* <span className="text-sm font-medium">
              {isLoading ? "..." : likeCount}
            </span> */}
          </button>

          {/* Like Button */}
          <button
            type="button"
            aria-label={liked ? "Batalkan suka" : "Sukai laporan"}
            aria-pressed={liked}
            data-liked={liked ? "true" : "false"}
            className={likeBtnClasses}
            onClick={handleToggleLike}
            disabled={isLiking || isUnliking || !reportId}
            title={liked ? "Batalkan suka" : "Sukai laporan"}
          >
            {isLiking || isUnliking ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Heart
                className={`mr-2 h-4 w-4 ${
                  liked ? "text-rose-600" : "text-gray-500"
                }`}
                fill={liked ? "currentColor" : "none"}
                strokeWidth={liked ? 2 : 1.8}
              />
            )}
            <span className="text-sm font-medium">
              {isLoadingLikes ? "..." : likeCount}
            </span>
          </button>

          <div
            className={`flex items-center rounded-full px-3 py-2 ${statusConfig.bg}`}
          >
            <StatusIcon className={`mr-2 h-4 w-4 ${statusConfig.color}`} />
            <span className={`text-sm font-medium ${statusConfig.color}`}>
              {statusConfig.label}
            </span>
          </div>
        </div>
      </div>

      {/* Modal Komentar */}
      {isCommentOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg w-96"
          >
            <h3 className="text-lg font-semibold mb-4">Tulis Komentar</h3>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Ketik komentar kamu..."
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={handleCloseComment}
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md"
              >
                Batal
              </button>
              <button
                onClick={handleSubmitComment}
                disabled={isCreating}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isCreating ? "Mengirim..." : "Kirim"}
              </button>
            </div>
          </div>
        </div>
      )}

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
        <h3 className="flex items-center text-lg font-semibold text-gray-900">
          <MapPin className="mr-2 h-5 w-5 text-gray-600" />
          Lokasi
        </h3>
        <div className="space-y-4 rounded-lg bg-gray-50 p-4">
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
