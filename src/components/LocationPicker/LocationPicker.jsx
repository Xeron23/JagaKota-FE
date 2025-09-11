import React, { useMemo, useCallback } from "react";
import toast from "react-hot-toast";
import MapComponent from "./components/MapComponent";
import LocationSearch from "./components/LocationSearch";
import { useNominatimSearch } from "../../hooks/useNominatimSearch";

const FALLBACK_CENTER = [-6.2, 106.816666]; // Jakarta, Indonesia

const LocationPicker = ({
  latitude,
  longitude,
  onLocationChange,
  title = "Pilih Lokasi di Peta",
  height = "h-80",
  showMyLocationButton = true,
  showSearch = true,
  mapZoom = 14,
}) => {
  const position = useMemo(() => {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    return !isNaN(lat) && !isNaN(lng) ? { lat, lng } : null;
  }, [latitude, longitude]);

  const mapCenter = useMemo(
    () => (position ? [position.lat, position.lng] : FALLBACK_CENTER),
    [position],
  );

  const { query, setQuery, results, setResults, loading, error } =
    useNominatimSearch();

  const handleSelect = useCallback(
    (coords) => {
      onLocationChange(coords);
    },
    [onLocationChange],
  );

  const handleUseMyLocation = useCallback(() => {
    if (!navigator.geolocation) {
      toast.error("Geolocation tidak didukung oleh browser ini.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        handleSelect({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        toast.success("Lokasi berhasil didapatkan!");
      },
      (err) => {
        console.error("Lokasi Tidak dapat ditemukan:", err);
        toast.error(
          "Gagal mendapatkan lokasi Anda. Pastikan GPS aktif dan izin lokasi diberikan.",
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  }, [handleSelect]);

  const handleResultClick = useCallback(
    (result) => {
      handleSelect({ lat: result.lat, lng: result.lng });
      setQuery(result.display);
      setResults([]);
    },
    [handleSelect, setQuery, setResults],
  );

  return (
    <div className="flex h-fit flex-col rounded-md border text-sm">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="font-medium">{title}</h2>
        {showMyLocationButton && (
          <button
            type="button"
            onClick={handleUseMyLocation}
            className="rounded bg-primary px-2 py-1 text-xs text-primary-foreground hover:opacity-90"
          >
            Lokasi Saya
          </button>
        )}
      </div>

      <MapComponent
        center={mapCenter}
        position={position}
        onLocationSelect={handleSelect}
        height={height}
        zoom={mapZoom}
      />

      {showSearch && (
        <LocationSearch
          query={query}
          onQueryChange={setQuery}
          results={results}
          loading={loading}
          error={error}
          onResultClick={handleResultClick}
        />
      )}
    </div>
  );
};

export default LocationPicker;
