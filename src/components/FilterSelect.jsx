import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const ALL = "ALL";

const FilterSelect = ({
  label,
  placeholder,
  options,
  value,
  onChange,
  allLabel = "Semua",
  className = "",
}) => {
  const currentValue = value ? value : ALL;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-sm text-slate-600">{label}</label>
      <Select
        value={currentValue}
        onValueChange={(v) => onChange(v === ALL ? "" : v)}
      >
        <SelectTrigger className="h-[50px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>{allLabel}</SelectItem>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterSelect;