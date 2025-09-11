import React from "react";
import SearchResultItem from "./SearchResultItem";

const SearchResults = ({
  query,
  results,
  loading,
  error,
  onResultClick,
  title = "Hasil Pencarian:",
  maxHeight = "max-h-48",
}) => {
  return (
    <div>
      <h3 className="mb-2 text-xs font-medium text-muted-foreground">
        {title}
      </h3>
      <div className={`${maxHeight} overflow-auto rounded border bg-popover`}>
        {loading && (
          <div className="p-3 text-xs text-muted-foreground">
            Mencari lokasi...
          </div>
        )}

        {error && <div className="p-3 text-xs text-destructive">{error}</div>}

        {!loading &&
          !error &&
          results.length === 0 &&
          query.trim().length >= 3 && (
            <div className="p-3 text-xs text-muted-foreground">
              Tidak ada hasil ditemukan untuk "{query}".
            </div>
          )}

        {!loading &&
          results.map((result, idx) => (
            <SearchResultItem
              key={result.id}
              result={result}
              onClick={() => onResultClick(result)}
              showBorder={idx > 0}
            />
          ))}
      </div>
    </div>
  );
};

export default SearchResults;
