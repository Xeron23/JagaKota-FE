import React from "react";
import { MapPin, Navigation } from "lucide-react";
import MapComponent from "@/components/LocationPicker/components/MapComponent.jsx";

const LocationMap = ({ latitude, longitude, address }) => {
  const hasCoords = Boolean(latitude && longitude);
  const popup = (
    <div style={{ textAlign: "center", padding: 8 }}>
      <strong>{address?.street ?? "Lokasi"}</strong>
      <br />
      <small>
        {address?.regency?.name ?? ""}
        {address?.regency?.name && address?.province?.name ? ", " : ""}
        {address?.province?.name ?? ""}
      </small>
    </div>
  );

  const getDirections = () => {
    if (!hasCoords) return;
    const target = `${latitude},${longitude}`;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) =>
          window.open(
            `https://www.google.com/maps/dir/${coords.latitude},${coords.longitude}/${target}`,
            "_blank",
          ),
        () =>
          window.open(`https://www.google.com/maps/dir//${target}`, "_blank"),
      );
    } else {
      window.open(`https://www.google.com/maps/dir//${target}`, "_blank");
    }
  };

  if (!hasCoords) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
          <MapPin className="mr-2 h-5 w-5 text-gray-600" />
          Lokasi di Peta
        </h3>
        <div className="py-8 text-center text-gray-500">
          <MapPin className="mx-auto mb-3 h-12 w-12 text-gray-300" />
          <p className="font-medium">Koordinat tidak tersedia</p>
          <p className="text-sm">Tidak dapat menampilkan lokasi di peta</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="relative border-b border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center text-lg font-semibold text-gray-900">
            <MapPin className="mr-2 h-5 w-5 text-gray-600" />
            Lokasi di Peta
          </h3>
          <button
            onClick={getDirections}
            className="flex items-center rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium text-gray-900 transition-colors duration-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            <Navigation className="mr-1 h-4 w-4" />
            Rute
          </button>
        </div>
      </div>

      <MapComponent
        center={[latitude, longitude]}
        position={{ lat: latitude, lng: longitude }}
        onLocationSelect={() => {}}
        height="h-80"
        zoom={16}
        markerPopupContent={popup}
        autoOpenPopup
      />
    </div>
  );
};

export default LocationMap;
