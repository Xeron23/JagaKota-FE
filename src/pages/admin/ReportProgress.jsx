import ButtonSubmit from "@/components/button";
import { useGetReports } from "@/hooks/useGetReports";
import { usePostReportprogress } from "@/hooks/usePostReportProgress";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const INITIAL_FORM = {
    progressNotes: "",
    stage: "",
    photo: null
}

export default function ReportsProgress(){
  const steps = ["REVIEW", "INPROGRESS", "COMPLETED"];
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
            toast.success("Progress report berhasil disubmit");
            // Refetch data report terbaru
            reset(); // reset state mutation biar bisa submit lagi
            // Clear form
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
    <div className="p-6  flex w-full gap-10 px-10">
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
            {/* Progress Stepper */}
            <div className="flex justify-between items-center mb-6">
            {steps.map((step, idx) => {
              const progressStages = selected.progressUpdates?.map(p => p.stage) || [];

              // Step aktif: yang terakhir dicapai
              const isActive = progressStages[progressStages.length - 1] === step;

              // Step sudah dilewati: kalau ada di progressStages tapi bukan yang aktif
              const isCompleted = progressStages.includes(step) && !isActive;

              return (
                <div key={step} className="flex items-center w-full">
                  {/* Lingkaran step */}
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border font-bold text-sm
                      ${isActive ? "bg-teal-400 text-white border-teal-400" : ""}
                      ${isCompleted ? "bg-green-400 text-white border-green-400" : ""}
                      ${!isActive && !isCompleted ? "bg-gray-200 text-gray-600 border-gray-300" : ""}
                    `}
                  >
                    {idx + 1}
                  </div>

                  {/* Nama step */}
                  <span
                    className={`ml-2 font-medium ${
                      isActive ? "text-teal-600" : "text-gray-500"
                    }`}
                  >
                    {step}
                  </span>

                  {/* Garis penghubung kecuali step terakhir */}
                  {idx < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 
                        ${progressStages.includes(steps[idx + 1]) ? "bg-green-400" : "bg-gray-300"}`}
                    />
                  )}
                </div>
              );
            })}
            </div>
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
                          onChange={(e) => setForm((f) => ({ ...f, stage: e.target.value }))}
                        >
                          <option value="">Pilih stage</option>
                          {steps.map((step) => {
                            const sudahAda = selected.progressUpdates?.some(p => p.stage === step);
                            return (
                              <option key={step} value={step} disabled={sudahAda}>
                                {step}
                              </option>
                            );
                          })}
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

    <div className="relative w-full lg:w-1/2 xl:w-3/5 2xl:w-1/2">
      <div className="overflow-y-auto transition">
        <div className="p-6 max-h-[500px] overflow-y-auto scrollbar-none scrollbar-thumb-gray-500 scrollbar-track-gray-200">
          {datas.map((item) => (
            <div
              key={item.report_id}
              onClick={() => setSelected(item)}
              className={`h-24 flex w-full items-stretch mb-2 cursor-pointer rounded-md border hover:bg-gray-100 transition
                ${selected?.report_id === item.report_id ? "bg-gray-200" : "bg-white"}`}
            >
              {/* Kiri: Foto */}
              <img
                src={item.photoUrl}
                alt="thumbnail"
                className="w-20 h-full rounded-md object-cover"
              />

              {/* Tengah */}
              <div className="flex flex-col flex-1 p-2 gap-4">
                <p className="text-sm text-gray-800 line-clamp-2">{item.description}</p>
                <p className="text-sm font-semibold text-gray-900">
                  {item.address.street}, {item.address.regency.name}, {item.address.province.name}
                </p>
              </div>

              {/* Status */}
              {(() => {
                const lastStage = item.progressUpdates?.[item.progressUpdates.length - 1]?.stage;
                if (lastStage === "REVIEW") return <div className="w-6 bg-[#FCF381] rounded-r-md" />;
                if (lastStage === "INPROGRESS") return <div className="w-6 bg-[#99ff77] rounded-r-md" />;
                if (lastStage === "COMPLETED") return <div className="w-6 bg-[#ACF294] rounded-r-md" />;
                return <div className="w-6 bg-gray-200 rounded-r-md" />;
              })()}
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
    )
}