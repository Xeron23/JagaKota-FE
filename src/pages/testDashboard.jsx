import { Link } from "react-router-dom";
import { useAuth } from "../context/Auth.jsx";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y } from "swiper/modules"; // Tanpa Navigation
import "swiper/css";
import "swiper/css/pagination";
import NavBar from "../components/Navbar.jsx";

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen flex-col bg-[#FFFFFF] text-gray-800">
      <NavBar />

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        <div className="flex h-[561px] w-full flex-wrap bg-[#F7EEDF]">
          {/* Left Side */}
          <div className="flex w-full flex-col items-center justify-center bg-[#F7EEDF] px-4 py-10 md:w-[calc(60%-25px)]">
            <div className="flex h-[231px] w-full max-w-[345px] flex-col justify-between rounded-lg bg-white p-6 shadow md:w-2/3">
              <p className="mb-4 text-[32px] font-semibold leading-snug text-black">
                Satu laporan <br />
                untuk menjaga <br />
                fasilitas kota
              </p>
              <button className="flex items-center gap-2 self-end rounded-md bg-[#6B8F71] px-6 py-2 text-white transition-colors duration-200 hover:bg-[#5A7A5F]">
                Mulai
                <span>››</span>
              </button>
            </div>
            <p className="mt-4 w-full max-w-[345px] font-semibold text-gray-700 md:w-2/3">
              Fasilitas rusak bikin ribet? JagaKota menjadi solusi cepat
            </p>
          </div>

          {/* Right Side */}
          <div className="flex h-[561px] w-full flex-col justify-start space-y-6 bg-[url('/images/Rectangle17.svg')] p-10 md:w-[calc(40%-25px)]"></div>
        </div>

        {/* Swiper Section */}
        <section className="mt-[30px] px-6 py-6">
          <Swiper
            modules={[Pagination, A11y]}
            spaceBetween={20}
            slidesPerView="auto"
            // pagination={{ clickable: true }}
            grabCursor={true}
            className="swiper-custom"
            style={{ paddingBottom: "2rem" }}
          >
            {[...Array(8)].map((_, i) => (
              <SwiperSlide
                key={i}
                style={{ width: "329px" }}
                className="flex-shrink-0"
              >
                <a href="#slide-{i}">
                  <div className="shadow-b h-[282px] w-[331px] overflow-hidden rounded bg-white font-semibold text-black shadow-md shadow-gray-400/50">
                    {/* Gambar */}
                    <img
                      src="/images/jl_pangeran.svg"
                      alt="Pengecoran di Jalan Pangeran"
                      className="h-[158px] w-full object-cover"
                    />

                    {/* Text */}
                    <div className="p-3">
                      <h3 className="text-sm font-bold">
                        Pengecoran di Jalan Pangeran
                      </h3>
                      <p className="text-xs font-normal text-gray-600">
                        Terjadi bolongan di Jalan Pangeran yang menimbulkan
                        kecelakaan...
                      </p>
                    </div>
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </main>

      <div className="flex h-[421px] w-full overflow-hidden">
        {/* Gambar */}
        <div className="h-full w-[893px]">
          <img
            src="/images/Intersect.png"
            alt="Intersect"
            className="block h-full w-full object-cover"
          />
        </div>

        {/* Teks */}
        <div className="-ml-1 flex h-full flex-1 flex-col justify-center bg-[#6B8F71] px-10 text-white">
          <p className="text-xl font-semibold">Menyalurkan Bantuan Untuk</p>
          <p className="text-6xl font-bold leading-tight">21</p>
          <p className="text-xl font-semibold">Kota dan Kabupaten</p>
        </div>
      </div>

      <div className="mx-auto mb-[50px] mt-[70px] flex h-[190px] w-[1115px] items-center justify-around rounded-xl bg-[#F7EEDF] text-center">
        {/* Box 1 */}
        <div className="flex-1">
          <h2 className="text-[64px] font-bold">230</h2>
          <p className="text-[15px]">Laporan Harian Masuk</p>
        </div>

        {/* Garis */}
        <div className="h-[157px] w-[2px] bg-[#DEBC7D]"></div>

        {/* Box 2 */}
        <div className="flex-1">
          <h2 className="text-[64px] font-bold">89%</h2>
          <p className="text-[15px]">Kesuksesan Laporan Diterima</p>
        </div>

        {/* Garis */}
        <div className="h-[157px] w-[2px] bg-[#DEBC7D]"></div>

        {/* Box 3 */}
        <div className="flex-1">
          <h2 className="text-[64px] font-bold">150</h2>
          <p className="text-[15px]">Bantuan dari Organisasi Lokal</p>
        </div>

        {/* Garis */}
        <div className="h-[157px] w-[2px] bg-[#DEBC7D]"></div>

        {/* Box 4 */}
        <div className="flex-1">
          <h2 className="text-[64px] font-bold">14</h2>
          <p className="text-[15px]">
            Penghargaan Pengabdian
            <br />
            Masyarakat dari Wali Kota
          </p>
        </div>
      </div>

      <div
        className="mx-auto mt-[50px] flex h-[551px] w-full items-center justify-end bg-[#DEBC7D] bg-no-repeat pr-[50px]"
        style={{
          backgroundImage: "url('/images/ds1.png'), url('/images/ds2.png')",
          backgroundPosition: "left 100%, right 50px",
          backgroundSize: "auto 320px, auto 550px",
        }}
      >
        {/* Bagian Tulisan Kiri */}
        <div className="-mt-[70px] flex-1 pl-[200px]">
          <h2 className="text-[32px] font-bold leading-relaxed text-black">
            4 Langkah mudah untuk <br />
            melaporkan kerusakan dan <br />
            membantu kota.
          </h2>
        </div>

        {/* Grid Card Kanan */}
        <div className="grid grid-cols-2 gap-x-[40px] gap-y-[40px]">
          <div className="flex h-[190px] w-[329px] items-center justify-center bg-[#F7EEDF]">
            Buatkan Laporan
          </div>
          <div className="h-[190px] w-[329px] bg-[#F7EEDF]"></div>
          <div className="h-[190px] w-[329px] bg-[#F7EEDF]"></div>
          <div className="h-[190px] w-[329px] bg-[#F7EEDF]"></div>
        </div>
      </div>
    </div>
  );
}
