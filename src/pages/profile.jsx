import { Link } from "react-router-dom";
import { useAuth } from "../context/Auth.jsx";
import NavBar from "../components/navBar.jsx";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-[#ADADAD] text-gray-800">
      <NavBar/>
        <div className="flex">
        {/* Sidebar */}
        <aside className="w-[189px] h-[434px] bg-[#D9D9D9] p-4">
          {/* Bisa diisi menu */}
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Card Utama */}
            <section className="bg-gray-100 h-[306px] w-[745px] p-4 rounded shadow mx-auto">
                <div className="flex space-x-4">
                    {/* Kotak kiri */}
                    <div className="flex flex-col space-y-2">
                        <div className="w-[82px] aspect-square bg-gray-400 rounded" />
                        <div className="w-[82px] h-[21px] bg-gray-400 rounded" />
                    </div>

                    {/* Bagian kanan */}
                    <div className="flex-1 flex flex-col space-y-2 mt-10">
                        <div className="h-[40px] bg-gray-400 rounded w-[492px]" />
                        <div className="h-[40px] bg-gray-400 rounded w-[492px]" />
                        <div className="h-[101px] bg-gray-400 rounded w-[492px]" />
                    </div>
                </div>
            </section>


            {/* Grid kecil */}
            <section className="bg-gray-100 p-4 rounded shadow w-[745px] h-[152px] mx-auto">
                <div className="grid grid-cols-3 gap-[20px] w-fit">
                    <div className="w-[47px] h-[47px] bg-gray-400 rounded" />
                    <div className="w-[47px] h-[47px] bg-gray-400 rounded" />
                    <div className="w-[47px] h-[47px] bg-gray-400 rounded" />
                    <div className="w-[47px] h-[47px] bg-gray-400 rounded" />
                    <div className="w-[47px] h-[47px] bg-gray-400 rounded" />
                </div>
            </section>

          {/* Dua box bawah */}
          <section className="grid grid-cols-2 gap-[55px] mx-auto w-fit">
            <div className="bg-gray-100 h-[119px] w-[346px] rounded shadow" />
            <div className="bg-gray-100 h-[119px] w-[346px] rounded shadow" />
          </section>
        </main>
      </div>
    </div>
);
}
