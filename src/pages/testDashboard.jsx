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
    <div className="min-h-screen flex flex-col bg-[#FFFFFF] text-gray-800">
      <NavBar />

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        <div className="w-full flex flex-wrap h-[561px] bg-[#F7EEDF]">
          {/* Left Side */}
          <div className="w-full md:w-[calc(60%-25px)] bg-[#F7EEDF] flex flex-col justify-center items-center py-10 px-4">
            <div className="w-full md:w-2/3 max-w-[345px] h-[231px] bg-white rounded-lg shadow p-6 flex flex-col justify-between">
              <p className="text-[32px] font-semibold text-black leading-snug mb-4">
                Satu laporan <br />
                untuk menjaga <br />
                fasilitas kota
              </p>
              <button className="self-end bg-[#6B8F71] text-white px-6 py-2 rounded-md flex items-center gap-2 hover:bg-[#5A7A5F] transition-colors duration-200">
                Mulai
                <span>››</span>
              </button>
            </div>
            <p className="mt-4 text-gray-700 font-semibold w-full md:w-2/3 max-w-[345px]">
              Fasilitas rusak bikin ribet? JagaKota menjadi solusi cepat
            </p>
          </div>

          {/* Right Side */}
          <div className="w-full md:w-[calc(40%-25px)] bg-[url('/images/Rectangle17.svg')] flex flex-col justify-start p-10 space-y-6 h-[561px]"></div>
        </div>

        {/* Swiper Section */}
        <section className="px-6 py-6 mt-[30px]">
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
                style={{ width: "329px" }} // Gunakan style inline agar tidak dilanggar
                className="flex-shrink-0"
              >
                <a href="#slide-{i}">
                  <div className="bg-white w-[331px] h-[282px] rounded text-black font-semibold overflow-hidden shadow-md shadow-gray-400/50 shadow-b ">
                    {/* Gambar */}
                    <img
                      src="/images/jl_pangeran.svg"
                      alt="Pengecoran di Jalan Pangeran"
                      className="w-full h-[158px] object-cover"
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

      <div className="flex w-full h-[421px]  overflow-hidden">
        {/* Gambar */}
        <div className="w-[893px] h-full">
          <img
            src="/images/Intersect.png"
            alt="Intersect"
            className="w-full h-full object-cover block"
          />
        </div>

        {/* Teks */}
        <div className="bg-[#6B8F71] flex-1 h-full flex flex-col justify-center px-10 text-white -ml-1">
          <p className="text-xl font-semibold">Menyalurkan Bantuan Untuk</p>
          <p className="text-6xl font-bold leading-tight">21</p>
          <p className="text-xl font-semibold">Kota dan Kabupaten</p>
        </div>
      </div>

      <div className="h-[190px] w-[1115px] bg-[#F7EEDF] mx-auto mb-[50px] mt-[70px] rounded-xl flex items-center justify-around text-center">
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
        className="h-[551px] w-full mx-auto mt-[50px] bg-[#DEBC7D] flex items-center justify-end pr-[50px] bg-no-repeat"
        style={{
          backgroundImage: "url('/images/ds1.png'), url('/images/ds2.png')",
          backgroundPosition: "left 100%, right 50px",
          backgroundSize: "auto 320px, auto 550px",
        }}
      >
        {/* Bagian Tulisan Kiri */}
        <div className="flex-1 pl-[200px] -mt-[70px]">
          <h2 className="text-[32px] font-bold text-black leading-relaxed">
            4 Langkah mudah untuk <br />
            melaporkan kerusakan dan <br />
            membantu kota.
          </h2>
        </div>

        {/* Grid Card Kanan */}
        <div className="grid grid-cols-2 gap-x-[40px] gap-y-[40px]">
          <div className="w-[329px] h-[190px] bg-[#F7EEDF] flex items-center justify-center">
            Buatkan Laporan
          </div>
          <div className="w-[329px] h-[190px] bg-[#F7EEDF]"></div>
          <div className="w-[329px] h-[190px] bg-[#F7EEDF]"></div>
          <div className="w-[329px] h-[190px] bg-[#F7EEDF]"></div>
        </div>
      </div>
    </div>
  );
}
