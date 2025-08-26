import { useGetProvinces } from "@/hooks/useGetProvinces.jsx";
import { useGetRegencies } from "@/hooks/useGetRegencies.jsx";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function ProvinceRegencySelect({
  provinceId,
  regencyId,
  onProvinceChange,
  onRegencyChange,
  className = "",
  disabled = false,
}) {
  const {
    data: provinces = [],
    isLoading: provincesLoading,
    isError: provincesError,
    refetch: refetchProvinces,
  } = useGetProvinces();

  const {
    data: regencies = [],
    isLoading: regenciesLoading,
    isError: regenciesError,
    refetch: refetchRegencies,
  } = useGetRegencies(provinceId);

  const handleProvinceChange = (v) => {
    onProvinceChange?.(v);
    onRegencyChange?.("");
  };

  return (
    <div className={`grid grid-cols-1 gap-4 md:grid-cols-2 ${className}`}>
      {/* Province */}
      <div className="text-left">
        <label className="mb-2 block text-sm text-gray-200">Provinsi</label>
        <Select
          value={provinceId}
          onValueChange={handleProvinceChange}
          disabled={disabled || provincesLoading}
        >
          <SelectTrigger className="h-[50px] w-full rounded-md border border-white/20 bg-white/10 text-white placeholder:text-white/80 focus:border-white/40 focus:ring-2 focus:ring-white/40">
            <SelectValue
              placeholder={provincesLoading ? "Memuat..." : "Pilih Provinsi"}
            />
          </SelectTrigger>
          <SelectContent className="max-h-64 overflow-auto border-white/15 bg-neutral-900/95 text-white backdrop-blur-md">
            {provinces.map((p) => (
              <SelectItem
                key={p.province_id}
                value={String(p.province_id)}
                className="cursor-pointer focus:bg-white/10 data-[highlighted]:bg-white/10"
              >
                {p.name}
              </SelectItem>
            ))}
            {!provincesLoading && provinces.length === 0 && (
              <SelectItem disabled value="empty">
                Tidak ada data
              </SelectItem>
            )}
          </SelectContent>
        </Select>
        {provincesError && (
          <div className="mt-2 text-sm text-red-300">
            Gagal memuat provinsi.{" "}
            <button onClick={() => refetchProvinces()} className="underline">
              Coba lagi
            </button>
          </div>
        )}
      </div>

      {/* Regency */}
      <div className="text-left">
        <label className="mb-2 block text-sm text-gray-200">
          Kabupaten/Kota
        </label>
        <Select
          value={regencyId}
          onValueChange={(v) => onRegencyChange?.(v)}
          disabled={disabled || !provinceId || regenciesLoading}
        >
          <SelectTrigger className="h-[50px] w-full rounded-md border border-white/20 bg-white/10 text-white placeholder:text-white/80 focus:border-white/40 focus:ring-2 focus:ring-white/40">
            <SelectValue
              placeholder={
                !provinceId
                  ? "Pilih Provinsi dulu"
                  : regenciesLoading
                    ? "Memuat..."
                    : "Pilih Kabupaten/Kota"
              }
            />
          </SelectTrigger>
          <SelectContent className="max-h-64 overflow-auto border-white/15 bg-neutral-900/95 text-white backdrop-blur-md">
            {regencies.map((r) => (
              <SelectItem
                key={r.regency_id}
                value={String(r.regency_id)}
                className="cursor-pointer focus:bg-white/10 data-[highlighted]:bg-white/10"
              >
                {r.name}
              </SelectItem>
            ))}
            {!regenciesLoading && provinceId && regencies.length === 0 && (
              <SelectItem disabled value="empty">
                Tidak ada data
              </SelectItem>
            )}
          </SelectContent>
        </Select>
        {regenciesError && (
          <div className="mt-2 text-sm text-red-300">
            Gagal memuat kabupaten/kota.{" "}
            <button onClick={() => refetchRegencies()} className="underline">
              Coba lagi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
