import React, { useRef } from "react";
import SearchResults from "./SearchResults";

const LocationSearch = ({
  query,
  onQueryChange,
  results,
  loading,
  error,
  onResultClick,
  placeholder = "Ketik nama tempat atau alamat (min 3 huruf)...",
  label = "Cari Lokasi:",
}) => {
  const inputRef = useRef(null);

  const showSearchResults =
    query.trim().length >= 3 && (results.length > 0 || loading || error);

  return (
    <div className="border-b p-4">
      <div className="mb-3">
        <label className="mb-2 block text-xs font-medium text-muted-foreground">
          {label}
        </label>
        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder={placeholder}
          onChange={(e) => onQueryChange(e.target.value)}
          className="w-full rounded border border-input bg-background px-3 py-2 text-xs outline-none ring-offset-background focus:ring-2 focus:ring-ring"
        />
      </div>

      {showSearchResults && (
        <SearchResults
          query={query}
          results={results}
          loading={loading}
          error={error}
          onResultClick={onResultClick}
        />
      )}
    </div>
  );
};

export default LocationSearch;
