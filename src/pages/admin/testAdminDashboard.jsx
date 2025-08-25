import { Link } from "react-router-dom";
import { useAuth } from "../../context/Auth.jsx";
import JagaKotaLogo from "../../assets/JagaKota.svg";


export default function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-[#ADADAD] text-gray-800">
      
      {/* Header */}
      <div className="h-[73px] bg-[#D9D9D9] justify-between items-center flex">
        <header className="px-8 py-4 flex justify-between items-center  w-[800px]">
          <div className="flex items-center space-x-3">
            <img src={JagaKotaLogo} alt="JagaKota Logo" className="h-[41px] w-[75px] mt-[6px] ml-[67px]" />
            <span className="text-xl font-bold text-yellow-600 mt-[16px] ml-[142px]">JagaKota</span>
          </div>

          <nav className="flex items-center space-x-4">
            <div className="w-28 h-8 bg-gray-200 rounded" />
            <div className="w-28 h-8 bg-gray-200 rounded" />
            <div className="w-28 h-8 bg-gray-200 rounded" />
          </nav>
        </header>

        <div className="mr-[50px]">
            <div className="w-[49px] h-[49px] bg-[#ADADAD] rounded-full" />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        <div className="w-full flex flex-wrap h-[561px]">

          {/* Left Side */}
          <div className="w-full md:w-[calc(60%-25px)] bg-white flex justify-center items-center py-10 px-4">
            <div className="w-full md:w-2/3 max-w-[345px] h-[231px] bg-gray-300 rounded" />
          </div>

          {/* Right Side */}
          <div className="w-full md:w-[calc(40%-25px)] bg-[#353535] flex flex-col justify-start p-10 space-y-6 h-[561px]">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-lg text-white">Welcome, {user?.name || "ADMIN"}!</p>
            <Link
              to="/profile"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Go to Profile
            </Link>
            <button
              onClick={logout}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-fit"
            >
              Logout
            </button>
          </div>
        </div>
      </main>

    </div>
  );
}
