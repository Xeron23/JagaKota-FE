import ButtonSubmit from "@/components/button";
import ProvinceRegencySelect from "@/components/ProvinceRegencySelect";
import { useEffect, useState } from "react";
import imageadmin1 from "../../assets/images/imageadmin1.png"


export default function DashboardAdmin() {

    const [province, setProvince] = useState("");
    const [regency, setRegency] = useState("");

    const canReport = province && regency
    
    const data = [
      { id: 1, img: imageadmin1, likes: "1,2rb", reports: 500, location: "Kota Bogor." },
      { id: 2, img: imageadmin1, likes: "800", reports: 200, location: "Kota Bandung." },
      { id: 3, img: imageadmin1, likes: "1rb", reports: 350, location: "Kota Depok." },
      { id: 4, img: imageadmin1, likes: "2rb", reports: 200, location: "Kota Jakarta." },
  ];

    return (
      <div className="container mx-auto pl-60 pr-60 m-12 ">
        <div className="flex justify-between items-start gap-4">
          <div className="mr-6">
            <div className="flex justify-between gap-6">
              <div className="w-52 h-48 bg-white rounded-md">
                <h1 className="text-center mt-3 font-semibold text-xl">
                  Laporan Hari Ini
                </h1>
                <p className="text-center mt-12 font-extrabold text-6xl">150</p>
              </div>
              <div className="w-52 h-48 bg-white rounded-md">
                <h1 className="text-center mt-3 font-semibold text-xl">
                  Laporan Hari Ini
                </h1>
                <p className="text-center mt-12 font-extrabold text-6xl">150</p>
              </div>
            </div>

            <div className="w-full h-[340px] mt-6 bg-white rounded-md flex flex-col gap-4">
              <h1 className="m-4 font-semibold text-2xl">Grafik Daerah</h1>

              <ProvinceRegencySelect
                provinceId={province}
                regencyId={regency}
                onProvinceChange={setProvince}
                onRegencyChange={setRegency}
                f={true}
                className="text-black"
              />

              <ButtonSubmit
                onClick={() => console.log("test")}
                disabled={!canReport}
                style="w-1/4 h-12 bg-[#6B8F71] text-white rounded-md block mx-auto mb-2 text-center font-semibold mt-6"
              >
                {canReport ? "Cari" : "Pilih Lokasi"}
              </ButtonSubmit>
            </div>
          </div>
          <div className=" w-3/4 flex flex-col items-start">
            {data.map((item)=>{
              return (
              <div
                key={item.id}
                className="flex bg-white shadow-sm shadow-black/35 rounded-md overflow-hidden h-[119px] w-3/5 mb-2"
              >
                {/* Kiri: Gambar */}
                <div className="w-1/3">
                  <img
                    src={imageadmin1}
                    alt="test image"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Tengah: Konten */}
                <div className="flex flex-col justify-center px-4 flex-1 ">
                  <div className="flex items-center gap-2">
                    <span>🤍</span>
                    <p className="text-black font-semibold">{item.likes}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🏷️</span>
                    <p className="text-black font-semibold">{item.reports}</p>
                  </div>
                  <p className="mt-4 font-bold">{item.location}</p>
                </div>

                {/* Kanan: Strip Merah */}
                <div className="w-5 h-full bg-red-300" />
              </div>)
            })}
            <ButtonSubmit
                onClick={() => console.log("test")}
                style="w-1/4 h-12 bg-[#6B8F71] text-white rounded-md  mb-2 text-center font-semibold mt-6 ml-28"
              >
                {canReport ? "Cari" : "Pilih Lokasi"}
              </ButtonSubmit>
          </div>
        </div>
        <div className="w-[835px]  mt-8 h-52 bg-white rounded-md shadow-md">
            <h1 className="text-black text-center font-semibold p-2 text-xl">Statistik Laporan</h1>
            <div className="flex justify-center gap-40 p-6 ">
              {/* Box 1 */}
              <div className="flex flex-col items-center">
                <p className="text-6xl font-extrabold">150</p>
                <span className="text-lg font-medium text-black mt-1">Diterima</span>
              </div>

              {/* Box 2 */}
              <div className="flex flex-col items-center">
                <p className="text-6xl font-extrabold">150</p>
                <span className="text-lg font-medium text-black mt-1">Diproses</span>
              </div>

              {/* Box 3 */}
              <div className="flex flex-col items-center">
                <p className="text-6xl font-extrabold">150</p>
                <span className="text-lg font-medium text-black mt-1">Selesai</span>
              </div>
            </div>
        </div>
      </div>
    );
}

