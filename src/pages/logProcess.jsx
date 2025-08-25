import NavBar from "../components/Navbar";

export default function LogProcess() {
  return (
    <div className="min-h-screen flex flex-col bg-[#ADADAD] text-gray-800">
      <NavBar />
      <div className="flex">
        {/* Sidebar */}
        <div className="flex flex-col">
          <aside className="w-[189px] h-[434px] bg-[#D9D9D9] p-4">
            {/* Bisa diisi menu */}
          </aside>

          {/* Kotak tambahan di bawah aside */}
          <div className="w-[132px] h-[239px] bg-[#D9D9D9] mt-10"></div>
        </div>

        <div className="flex gap-6 max-w-5xl ml-20 mt-[50px] mb-[50px] ">
          {/* Content Kiri */}
          <div className="flex-1 bg-gray-200 p-4 rounded-xl shadow-md h-[694px] w-[528px] mr-10">
            {/* Kotak besar */}
            <div className="bg-gray-600 h-48 rounded-md mb-4 h-[340px] w-[472px] mx-auto"></div>

            {/* Kotak medium */}
            <div className="bg-gray-400 h-16 rounded-md mb-3 h-[119px] w-[472px] mx-auto"></div>

            {/* Kotak kecil */}
            <div className="bg-gray-300 h-10 rounded-md mb-3 h-[69px] w-[472px] mx-auto"></div>

            {/* Bar progress */}
            <div className="flex items-center h-8 rounded-md overflow-hidden w-[472px] h-[98px] mx-auto">
              <div className="bg-gray-600 flex-1 h-full"></div>
              <div className="bg-gray-400 w-20 h-full"></div>
              <div className="bg-red-300 w-10 h-full"></div>
            </div>
          </div>

          {/* Content Kanan */}
          <div className=" flex flex-col gap-3">
            {/* Item 1 */}
            <div className="flex  h-[119px] bg-[#D9D9D9] rounded-md overflow-hidden shadow w-[493px]">
              <div className="bg-gray-600 w-[119px] h-[119px]"></div>
              <div className="flex-1"></div>
              <div className="bg-red-300 h-[119px] w-[47px]"></div>
            </div>
            {/* Item 1 */}
            <div className="flex  h-[119px] bg-[#D9D9D9] rounded-md overflow-hidden shadow w-[493px]">
              <div className="bg-gray-600 w-[119px] h-[119px]"></div>
              <div className="flex-1"></div>
              <div className="bg-red-300 h-[119px] w-[47px]"></div>
            </div>
            {/* Item 1 */}
            <div className="flex  h-[119px] bg-[#D9D9D9] rounded-md overflow-hidden shadow w-[493px]">
              <div className="bg-gray-600 w-[119px] h-[119px]"></div>
              <div className="flex-1"></div>
              <div className="bg-red-300 h-[119px] w-[47px]"></div>
            </div>
            {/* Item 1 */}
            <div className="flex  h-[119px] bg-[#D9D9D9] rounded-md overflow-hidden shadow w-[493px]">
              <div className="bg-gray-600 w-[119px] h-[119px]"></div>
              <div className="flex-1"></div>
              <div className="bg-red-300 h-[119px] w-[47px]"></div>
            </div>
            {/* Item 1 */}
            <div className="flex  h-[119px] bg-[#D9D9D9] rounded-md overflow-hidden shadow w-[493px]">
              <div className="bg-gray-600 w-[119px] h-[119px]"></div>
              <div className="flex-1"></div>
              <div className="bg-red-300 h-[119px] w-[47px]"></div>
            </div>
            <div className="h-[69px] w-[289px] bg-[#D9D9D9] rounded self-end mt-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
