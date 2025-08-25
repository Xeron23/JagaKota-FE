// import jumbotron from "@/assets/images/landing-page-jumbotron.svg";
import { Button } from "@/components/ui/button.jsx";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? ""; // e.g. https://api.example.com

async function fetchProvinces() {
  const res = await fetch(`${API_BASE}/provinces`);
  const json = await res.json();
  if (!res.ok || json.status !== true)
    throw new Error(json.message || "Failed");
  return Array.isArray(json.data) ? json.data : [];
}

async function fetchRegencies(provinceId) {
  const res = await fetch(`${API_BASE}/provinces/${provinceId}/regencies`);
  const json = await res.json();
  if (!res.ok || json.status !== true)
    throw new Error(json.message || "Failed");
  return Array.isArray(json.data) ? json.data : [];
}

export default function Jumbotron() {
  const [province, setProvince] = useState("");
  const [regency, setRegency] = useState("");

  const {
    data: provinces = [],
    isLoading: provincesLoading,
    isError: provincesError,
    refetch: refetchProvinces,
  } = useQuery({
    queryKey: ["provinces"],
    queryFn: fetchProvinces,
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: regencies = [],
    isLoading: regenciesLoading,
    isError: regenciesError,
    refetch: refetchRegencies,
  } = useQuery({
    queryKey: ["regencies", province],
    queryFn: () => fetchRegencies(province),
    enabled: !!province,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });

  function handleProvinceChange(e) {
    const pid = e.target.value;
    setProvince(pid);
    setRegency("");
  }

  function handleRegencyChange(e) {
    setRegency(e.target.value);
  }

  const canReport = province && regency;

  return (
    <section
      id="home"
      className="relative h-[90vh] w-full overflow-hidden px-32 text-[#eef6ff]"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0 bg-[url(@/assets/images/jumbotron-background.jpg)] bg-cover bg-center bg-no-repeat" />
      {/* Dark overlay */}
      <div className="absolute inset-0 z-10 bg-black/80" />

      <div className="container relative z-20 mx-auto">
        <div className="flex min-h-[80vh] items-center gap-12 py-12 text-center">
          <div className="flex flex-col justify-center">
            <h1 className="mb-6 text-5xl font-bold leading-[60px] tracking-tight">
              Laporkan Kerusakan Infrastruktur di Daerah Anda
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-gray-100">
              Bantu pemerintah memperbaiki jalan rusak, lampu jalan mati,
              drainase tersumbat, dan kerusakan lainnya. Laporkan lokasi dan
              detail agar tim kami bisa menindaklanjuti lebih cepat dengan{" "}
              <span className="font-bold text-[#eef6ff]">JagaKota</span>
            </p>

            <div className="mb-6 rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm text-gray-200">
                    Provinsi
                  </label>
                  <select
                    value={province}
                    onChange={handleProvinceChange}
                    disabled={provincesLoading}
                    className="h-[50px] w-full rounded-md border border-white/20 bg-white/10 px-4 text-white outline-none transition focus:border-white/40 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <option value="" className="text-black">
                      {provincesLoading ? "Memuat..." : "Pilih Provinsi"}
                    </option>
                    {provinces
                      .slice()
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((p) => (
                        <option
                          key={p.province_id}
                          value={p.province_id}
                          className="text-black"
                        >
                          {p.name}
                        </option>
                      ))}
                  </select>
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

                <div>
                  <label className="mb-2 block text-sm text-gray-200">
                    Kabupaten/Kota
                  </label>
                  <select
                    value={regency}
                    onChange={handleRegencyChange}
                    disabled={!province || regenciesLoading}
                    className="h-[50px] w-full rounded-md border border-white/20 bg-white/10 px-4 text-white outline-none transition focus:border-white/40 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="" className="text-black">
                      {!province
                        ? "Pilih Provinsi dulu"
                        : regenciesLoading
                          ? "Memuat..."
                          : "Pilih Kabupaten/Kota"}
                    </option>
                    {regencies
                      .slice()
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((r) => (
                        <option
                          key={r.regency_id}
                          value={r.regency_id}
                          className="text-black"
                        >
                          {r.name}
                        </option>
                      ))}
                  </select>
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
            </div>

            <Button
              variant="secondary"
              size="lg"
              disabled={!canReport}
              className="h-[50px] w-[200px] items-center transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
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
    </section>
  );
}
