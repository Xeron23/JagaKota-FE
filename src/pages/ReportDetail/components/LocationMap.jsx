import React, { useEffect, useRef } from "react";
import { MapPin, Navigation, ExternalLink } from "lucide-react";

const LocationMap = ({ latitude, longitude, address }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);

  useEffect(() => {
    // Only initialize map if coordinates are valid
    if (!latitude || !longitude || !window.L) return;

    // Initialize map if not already done
    if (!mapInstance.current && mapRef.current) {
      mapInstance.current = window.L.map(mapRef.current, {
        center: [latitude, longitude],
        zoom: 16,
        zoomControl: true,
      });

      // Add tile layer
      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance.current);

      // Add marker
      markerInstance.current = window.L.marker([latitude, longitude])
        .addTo(mapInstance.current)
        .bindPopup(
          `
          <div style="text-align: center; padding: 8px;">
            <strong>${address.street}</strong><br>
            <small>${address.regency.name}, ${address.province.name}</small>
          </div>
        `,
        )
        .openPopup();
    }

    // Update map center and marker if coordinates change
    if (mapInstance.current && markerInstance.current) {
      mapInstance.current.setView([latitude, longitude], 16);
      markerInstance.current.setLatLng([latitude, longitude]);
    }

    // Cleanup on unmount
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
        markerInstance.current = null;
      }
    };
  }, [latitude, longitude, address]);

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, "_blank");
  };

  const openInAppleMaps = () => {
    const url = `https://maps.apple.com/?q=${latitude},${longitude}`;
    window.open(url, "_blank");
  };

  const getDirections = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: userLat, longitude: userLng } = position.coords;
          const url = `https://www.google.com/maps/dir/${userLat},${userLng}/${latitude},${longitude}`;
          window.open(url, "_blank");
        },
        () => {
          // Fallback if geolocation fails
          const url = `https://www.google.com/maps/dir//${latitude},${longitude}`;
          window.open(url, "_blank");
        },
      );
    } else {
      const url = `https://www.google.com/maps/dir//${latitude},${longitude}`;
      window.open(url, "_blank");
    }
  };

  if (!latitude || !longitude) {
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
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center text-lg font-semibold text-gray-900">
            <MapPin className="mr-2 h-5 w-5 text-gray-600" />
            Lokasi di Peta
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={getDirections}
              className="flex items-center rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition-colors duration-200 hover:bg-blue-100"
            >
              <Navigation className="mr-1 h-4 w-4" />
              Rute
            </button>
            <div className="group relative">
              <button className="flex items-center rounded-lg bg-gray-50 px-3 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-100">
                <ExternalLink className="mr-1 h-4 w-4" />
                Buka di
              </button>
              <div className="invisible absolute right-0 top-full z-10 mt-1 w-40 rounded-lg border border-gray-200 bg-white opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                <button
                  onClick={openInGoogleMaps}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 first:rounded-t-lg hover:bg-gray-50"
                >
                  Google Maps
                </button>
                <button
                  onClick={openInAppleMaps}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 last:rounded-b-lg hover:bg-gray-50"
                >
                  Apple Maps
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Address info */}
        <div className="mt-3 text-sm text-gray-600">
          <p className="font-medium text-gray-900">{address.street}</p>
          <p>
            {address.regency.name}, {address.province.name}
          </p>
          <p className="mt-1 text-xs">
            Koordinat: {latitude.toFixed(6)}, {longitude.toFixed(6)}
          </p>
        </div>
      </div>

      {/* Map container */}
      <div className="relative">
        <div
          ref={mapRef}
          className="h-80 w-full bg-gray-100"
          style={{ minHeight: "320px" }}
        />

        {/* Loading state */}
        {!window.L && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
              <p className="text-sm text-gray-600">Memuat peta...</p>
            </div>
          </div>
        )}
      </div>

      {/* Note */}
      <div className="bg-gray-50 p-4 text-xs text-gray-600">
        <p>
          <strong>Catatan:</strong> Pastikan untuk mengaktifkan JavaScript dan
          memiliki koneksi internet yang stabil untuk menampilkan peta dengan
          benar.
        </p>
      </div>
    </div>
  );
};

export default LocationMap;
