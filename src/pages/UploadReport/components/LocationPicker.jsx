import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const FALLBACK_CENTER = [-6.2, 106.816666]; // Jakarta, Indonesia
const NOMINATIM_ENDPOINT = "https://nominatim.openstreetmap.org/search";

function MapController({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo([position.lat, position.lng], map.getZoom(), {
        duration: 0.8,
      });
    }
  }, [position, map]);
  return null;
}

function ClickCapture({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

const useNominatimSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Clear error when typing
    setError(null);

    if (query.trim().length < 3) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    // Reduced debounce time for better UX
    timeoutRef.current = setTimeout(async () => {
      try {
        // Abort previous request
        if (abortRef.current) {
          abortRef.current.abort();
        }

        const controller = new AbortController();
        abortRef.current = controller;

        const url = new URL(NOMINATIM_ENDPOINT);
        url.searchParams.set("q", query.trim());
        url.searchParams.set("format", "jsonv2");
        url.searchParams.set("addressdetails", "1");
        url.searchParams.set("limit", "6");
        url.searchParams.set("countrycodes", "id"); // Focus on Indonesia

        const res = await fetch(url.toString(), {
          signal: controller.signal,
          headers: {
            "Accept-Language": "id,en",
            "User-Agent": "JagaKota-App/1.0", // Good practice for Nominatim
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        // Only update results if this is the latest request
        if (controller.signal.aborted) return;

        const formattedResults = data.map((d) => ({
          id: d.place_id,
          display: d.display_name,
          lat: parseFloat(d.lat),
          lng: parseFloat(d.lon),
        }));

        setResults(formattedResults);
        setError(null);
      } catch (e) {
        if (e.name !== "AbortError") {
          console.error("Geocoding search failed:", e);
          setError("Gagal mencari lokasi. Silakan coba lagi.");
          setResults([]);
        }
      } finally {
        setLoading(false);
      }
    }, 300); // Reduced from 500ms to 300ms

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, [query]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { query, setQuery, results, setResults, loading, error };
};

const LocationPicker = ({ latitude, longitude, onLocationChange }) => {
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
  const [selectedIdx, setSelectedIdx] = useState(-1);

  const inputRef = useRef(null);

  const handleSelect = useCallback(
    (coords) => {
      onLocationChange(coords);
    },
    [onLocationChange],
  );

  const handleUseMyLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Geolocation tidak didukung oleh browser ini.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        handleSelect({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (err) => {
        console.error("Could not get user location:", err);
        alert(
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
      setSelectedIdx(-1);
    },
    [handleSelect, setQuery, setResults],
  );

  // Show search results when query has results, loading, or error
  const showSearchResults =
    query.trim().length >= 3 && (results.length > 0 || loading || error);

  return (
    <div className="flex h-fit flex-col rounded-md border text-sm">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="font-medium">Pilih Lokasi di Peta</h2>
        <button
          type="button"
          onClick={handleUseMyLocation}
          className="rounded bg-primary px-2 py-1 text-xs text-primary-foreground hover:opacity-90"
        >
          Lokasi Saya
        </button>
      </div>

      {/* Map container */}
      <div className="relative h-80 w-full">
        <MapContainer
          center={mapCenter}
          zoom={14}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickCapture onSelect={handleSelect} />
          <MapController position={position} />
          {position && <Marker position={[position.lat, position.lng]} />}
        </MapContainer>
      </div>

      {/* SearchBar */}
      <div className="border-b p-4">
        <div className="mb-3">
          <label className="mb-2 block text-xs font-medium text-muted-foreground">
            Cari Lokasi:
          </label>
          <input
            ref={inputRef}
            type="text"
            value={query}
            placeholder="Ketik nama tempat atau alamat (min 3 huruf)..."
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded border border-input bg-background px-3 py-2 text-xs outline-none ring-offset-background focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Hasil Search*/}
        {showSearchResults && (
          <div>
            <h3 className="mb-2 text-xs font-medium text-muted-foreground">
              Hasil Pencarian:
            </h3>
            <div className="max-h-48 overflow-auto rounded border bg-popover">
              {loading && (
                <div className="p-3 text-xs text-muted-foreground">
                  Mencari lokasi...
                </div>
              )}
              {error && (
                <div className="p-3 text-xs text-destructive">{error}</div>
              )}
              {!loading &&
                !error &&
                results.length === 0 &&
                query.trim().length >= 3 && (
                  <div className="p-3 text-xs text-muted-foreground">
                    Tidak ada hasil ditemukan untuk "{query}".
                  </div>
                )}
              {!loading &&
                results.map((r, idx) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleResultClick(r)}
                    className={`block w-full cursor-pointer px-3 py-2 text-left text-xs hover:bg-accent hover:text-accent-foreground ${
                      idx === selectedIdx
                        ? "bg-accent text-accent-foreground"
                        : ""
                    } ${idx > 0 ? "border-t" : ""}`}
                  >
                    <div className="truncate font-medium">
                      {r.display.split(",")[0]}
                    </div>
                    <div className="truncate text-[10px] text-muted-foreground">
                      {r.display.split(",").slice(1).join(",").trim()}
                    </div>
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationPicker;
