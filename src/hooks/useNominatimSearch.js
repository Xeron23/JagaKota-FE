import { useState, useEffect, useRef } from "react";

const NOMINATIM_ENDPOINT = "https://nominatim.openstreetmap.org/search";

export const useNominatimSearch = (options = {}) => {
  const {
    debounceMs = 300,
    minQueryLength = 3,
    limit = 6,
    countryCode = "id",
    language = "id,en"
  } = options;

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setError(null);

    if (query.trim().length < minQueryLength) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    timeoutRef.current = setTimeout(async () => {
      try {
        if (abortRef.current) {
          abortRef.current.abort();
        }

        const controller = new AbortController();
        abortRef.current = controller;

        const url = new URL(NOMINATIM_ENDPOINT);
        url.searchParams.set("q", query.trim());
        url.searchParams.set("format", "jsonv2");
        url.searchParams.set("addressdetails", "1");
        url.searchParams.set("limit", limit.toString());
        url.searchParams.set("countrycodes", countryCode);

        const res = await fetch(url.toString(), {
          signal: controller.signal,
          headers: {
            "Accept-Language": language,
            "User-Agent": "JagaKota-App/1.0",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

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
    }, debounceMs);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, [query, debounceMs, minQueryLength, limit, countryCode, language]);

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
