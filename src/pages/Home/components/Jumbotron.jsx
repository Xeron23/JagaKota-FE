// import jumbotron from "@/assets/images/landing-page-jumbotron.svg";
import { Button } from "@/components/ui/button.jsx";
import { useState } from "react";
// ...existing code...
import { useGetProvinces } from "@/hooks/useGetProvinces.jsx";
import { useGetRegencies } from "@/hooks/useGetRegencies.jsx";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function Jumbotron() {
  const [province, setProvince] = useState("");
  const [regency, setRegency] = useState("");

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
  } = useGetRegencies(province);

  const canReport = province && regency;

  return (
    <section
      id="home"
      className="relative h-[90vh] w-full overflow-hidden px-32 text-[#eef6ff]"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[url(@/assets/images/jumbotron-background.jpg)] bg-cover bg-center bg-no-repeat" />
      <div className="absolute inset-0 z-10 bg-black/70" />

      {/* Content */}
      <div className="container relative z-20 mx-auto">
        <div className="flex min-h-[80vh] items-center gap-12 py-12 text-center">
          <div className="mx-auto flex w-full max-w-6xl flex-col justify-center">
            <h1 className="mb-6 text-5xl font-bold leading-[60px] tracking-tight">
              Laporkan Kerusakan Infrastruktur di Daerah Anda
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-gray-100">
              Bantu pemerintah memperbaiki jalan rusak, lampu jalan mati,
              drainase tersumbat, dan kerusakan lainnya. Laporkan lokasi dan
              detail agar tim kami bisa menindaklanjuti lebih cepat dengan{" "}
              <span className="font-bold text-[#eef6ff]">JagaKota</span>
            </p>

            {/* Form */}
            <div className="mb-6 rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-4">
                {/* Province */}
                <div className="text-left">
                  <label className="mb-2 block text-sm text-gray-200">
                    Provinsi
                  </label>
                  <Select
                    value={province}
                    onValueChange={(v) => {
                      setProvince(v);
                      setRegency("");
                    }}
                    disabled={provincesLoading}
                  >
                    <SelectTrigger className="h-[50px] w-full rounded-md border border-white/20 bg-white/10 text-white placeholder:text-white/80 focus:border-white/40 focus:ring-2 focus:ring-white/40">
                      <SelectValue
                        placeholder={
                          provincesLoading ? "Memuat..." : "Pilih Provinsi"
                        }
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
                      <button
                        onClick={() => refetchProvinces()}
                        className="underline"
                      >
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
                    value={regency}
                    onValueChange={(v) => setRegency(v)}
                    disabled={!province || regenciesLoading}
                  >
                    <SelectTrigger className="h-[50px] w-full rounded-md border border-white/20 bg-white/10 text-white placeholder:text-white/80 focus:border-white/40 focus:ring-2 focus:ring-white/40">
                      <SelectValue
                        placeholder={
                          !province
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
                      {!regenciesLoading &&
                        province &&
                        regencies.length === 0 && (
                          <SelectItem disabled value="empty">
                            Tidak ada data
                          </SelectItem>
                        )}
                    </SelectContent>
                  </Select>
                  {regenciesError && (
                    <div className="mt-2 text-sm text-red-300">
                      Gagal memuat kabupaten/kota.{" "}
                      <button
                        onClick={() => refetchRegencies()}
                        className="underline"
                      >
                        Coba lagi
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <Button
                variant="secondary"
                size="lg"
                disabled={!canReport}
                className="mt-6 flex h-[50px] w-full transition-transform disabled:cursor-not-allowed disabled:opacity-60"
                onClick={() =>
                  console.log("Mulai Lapor:", {
                    provinceId: province,
                    regencyId: regency,
                  })
                }
              >
                {canReport ? "Mulai Lapor" : "Pilih Lokasi Dulu"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
