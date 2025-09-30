import { Profile } from "@/pages/admin/Profile"; 
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import JagaKota from '../../../assets/JagaKotaa.svg';
import { useAuth } from '@/context/Auth';

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const profileRef = useRef();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Reports', path: '/admin/reports' },
    { name: 'Progress', path: '/admin/reports/progress' },
  ];

  // Klik luar area untuk menutup popup
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Deteksi ukuran layar
  useEffect(() => {
    const handleResize = () => {
      // Full HD 14 inch = 1920px, lebih besar = sidebar besar
      setIsLargeScreen(window.innerWidth > 1920);
    };
    handleResize(); // cek awal
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`bg-white text-black h-screen fixed top-0 left-0 p-4 flex flex-col justify-between shadow-lg overflow-y-auto ${
        isLargeScreen ? "w-72" : "w-60"
      }`}
    >
      {/* Logo + Menu */}
      <div className="p-1">
        <Link 
          to={menuItems[0]?.path}
          className="flex flex-col items-center justify-center"
        >
          <img
            src={JagaKota}
            alt="Logo Jaga Kota"
            className="w-3/4 mb-1"
          />
          <hr className="border-t-2 border-[#F7EEDF] w-full my-2 mb-3" />
        </Link>

        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`block p-2 rounded-3xl mb-1 transition-colors duration-200
                  ${location.pathname === item.path
                    ? 'bg-[#6D6D6D] text-white'
                    : 'hover:bg-[#6D6D6D] hover:text-white'}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Tombol profile */}
      <div className="relative" ref={profileRef}>
        <div 
          className="p-1 flex cursor-pointer items-center"
          onClick={() => setShowProfile(!showProfile)}
        >
          <img
            src="/images/user-square.png"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <p className="ml-2 font-medium">{user?.username || "Guest"}</p>
        </div>

        {showProfile && (
          <Profile onClose={() => setShowProfile(false)} />
        )}
      </div>
    </div>
  );
}
