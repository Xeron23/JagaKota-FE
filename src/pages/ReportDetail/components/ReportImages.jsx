import React, { useState, useEffect } from "react";
import { Camera, ZoomIn, X } from "lucide-react";

const ReportImages = ({ photoUrl, title }) => {
  const [showModal, setShowModal] = useState(false);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [showModal]);

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowModal(false);
    }
  };

  if (!photoUrl) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="text-center text-gray-500">
          <Camera className="mx-auto mb-4 h-16 w-16 text-gray-300" />
          <p className="text-lg font-medium">Tidak ada foto</p>
          <p className="text-sm">Foto belum tersedia untuk laporan ini</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Image Display */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="group relative">
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-20">
            <ZoomIn className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          <img
            src={photoUrl}
            alt={title || "Foto Laporan"}
            className="h-80 w-full cursor-pointer object-cover transition-transform duration-300 group-hover:scale-105"
            onClick={() => setShowModal(true)}
            loading="lazy"
          />
        </div>
      </div>

      {/* Enhanced Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4 backdrop-blur-sm"
          onClick={handleModalClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="relative flex max-h-[40vh] max-w-[40vw] items-center justify-center">
            <button
              onClick={() => setShowModal(false)}
              className="absolute left-2 -top-10 z-10 rounded-full bg-black bg-opacity-50 p-2 text-white transition-colors hover:bg-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Modal Image */}
            <img
              src={photoUrl}
              alt={title || "Foto Laporan"}
              className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
              id="modal-title"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ReportImages;
