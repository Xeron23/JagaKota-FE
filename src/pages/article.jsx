import NavBar from "../components/Navbar";

export default function Article() {
  return (
    <div className="bg-[#F7EEDF]">
      {/* navbar */}
      <NavBar />

      {/* Banner */}
      {/* <div className="mx-auto mt-6 w-[774px] h-[116px] bg-[#686868] rounded mb-10" >
        </div> */}

      <p className="mt-[150px] text-[28px] font-bold text-center">
        Pengecoran di Jalan Pangeran Mencegah Kecelakaan
      </p>

      {/* Content */}
      <main className="flex justify-center mt-6 px-4">
        {/* Artikel utama */}
        <div className="bg-[#D9D9D9] rounded-lg w-full max-w-4xl h-[1094px] relative">
          <div className="h-[439px] bg-[#686868] mb-4 rounded">
            <img
              src="/images/article.png"
              alt="Pengecoran di Jalan Pangeran"
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="h-[47px] w-[689px] bg-[#686868] mb-4 rounded mx-auto" />
        </div>

        {/* Sidebar */}
        <aside className="ml-4 flex flex-col space-y-3 self-center">
          <div className="h-[47px] w-[47px] bg-gray-500 rounded" />
          <div className="h-[47px] w-[47px] bg-gray-400 rounded" />
          <div className="h-[47px] w-[47px] bg-gray-500 rounded" />
        </aside>
      </main>

      <div className="h-[551px] w-full mx-auto mt-[50px]  flex items-center    pr-[50px]">
        <div className="grid grid-cols-3 gap-x-[40px] gap-y-[40px] mx-auto">
          <div className="w-[329px] h-[190px] bg-gray-300"></div>
          <div className="w-[329px] h-[190px] bg-gray-300"></div>
          <div className="w-[329px] h-[190px] bg-gray-300"></div>
          <div className="w-[329px] h-[190px] bg-gray-300"></div>
          <div className="w-[329px] h-[190px] bg-gray-300"></div>
          <div className="w-[329px] h-[190px] bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}
