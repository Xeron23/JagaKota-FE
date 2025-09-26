import React, { useEffect, useMemo, useRef, useState } from "react";

import { useGetReports } from "@/hooks/useGetReports";
import { Link, useNavigate } from "react-router-dom";
import { UpdateReport } from "@/hooks/useReport";
import {toast} from "react-hot-toast"
import { useAuth } from "@/context/Auth";
import close from "../../../assets/images/close-square.png"

const menuItems = [
  { name: 'Profile', path: '/profile' },
  { name: 'Riwayat', path: '/history' },
  { name: 'Leaderboard', path: '/leaderboard' },
]


export default function HistoryReport(){
    const { user } = useAuth();
  const [selected, setSelected] = useState(null);

  const queryParams = useMemo(
    () => ({
        userId: user.id, // ganti dengan user yg login

    }),
    [
      user.id
    ],
  );

  const { data, isLoading, isError, error, isFetching } = useGetReports(queryParams);
   
  
  const datas = data?.data ?? [];
  console.log(datas);
  
  useEffect(() => {
    
    if (!isLoading && !isError && datas.length > 0) {
      return setSelected(datas[0]);
    }
    return setSelected(null); // reset kalo ga ada data
    
  }, [isLoading, isError, datas]);

  return (
    <div className="min-h-screen flex justify-center items-start text-black  rounded-md">
    <div>
        <aside className="w-[189px] h-60 bg-[#6B8F71] rounded-sm p-4">
          <ul>
            {menuItems.map((item) => (
              <li key={item.name} className="mb-2">
                <Link to={item.path} className={`block p-2 rounded-xl mb-1 text-white
                  ${location.pathname === item.path ? 'bg-[#6cc77b]' : 'hover:bg-[#6cc77b]'}`}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
    </div>
      <div className="w-1/2 p-6 bg-white rounded-md">
        {selected ? (
          <div className="flex flex-col gap-4">
            <img
              src={selected.photoUrl}
              alt={selected.title}
              className="rounded-lg shadow-md p-3 w-full h-80"
            />
            <div className="flex justify-between gap-1">
              <div className="flex flex-auto ">
              <img  
                src="/images/heart.png" 
                className="w-6 h-6 m-1"
              />
              <p className="font-semibold text-xl m-0.5">{selected.likes.length}</p>
              <img  
                src="/images/message-edit.png" 
                className="w-6 h-6 m-1"
              />
              <p className="font-semibold text-xl m-0.5">{selected.comments.length}</p>
              </div>
              <p className="font-semibold text-sm m-0.5">{new Date(selected.createdAt).toLocaleDateString("en-GB")}</p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-full bg-[#F7EEDF] rounded-md p-2">
                <label className="font-semibold ">Deskripsi kerusakan: </label>
                <p className="font-light">{selected.description}</p>
              </div>
              <div className="w-full bg-[#F7EEDF] rounded-md p-2">
                <label className="font-semibold ">Lokasi: </label>
                <p className="font-light">{selected.address.street}, {selected.address.regency.name}, {selected.address.province.name}</p>
              </div>
              {
                selected.verification_notes && 
                (
                  <div className="w-full bg-[#F7EEDF] rounded-md p-2">
                    <label className="font-semibold ">Catatan Verifikasi: </label>
                    <p className="font-light">{selected.verification_notes}</p>
                  </div>
                )
              }

            </div>
          </div>
        ) : (
            <div className="mt-40 ml-[300px] flex flex-col gap-3 justify-center items-center w-full border border-gray-500/10 p-4 rounded-md">
              <img src={close} alt="no data" className="w-15 h-15" />
              <p className="font-bold text-3xl">Tidak ada riwayat laporan</p>
              <div>
                <p className="ml-20 font-light text-lg">Ayo buat laporan pertamamu!</p>
                <p className="ml-2 font-light text-lg">Kumpulkan poin untuk meningkatkan peringkatmu.</p>
              </div>
              <Link to="/laporan/upload" className="mt-5">
                <button className="bg-[#6B8F71] text-white px-4 py-2 rounded-md hover:bg-[#5a725e] transition">
                  Buat Laporan
                </button>
              </Link>
            </div>
        )}
      </div>

      <div className="w-1/2 relative">
      {/* konten utama list report */}
      <div
        className={`overflow-y-auto transition`}
      >
        <div className="p-6 max-h-[500px] overflow-y-auto scrollbar-none scrollbar-thumb-gray-500 scrollbar-track-gray-200">
          {datas.map((item) => (
            <div
              key={item.report_id}
              onClick={() => setSelected(item)}
              className={`h-24 flex w-3/4 items-stretch mb-2 cursor-pointer rounded-md border hover:bg-gray-100 transition
                ${selected?.report_id === item.report_id ? "bg-gray-200" : "bg-white"}`}
            >
              {/* Kiri: Foto */}
              <div className="">
                <img
                  src={item.photoUrl}
                  alt="thumbnail"
                  className="w-20 h-full rounded-md object-cover"
                />
              </div>

              {/* Tengah */}
              <div className="flex flex-col flex-1 p-2 gap-4">
                <p className="text-sm text-gray-800 line-clamp-2">{item.description}</p>
                <p className="text-sm font-semibold text-gray-900">
                  {item.address.street}, {item.address.regency.name},{" "}
                  {item.address.province.name}
                </p>
              </div>

              {/* Kanan: status */}
              {item.verification_status == "PENDING" && (
                <div className="w-6 bg-[#FCF381] rounded-r-md" />
              )}
              {item.verification_status == "VERIFIED" && (
                <div className="w-6 bg-[#ACF294] rounded-r-md" />
              )}
              {item.verification_status == "REJECTED" && (
                <div className="w-6 bg-[#FFA3A3] rounded-r-md" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>

    </div>
  );

}