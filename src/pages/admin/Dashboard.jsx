import ButtonSubmit from "@/components/button";
import ProvinceRegencySelect from "@/components/ProvinceRegencySelect";
import { useEffect, useMemo, useState } from "react";
import imageadmin1 from "../../assets/images/imageadmin1.png"
import reports from "@/constants/data/reports";
import { useGetReports } from "@/hooks/useGetReports";
import NotFound from "../../assets/images/close-square.png"
import TagClose from "../../assets/images/tag-cross.png"
import { useNavigate } from "react-router-dom";
import { Chart } from "./components/Chart";


export default function DashboardAdmin() {

    const navigate = useNavigate();

    const [province, setProvince] = useState("");
    const [regency, setRegency] = useState("");

    const canReport = province && regency
    const [page, setPage] = useState(1); // page mulai dari 1
    
    
      const [searchQuery, setSearchQuery] = useState("");
      const [graphic, setGraphic] = useState([]);
      const [closeGraphic, setCloseGraphic] = useState(false);
    
      const LIMIT = 100;
      const today = true

      const queryParams = useMemo(
        () => ({
          page: page,
          limit: LIMIT,
          today: today
    
        }),
        [
          page,
          LIMIT,
          today
        ],
      );

    const queryParamsGrafik = useMemo(
      ()=>({
        page: page,
        limit: LIMIT,
        provinceId: province || undefined,
        regencyId: regency || undefined,
        weekly: true || undefined
      }),
      [
        page,
        LIMIT,
        province,
        regency,
        true
      ]
    );
      
    const { data: dataThisDay, isLoading, isError, error, isFetching } = useGetReports(queryParams);
    
    const {data: graphicData, isLoading: loadingGraphic, isError: isErrorGraphic, error: errorGraphic, isFetching: isFetchinGraphic} = useGetReports(queryParamsGrafik);
    const datasThisDay = dataThisDay?.data ?? [];
    
    
    useEffect(()=>{
      setGraphic(graphicData?.data ?? [])
      
    }, [graphicData]);
    
    let chartData = []
    
    if(graphic.length){

      const grouped = {};
      graphic.forEach(r => {
        const date = new Date(r.createdAt).toISOString().split("T")[0]; // YYYY-MM-DD
        grouped[date] = (grouped[date] || 0) + 1;
      });

      const today = new Date();
      for (let i = 6; i >= 0; i--) { // 6 hari sebelumnya + hari ini
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const dateStr = d.toISOString().split("T")[0];
        chartData.push({
          date: dateStr,
          count: grouped[dateStr] || 0
        });
      }
    }
    console.log(chartData);
    



    
    

    
    const pendingCount = datasThisDay.filter(r => r.verification_status === "PENDING").length;
    
    // console.log(datasThisDay.progressUpdates.length);

      const completeReportProgressCount = datasThisDay.reduce((total, r) => {
        const completedCount = r.progressUpdates.filter(pg => pg.stage === "COMPLETED").length;
        return total + completedCount;
      }, 0);
      const verifiedReportProgressCount = datasThisDay.reduce((total, r) => {
        const completedCount = r.progressUpdates.filter(pg => pg.stage === "REVIEW").length;
        return total + completedCount;
      }, 0);
      const inprogressReportProgressCount = datasThisDay.reduce((total, r) => {
        const completedCount = r.progressUpdates.filter(pg => pg.stage === "INPROGRESS").length;
        return total + completedCount;
      }, 0);

    return (
      <div className="container mx-auto pl-60 pr-60 m-12 ">
        <div className="flex  items-stretch gap-4">
          <div className="mr-6 ">
            <div className="flex justify-between gap-6">
              <div className="">
                <h1 className="text-center mt-3 font-semibold text-xl">
                  Laporan Hari Ini
                </h1>
                <p className="w-52 h-28 bg-white rounded-md flex items-center justify-center mt-3 font-extrabold text-6xl">{datasThisDay.length}</p>
              </div>
              <div className="">
                <h1 className="text-center mt-3 font-semibold text-xl">
                  Total Antrian
                </h1>
                <p className="w-52 h-28 bg-white rounded-md flex items-center justify-center mt-3 font-extrabold text-6xl">{pendingCount}</p>
              </div>
            </div>
            
            <div className="w-full h-[340px] mt-6 bg-white rounded-md flex flex-col gap-4">
              
              {
                closeGraphic ? 
                <>
                  {
                    graphic.length  ? 
                    <div className="w-full h-full flex justify-start flex-col py-3 pr-6">
                      <div className="w-full flex justify-center gap-2 mb-2">
                        <ButtonSubmit
                          onClick={() => {
                          setCloseGraphic(false);
                          setGraphic([])
                          setProvince("");
                          setRegency("")

                        }}
                        >
                          <img 
                            src={TagClose}
                            className="w-5"
                          />
                        </ButtonSubmit>
                        <p>Laporan {graphic?.[0]?.address?.regency?.name}</p>
                      </div>
                    <Chart
                      data={chartData || []}
                    />

                    </div>:
                    <div className="flex w-full h-full flex-col  bg-white rounded-md p-4">
                      <ButtonSubmit
                          onClick={() => {
                          setCloseGraphic(false);
                          setGraphic([])
                          setProvince("");
                          setRegency("")

                        }}
                        >
                          <img 
                            src={TagClose}
                            className="w-7"
                          />
                        </ButtonSubmit>
                        <div className="flex flex-1 flex-col justify-center items-center">
                          <img src={NotFound} className="w-10" />
                          <p className="text-3xl font-bold">Tidak ada laporan</p>
                        </div>
                    </div>
                  }
                </>:

                <>
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
                    onClick={() => {
                      console.log("province: ", province, "  regency: ", regency);
                      setCloseGraphic(true);
                    }}
                    disabled={!canReport}
                    style="w-1/4 h-12 bg-[#6B8F71] text-white rounded-md block mx-auto mb-2 text-center font-semibold mt-6"
                  >
                    {canReport ? "Cari" : "Pilih Lokasi"}
                  </ButtonSubmit>
                </>
              }
            </div>
          </div>
          <div className="w-3/4 flex flex-col items-start mt-3">
          <h1  className="text-center  font-semibold text-xl">Pratinjau</h1>
          <div className="w-full flex flex-col items-start mt-2 h-full">
            {
              pendingCount == 0 && datasThisDay==0 ? 
              <div className="flex w-full h-full flex-col justify-center items-center bg-white rounded-md p-10">
                <img
                  src={NotFound}
                  className="w-10"
                />
                <p className="text-3xl font-bold ">Tidak ada laporan</p>
              </div>:
              <>
              <div className="overflow-y-auto scrollbar-none scrollbar-thumb-gray-500 scrollbar-track-gray-200 h-[415px]">
              {datasThisDay.map((item) => (
                        <div
                          key={item.report_id}
                          className="h-24 bg-white flex w-full items-stretch mb-2 cursor-pointer rounded-md border hover:bg-gray-100 transition"
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
              <div className="w-3/4  flex justify-center mt-4">
                <ButtonSubmit
                  style={"bg-[#6B8F71] text-white p-2 rounded-sm mt-2"}
                  onClick={()=> navigate('/admin/reports')}
                >
                  Selengkapnya
                </ButtonSubmit>
              </div>
              </>
            }
            </div>
          </div>
        </div>
        <div className="w-full  mt-8 h-52 bg-white rounded-md shadow-md">
            <h1 className="text-black text-center font-semibold p-2 text-xl">Statistik Laporan</h1>
            <div className="flex justify-center gap-40 p-6 ">
              {/* Box 1 */}
              <div className="flex flex-col items-center">
                <p className="text-6xl font-extrabold">{verifiedReportProgressCount}</p>
                <span className="text-lg font-medium text-black mt-1">Diterima</span>
              </div>

              {/* Box 2 */}
              <div className="flex flex-col items-center">
                <p className="text-6xl font-extrabold">{inprogressReportProgressCount}</p>
                <span className="text-lg font-medium text-black mt-1">Diproses</span>
              </div>

              {/* Box 3 */}
              <div className="flex flex-col items-center">
                <p className="text-6xl font-extrabold">{completeReportProgressCount}</p>
                <span className="text-lg font-medium text-black mt-1">Selesai</span>
              </div>
            </div>
        </div>
      </div>
    );
}

