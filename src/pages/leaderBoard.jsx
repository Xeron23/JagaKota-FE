import NavBar from "../components/Navbar";

export default function LeaderBoard() {
  return (
    <div className="min-h-screen flex flex-col bg-[#ADADAD] text-gray-800">
      <NavBar />
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-[189px] h-[434px] bg-[#D9D9D9] p-4">
          {/* Bisa diisi menu */}
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 space-y-6 mt-10">
          <div className="w-full flex flex-col items-center">
            {/* Kotak merah persis di atas section */}
            <div className="w-[745px] flex justify-end mb-5">
              <div className="h-[67px] w-[68px] bg-[#7E7E7E] rounded"></div>
            </div>

            <section className="bg-gray-100 h-[751px] w-[748px] rounded shadow flex flex-col">
              {/* Konten scrollable */}
              <div className="flex-1 overflow-y-auto">
                <div className="h-[80px] bg-[#7E7E7E]"></div>
                <div className="h-[80px] bg-[#A2A2A2]"></div>
                <div className="h-[80px] bg-[#C4C4C4]"></div>
                {/* tambah konten di sini kalau perlu, bisa discroll */}
              </div>

              <div className="h-[116px] bg-gray-500 flex items-center px-6 justify-between rounded">
                {/* Kiri: Rank + Avatar + Nama */}
                <div className="flex items-center space-x-4 text-white font-semibold">
                  <span className="w-13">#01</span>
                  <div className="h-[48px] w-[48px] bg-gray-300 rounded"></div>
                  <span>Andi</span>
                </div>

                {/* Kanan: Poin */}
                <div className="bg-gray-300 px-4 py-2 rounded text-white font-semibold">
                  1500
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
