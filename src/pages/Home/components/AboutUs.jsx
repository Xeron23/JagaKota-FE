import { Button } from "@/components/ui/button";
import about from "@/assets/images/about.png";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  const handleNavigateToReport = () => {
    navigate("/laporan/upload");
    window.scrollTo(0, 0);
  };
  return (
    <section className="isolate grid h-[80vh] w-full grid-cols-2 items-center justify-center bg-gradient-to-b px-20 text-black">
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-[360px] w-[360px] rounded-full bg-amber-300/25 blur-3xl" />
        <div className="absolute inset-0 [background-image:radial-gradient(60%_40%_at_50%_0%,rgba(255,255,255,0.9),transparent)]" />
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] [background-size:22px_22px]" />
      </div>

      <div className="container mx-auto">
        <h2 className="mb-6 text-left text-4xl font-bold text-gray-900">
          Satu laporan untuk menjaga fasilitas kota
        </h2>
        <p className="mb-8 text-lg leading-relaxed text-gray-800">
          Bantu pemerintah memperbaiki jalan rusak, lampu jalan mati, drainase
          tersumbat, dan kerusakan lainnya. Laporkan lokasi dan detail agar tim
          kami bisa menindaklanjuti lebih cepat dengan{" "}
          <span className="font-bold text-gray-950">JagaKota</span>
        </p>
        <Button
          variant="outline"
          size="lg"
          className="rounded-full"
          onClick={handleNavigateToReport}
        >
          Mulai lapor
        </Button>
      </div>
      <div className="flex items-center justify-center">
        <img
          src={about}
          alt="About Us Illustration"
          className="shadow-3xl w-3/4 rounded-lg bg-blue-600"
        />
      </div>
    </section>
  );
};

export default AboutUs;
