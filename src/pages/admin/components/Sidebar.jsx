import { Profile } from "@/pages/admin/Profile"; // pastikan path sesuai
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import JagaKota from '../../../assets/JagaKotaa.svg';
import { useAuth } from '@/context/Auth';

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Reports', path: '/admin/reports' },
    { name: 'Progress', path: '/admin/reports/progress' },
  ];

  // klik luar area untuk nutup popup
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-72 bg-white text-black h-screen p-4 fixed flex flex-col justify-between">
      <div className="p-1">
        <Link 
          to={menuItems[0]?.path}
          className="flex flex-col items-center justify-center "
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
                className={`block p-2 rounded-3xl mb-1 
                  ${location.pathname === item.path ? 'bg-[#6D6D6D]' : 'hover:bg-[#6D6D6D]'}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* tombol profile */}
      <div className="relative" ref={profileRef}>
        <div 
          className="p-1 flex cursor-pointer"
          onClick={() => setShowProfile(!showProfile)}
        >
          <img
            src="/images/user-square.png"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <p className="ml-1 mt-2">{user.username}</p>
        </div>

        {showProfile && (
          <Profile onClose={() => setShowProfile(false)} />
        )}
      </div>
    </div>
  );
}