import ButtonSubmit from "@/components/button";
import { useGetReports } from "@/hooks/useGetReports";
import { usePostReportprogress } from "@/hooks/usePostReportProgress";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


const INITIAL_FORM = {
    progressNotes: "",
    stage: "",
    photo: null
}

export default function ReportsProgress(){

  const [form, setForm] = useState(INITIAL_FORM); 
  const [selected, setSelected] = useState(null);

  const [page, setPage] = useState(1); // page mulai dari 1
  

  const LIMIT = 8;

  const queryParams = useMemo(
    () => ({
      page: page,
      limit: LIMIT,
      verificationStatus: "VERIFIED",
    }),
    [
      page,
      LIMIT,
      "VERIFIED",
    ],
  );

  const { data, isLoading, isError, error, isFetching } = useGetReports(queryParams);
  const {mutate, isPending, isSuccess, isError: isProgressReportError, error: progressReportError, reset} = usePostReportprogress();

    const handleSubmit = () => {
    if (!selected) return;

    mutate(
        {
        id: selected.report_id, // id report yang dipilih
        ...form,
        config: {
            onUploadProgress: (evt) => {
            if (!evt.total) return;
            const percent = Math.round((evt.loaded * 100) / evt.total);
            console.log("Upload Progress:", percent, "%");
            },
        },
        },
        {
        onSuccess: () => {
            console.log("Progress report berhasil disubmit");
            setForm(INITIAL_FORM);
        },
        onError: (err) => {
            console.error("Gagal submit progress:", err);
        },
        }
    );
    };
  
  const datas = data?.data ?? [];

  useEffect(() => {
    
    if (!isLoading && !isError && datas.length > 0) {
      return setSelected(datas[0]);
    }
    return setSelected(null); // reset kalo ga ada data
    
  }, [isLoading, isError, datas]);

    return (
    <div className="p-6  flex w-full gap-10 px-20">
      <div className="w-3/4 p-6 bg-white rounded-md">
        {selected ? (
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
                <img
                src={selected.photoUrl}
                alt={selected.title}
                className="rounded-sm shadow-md p-3 w-3/4 h-60"
                />
                <div className="p-1 flex flex-col w-1/4 gap-2 bg-[#F7EEDF]">
                    <p className="font-semibold text-lg">Deskripsi Laporan:</p>
                    <div className="ml-2 flex gap-2">
                        <img
                            src="/images/user-square.png"
                            alt="Profile"
                            className=" w-7 h-7 rounded "
                        />
                        <p className="py-1 text-sm font-light">{selected.author.username}</p>
                    </div>
                    <div className="ml-2 flex gap-2">
                        <img  
                            src="/images/heart.png" 
                            className="w-7 h-7 rounded opacity-60"
                        />
                        <p className="py-1 text-sm font-light">{selected.likes.length}</p>
                    </div>
                    <div className="ml-2 flex gap-2">
                        <img  
                            src="/images/message-edit.png" 
                            className="w-7 h-7 rounded opacity-60"
                        />
                        <p className="py-1 text-sm font-light">{selected.comments.length}</p>
                    </div>
                    <label className="ml-2 font-semibold text-sm">Lokasi: </label>
                    <p className="ml-2 font-light text-sm">{selected.address.street}, {selected.address.regency.name}, {selected.address.province.name}</p>
                    <p className="font-semibold text-sm m-0.5 flex justify-end">{new Date(selected.createdAt).toLocaleDateString("en-GB")}</p>

                </div>
            </div>
            <div className="flex justify-between gap-1">
            </div>
            <div className="flex flex-col gap-3">
            {/* Baris 1: Deskripsi & Stage */}
                <div className="flex w-full gap-3">
                    <div className="flex-1">
                        <label className="block text-sm font-medium">Deskripsi</label>
                        <textarea
                        rows={4}
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 resize-none"
                        placeholder="Masukkan deskripsi"
                        value={form.progressNotes}
                        onChange={(e) => setForm((f) => ({ ...f, progressNotes: e.target.value }))}
                        />
                    </div>
                    <div className="w-1/3">
                        <label className="block text-sm font-medium">Stage</label>
                        <select
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                        value={form.stage}
                        onChange={(e) => setForm((f) => ({ ...f, stage: e.target.value }))}>
                        <option value="">Pilih stage</option>
                        <option value="REVIEW">REVIEW</option>
                        <option value="INPROGRESS">INPROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                        </select>
                    </div>
                </div>

                {/* Baris 2: Upload Photo */}
                <div className="w-full">
                    <label className="block text-sm font-medium">Upload Photo</label>
                    <input
                    type="file"
                    accept="image/*"
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                    onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setForm((f) => ({ ...f, photo: file }));
                    }}
                    />
                </div>
                <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                    <p className="text-sm">modifikasi terakhir:</p>
                    <p>{new Date(selected.updatedAt).toLocaleDateString("en-GB")}</p>
                </div>
                <ButtonSubmit
                style="my-3 h-10 w-40 bg-[#6B8F71] rounded-md"
                disabled={isPending || !selected}
                onClick={handleSubmit}
                >
                {isPending ? "Loading..." : "Selesai"}
                </ButtonSubmit>
                </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Pilih report untuk melihat detail</p>
        )}
      </div>

      <div className="w-1/2 relative">
      {/* konten utama list report */}
      <div
        className="overflow-y-auto transition"
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
              {item.verification_status == "VERIFIED" && (
                <div className="w-6 bg-[#ACF294] rounded-r-md" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
    )
}