import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, X as XIcon } from "lucide-react";

const SearchBar = ({
  value = "",
  onChange,
  delay = 400,
  placeholder = "Cari...",
  ariaLabel = "Search",
  className = "w-96",
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (localValue !== value) onChange?.(localValue);
    }, delay);
    return () => clearTimeout(t);
  }, [localValue, value, delay, onChange]);

  const handleClear = () => {
    setLocalValue("");
  };

  return (
    <div className={`relative ${className}`}>
      <SearchIcon className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <Input
        type="text"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setLocalValue("");
        }}
        aria-label={ariaLabel}
        className="pl-8 pr-8"
      />
      {localValue ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-slate-500"
          onClick={handleClear}
          aria-label="Bersihkan pencarian"
          title="Bersihkan"
        >
          <XIcon className="h-4 w-4" />
        </Button>
      ) : null}
    </div>
  );
};

export default SearchBar;
