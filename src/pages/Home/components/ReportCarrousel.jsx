import backgroundImage from "@/assets/images/reportcarrousel-background.svg";
import ReportCard from "@/components/ReportCard";

export default function ReportCarrousel() {
  return (
    <section
      id="reportcarrousel"
      className="relative isolate flex h-[80vh] w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#F7F9FC] to-white px-6 py-12 text-black"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[#F7EEDF]">
        {/* Soft blobs */}
        <div className="absolute -top-40 left-1/3 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-blue-400/15 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-[360px] w-[360px] rounded-full bg-blue-400/15 blur-3xl" />
        {/* Radial spotlight */}
        <div className="absolute inset-0 [background-image:radial-gradient(60%_40%_at_50%_0%,rgba(255,255,255,0.18),transparent)]" />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:22px_22px]" />
        {/* City Background */}
        <div
          className="absolute inset-0 bg-[length:600px_900px] bg-left-top bg-repeat opacity-45"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      </div>

      {/* Content */}
      <div className="mx-16 flex h-full w-full flex-col text-left">
        <div>
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Jelajahi Laporan Terbaru dari Warga
          </h2>
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-gray-800">
            Temukan berbagai laporan kerusakan infrastruktur yang telah
            dilaporkan oleh warga di seluruh Indonesia. Bersama, kita bisa
            membuat perubahan nyata.
          </p>
        </div>
        <ReportCard />
      </div>
    </section>
  );
}
