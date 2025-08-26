// import jumbotron from "@/assets/images/landing-page-jumbotron.svg";
import { Button } from "@/components/ui/button.jsx";
import { useState } from "react";
import ProvinceRegencySelect from "@/components/ProvinceRegencySelect.jsx";

export default function Jumbotron() {
  const [province, setProvince] = useState("");
  const [regency, setRegency] = useState("");

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
            <p className="mb-8 text-lg leading-relaxed text-gray-200">
              Bantu pemerintah memperbaiki jalan rusak, lampu jalan mati,
              drainase tersumbat, dan kerusakan lainnya. Laporkan lokasi dan
              detail agar tim kami bisa menindaklanjuti lebih cepat dengan{" "}
              <span className="font-bold text-[#eef6ff]">JagaKota</span>
            </p>

            {/* Card wrapper */}
            <div className="mb-6 rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <p>cari laporan</p>
              <ProvinceRegencySelect
                provinceId={province}
                regencyId={regency}
                onProvinceChange={setProvince}
                onRegencyChange={setRegency}
              />

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
