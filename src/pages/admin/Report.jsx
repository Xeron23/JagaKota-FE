import React, { useEffect, useMemo, useRef, useState } from "react";
import {
useReactTable,
getCoreRowModel,
flexRender,
} from "@tanstack/react-table";

import { useGetReports } from "@/hooks/useGetReports";
// import reports from "@/constants/data/reports";
import ButtonSubmit from "@/components/button";
import { useNavigate } from "react-router-dom";
import { UpdateReport } from "@/hooks/useReport";
import FilterLaporan from "@/components/filter";

export default function Reports(){

  const navigate = useNavigate();
  const inputPesan = useRef(null);
  const [selected, setSelected] = useState(null);
  const [filterSelect, setFilterSelected] = useState(false)
  const [dataFilter, setDataFilter] = useState("");
  const report = async(id, status, notes)=>{

    const rp = await UpdateReport(id, status, notes);
    console.log(rp);
    if(rp){
        inputPesan.current.value = "";
        return alert("berhasi mengganti")
    } 
    return alert("gagal bruhh")
  }

  const [page, setPage] = useState(1); // page mulai dari 1

  const [draftProvinceId, setDraftProvinceId] = useState("");
  const [draftRegencyId, setDraftRegencyId] = useState("");

  const [appliedProvinceId, setAppliedProvinceId] = useState("");
  const [appliedRegencyId, setAppliedRegencyId] = useState("");
  const [appliedVerificationStatus, setAppliedVerificationStatus] =
    useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const LIMIT = 8;

  const queryParams = useMemo(
    () => ({
      page: page,
      limit: LIMIT,
      provinceId: dataFilter.province || undefined,
      regencyId: dataFilter.regency || undefined,
      verificationStatus: appliedVerificationStatus || undefined,
      like: dataFilter.likes || undefined,
      weekly: dataFilter.weekly || undefined,
      latest: dataFilter.tanggal || undefined,

    }),
    [
      page,
      LIMIT,
      dataFilter.province,
      dataFilter.regency,
      appliedVerificationStatus,
      dataFilter.likes,
      dataFilter.tanggal
    ],
  );

  const { data, isLoading, isError, error, isFetching } = useGetReports(queryParams);
   
  
  const datas = data?.data ?? [];

  useEffect(() => {
    
    if (!isLoading && !isError && datas.length > 0) {
      return setSelected(datas[0]);
    }
    return setSelected(null); // reset kalo ga ada data
    
  }, [isLoading, isError, datas, dataFilter]);

  return (
    <div className="p-10  flex w-full gap-10 px-20">
      <div className="w-1/2 p-6 bg-white rounded-md">
        {selected ? (
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <img
                src="/images/user-square.png"
                alt="Profile"
                className="w-10 h-10 rounded "
              />
              <p className="py-2 font-semibold">{selected.author.username}</p>
            </div>
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
                  selected.verification_status == "PENDING" &&
                  (
                  <div className="w-full bg-[#F7EEDF] rounded-md p-3 flex flex-col gap-2">
                  <label className="font-semibold text-gray-700">Pesan kepada pengirim:</label>
                  <input
                    type="text"
                    ref={inputPesan}
                    placeholder="Tulis pesan..."
                    className="w-2/3 px-3 py-2 bg-[#F7EEDF] rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-gray-700 placeholder-gray-400"
                  />
                  <div className="mt-2 flex gap-2">
                  <ButtonSubmit
                  style="p-2 w-16 bg-[#ACF294] rounded-md"
                  onClick={async () => {
                    await report(selected.report_id, "VERIFIED", inputPesan.current.value);
                  }}
                >
                  Terima
                </ButtonSubmit>
                <ButtonSubmit
                  style="p-2 w-16 bg-[#FFA3A3] rounded-md"
                  onClick={async ()=> await report(selected.report_id, "REJECTED", inputPesan.current.value)}
                >
                  Tolak
                </ButtonSubmit> 
                </div>
                </div>)
                }

            </div>
          </div>
        ) : (
          <p className="text-gray-500">Pilih report untuk melihat detail</p>
        )}
      </div>

      <div className="w-1/2  overflow-y-auto">
        <div className="flex my-3  p-2 items-center gap-10">
            <ButtonSubmit
              style=" ml-2 w-20 p-2 bg-[#FCF381] rounded-md"
              onClick={() => {
                setAppliedVerificationStatus("PENDING");
                setDataFilter("");
                setFilterSelected(false);
                
              }}
              >
              Proses
            </ButtonSubmit>
            <ButtonSubmit
              style="p-2 w-16 bg-[#ACF294] rounded-md"
              onClick={() => {
                setAppliedVerificationStatus("VERIFIED")
                setDataFilter("");
                setFilterSelected(false);
              }}
              >
              Selesai
            </ButtonSubmit>
            <ButtonSubmit
              style="p-2 w-16 bg-[#FFA3A3] rounded-md"
              onClick={() => {
                setAppliedVerificationStatus("REJECTED")
                setDataFilter("");
                setFilterSelected(false);
                
              }}
            >
              Tolak
            </ButtonSubmit>

          <ButtonSubmit
            style="flex bg-blue-200 gap-2 p-2 rounded-md self-center"
            onClick={()=>{
              setFilterSelected(true)
              setAppliedVerificationStatus("")
              }
            }
          >
            <img src="/images/filter.png" className="mt-1"/>
            <p>Filter</p>
          </ButtonSubmit>
          {/* <div className="flex bg-blue-200 gap-2 p-2 rounded-md self-center">
            <img src="/images/filter.png" className="mt-1"/>
            <p>Filter</p>
          </div> */}
        </div>
        {filterSelect && 

        <div className="">
          <FilterLaporan
          onFilter={(data) => setDataFilter(data)}
          onClose={()=>setFilterSelected(false)}/>
        </div>
        }
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

            {/* Tengah: Konten teks */}
            <div className="flex flex-col flex-1 p-2 gap-4">
              <p className="text-sm text-gray-800 line-clamp-2">{item.description}</p>
              <p className="text-sm font-semibold text-gray-900">{item.address.street}, {item.address.regency.name}, {item.address.province.name}</p>
            </div>

            {/* Kanan: Kotak warna penuh */}
            {
              item.verification_status == "PENDING" && 
              <div className="w-6 bg-[#FCF381] rounded-r-md" />
            }
            {
              item.verification_status == "VERIFIED" && 
              <div className="w-6 bg-[#ACF294] rounded-r-md" />
            }
            {
              item.verification_status == "REJECTED"&& 
              <div className="w-6 bg-[#FFA3A3] rounded-r-md" />
            }
          </div>
          ))}
        </div>
      </div>
    </div>
  );

}