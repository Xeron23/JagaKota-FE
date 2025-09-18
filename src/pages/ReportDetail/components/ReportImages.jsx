import React, { useState } from "react";
import { Camera, ZoomIn, X } from "lucide-react";

const ReportImages = ({ photoUrl, title }) => {
  const [showModal, setShowModal] = useState(false);

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
          <img
            src={photoUrl}
            alt={title || "Foto Laporan"}
            className="h-80 w-full cursor-pointer object-cover transition-transform duration-300 group-hover:scale-105"
            onClick={() => setShowModal(true)}
          />

          {/* Overlay with zoom icon */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-20">
            <ZoomIn className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </div>

        {/* Image Info */}
        <div className="p-4">
          <h3 className="font-medium text-gray-900">
            {title || "Foto Laporan"}
          </h3>
        </div>
      </div>

      {/* Modal for enlarged image */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
          <div className="relative max-h-full max-w-full">
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={photoUrl}
              alt={title || "Foto Laporan"}
              className="max-h-screen max-w-full rounded-lg object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ReportImages;
