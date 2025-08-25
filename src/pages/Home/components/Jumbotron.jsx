// import jumbotron from "@/assets/images/landing-page-jumbotron.svg";
import { Button } from "@/components/ui/button.jsx";

export default function Jumbotron() {
  return (
    <section
      id="home"
      className="relative h-[90vh] w-full overflow-hidden px-32 text-white"
    >
      <div className="brightness-25 absolute inset-0 z-10 bg-[url(@/assets/images/jumbotron-background.jpg)] bg-cover bg-center bg-no-repeat"></div>
      <div className="absolute inset-0 z-10 bg-black/70" />

      <div className="container relative z-10 mx-auto">
        <div className="flex min-h-[80vh] items-center gap-8 py-12 text-center">
          <div className="flex flex-col justify-center">
            <h1 className="mb-6 text-5xl font-bold leading-[60px] tracking-tight">
              Laporkan Kerusakan Infrastruktur di Daerah Anda
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-gray-100">
              Bantu pemerintah memperbaiki jalan rusak, lampu jalan mati,
              drainase tersumbat, dan kerusakan lainnya. Laporkan lokasi dan
              detail agar tim kami bisa menindaklanjuti lebih cepat dengan{" "}
              <span className="font-bold text-white">JagaKota</span>
            </p>

            <Button
              variant="secondary"
              size="lg"
              className="h-[50px] w-[178px] transition-transform hover:scale-105"
            >
              Daftar Sekarang
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
