import { Link } from "react-router-dom";
import JagaKotaLogo from "../assets/JagaKota.svg";
import JagaKotaLogo2 from "../assets/JagaKota2.svg"; 


export default function NavBar() {
return (
        <>
        <div className="h-[73px] bg-[#FFFFFF] shadow-md justify-between items-center flex">
            <header className="px-8 py-4 flex justify-between items-center  w-[800px]">
            <div className="flex items-center space-x-3">
                <img src={JagaKotaLogo} alt="JagaKota Logo" className="h-[41px] w-[75px] mt-[6px] ml-[40px]" />
                <img src={JagaKotaLogo2} alt="JagaKota Logo" className="w-[113px] h-[22px] mt-[16px] ml-[82px]" />
            </div>

            <nav className="flex items-center space-x-4 mt-2">
                <div className="w-36 h-8 hover:bg-gray-200 rounded-2xl items-center justify-center flex">
                    <a href="#" className="text-center text-sm font-semibold text-black">Beranda</a>
                </div>
                <div className="w-36 h-8 hover:bg-gray-200 rounded-2xl items-center justify-center flex" >
                    <a href="#" className="text-center text-sm font-semibold text-black">Artikel</a>
                </div>
                <div className="w-36 h-8 hover:bg-gray-200 rounded-2xl items-center justify-center flex" >
                    <a href="#" className="text-center text-sm font-semibold text-black">Laporan</a>
                </div>
            </nav>
            </header>

            <div className="mr-[50px]">
                <div className="w-[40px] h-[40px] " 
                    style={{
                        backgroundImage: "url('/images/user-square.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                />
            </div>
        </div>
        </>
    );
}
