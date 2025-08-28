import backgroundImage from "@/assets/images/reportcarrousel-background.svg";
import ReportCard from "@/components/ReportCard";
import { useGetReports } from "@/hooks/useGetReports";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect } from "react";

export default function ReportCarrousel() {
  const {
    data: reports = [],
    isLoading,
    isError,
    // error,
    refetch,
  } = useGetReports({ offset: 0, limit: 6 });

  const swiperConfig = {
    modules: [Autoplay, Navigation, Pagination],
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    spaceBetween: 16,
    slidesPerView: 4,
    loop: true,
    navigation: {
      nextEl: ".custom-next",
      prevEl: ".custom-prev",
    },
  };

  useEffect(() => {
    console.log("Reports fetched:", reports);
  });

  return (
    <section
      id="reportcarrousel"
      className="relative isolate flex w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#F7F9FC] to-white px-6 py-20 text-black"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[#F7EEDF]">
        <div className="absolute -top-40 left-1/3 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-blue-400/15 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-[360px] w-[360px] rounded-full bg-blue-400/15 blur-3xl" />
        <div className="absolute inset-0 [background-image:radial-gradient(60%_40%_at_50%_0%,rgba(255,255,255,0.18),transparent)]" />
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div
          className="absolute inset-0 top-8 bg-[length:1000px_900px] bg-left-top bg-repeat opacity-45"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      </div>

      {/* Content */}
      <div className="flex w-full flex-col text-left">
        <div className="mb-8 flex items-center justify-between px-12">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Jelajahi Laporan Terbaru dari Warga
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-gray-800">
              Temukan berbagai laporan kerusakan infrastruktur yang telah
              dilaporkan oleh warga di seluruh Indonesia. Bersama, kita bisa
              membuat perubahan nyata.
            </p>
          </div>
          <div className="flex items-center gap-9 self-auto">
            <button className="custom-prev !static left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100">
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>
            <button className="custom-next !static right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100">
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>

        {isError ? (
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-rose-800">
            <div className="mb-2 font-semibold">Gagal memuat laporan</div>
            <div className="text-sm">"Terjadi kesalahan."</div>
            {console.log("Error fetching reports:", isError)}
            <Button
              onClick={() => refetch()}
              className="mt-3 rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white hover:bg-gray-800"
            >
              Coba lagi
            </Button>
          </div>
        ) : !isLoading && reports.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-center text-gray-600">
            Belum ada laporan.
          </div>
        ) : (
          <div className="relative w-full px-14">
            <Swiper {...swiperConfig}>
              {(isLoading ? Array.from({ length: 4 }) : reports).map((r, i) => (
                <SwiperSlide key={isLoading ? `s-${i}` : r.report_id}>
                  <ReportCard
                    report={isLoading ? {} : r}
                    loading={isLoading}
                    className="mx-auto"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}
