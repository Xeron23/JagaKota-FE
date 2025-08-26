export default function AboutUs() {
  const stats = [
    { label: "Laporan Harian Masuk", value: "230" },
    { label: "Laporan Diterima", value: "89%" },
    { label: "Bantuan Dari Organisasi", value: "150" },
    { label: "Penghargaan dan Pengabdian", value: "14" },
  ];

  return (
    <section
      id="about-us"
      className="relative isolate flex h-[80vh] w-full items-center justify-center bg-gradient-to-b from-[#F7F9FC] to-white px-6 py-20 text-black"
    >
      {/* Background effects */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-[360px] w-[360px] rounded-full bg-amber-300/25 blur-3xl" />
        <div className="absolute inset-0 [background-image:radial-gradient(60%_40%_at_50%_0%,rgba(255,255,255,0.9),transparent)]" />
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:22px_22px]" />
      </div>

      {/* Content */}
      <div className="mx-auto h-full w-full">
        <div className="mx-auto h-full w-full max-w-6xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Transparan, cepat, dan berdampak nyata
            </h2>
            <p className="mt-3 text-base leading-relaxed text-gray-600 md:text-lg">
              JagaKota menghubungkan laporan warga dengan instansi terkait untuk
              mempercepat perbaikan infrastruktur di sekitar Anda.
            </p>
            <div className="mt-4 grid max-w-6xl grid-cols-4 divide-x divide-black/10 overflow-hidden rounded-xl border border-white/15 bg-[#F7EEDF]/75 shadow-xl shadow-blue-500/10 backdrop-blur-sm">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center space-y-3 px-12 py-7 text-center transition-all duration-300 ease-out hover:bg-[#c2851f] hover:text-white focus:outline-none focus-visible:-translate-y-2 focus-visible:bg-black focus-visible:text-white"
                >
                  <h1 className="text-6xl font-[600]">{stat.value}</h1>
                  <h2 className="text-md font-[400]">{stat.label}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
