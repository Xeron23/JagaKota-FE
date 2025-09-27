import User from "@/assets/images/user.png";
import { useAuth } from "@/context/Auth";
import { GetLeaderboard } from "@/hooks/useGetLeaderboard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const menuItems = [
  { name: 'Profile', path: '/profile' },
  { name: 'Riwayat', path: '/history' },
  { name: 'Leaderboard', path: '/leaderboard' },
]

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const {user} = useAuth();
  // const leaderboard = [
  //   { name: "Andi", points: 132 },
  //   { name: "Sinta", points: 98 },
  //   { name: "Wawan", points: 47 },
  //   { name: "Budi", points: 54 }, // ini yang harus gede
  // ];
  useEffect(()=>{
    console.log(user);
    const fetchData = async()=>{
      const result = await GetLeaderboard();
      console.log(result);
      setData(result);
      
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-start text-black  rounded-md">
      {/* Sidebar */}
        <aside className="w-[189px] h-60 bg-[#6B8F71] rounded-sm p-4">
          <ul>
            {menuItems.map((item) => (
              <li key={item.name} className="mb-2">
                <Link to={item.path} className={`block p-2 rounded-xl mb-1 text-white
                  ${location.pathname === item.path ? 'bg-[#6cc77b]' : 'hover:bg-[#6cc77b]'}`}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
    <div className="w-full flex flex-col gap-2 justify-center items-center mt-10">

      {data?.map((item, index) => {
        const isHighlight = item.username === user.username;
        
        // warna default berdasarkan ranking
        let bgColor = "bg-white";
        if (index === 0) bgColor = "bg-[#E2C48D]";
        else if (index === 1) bgColor = "bg-[#E6CD9E]";
        else if (index === 2) bgColor = "bg-[#F2E6CE]";
        
        // override kalau highlight (misal nama Budi)
        if (isHighlight) {
          bgColor = "bg-[#DEBC7D]";
        }
        
        return (
          <div
          key={index}
          className={`w-1/2 h-20 flex items-center justify-between px-4 rounded-md text-gray-800 
            ${bgColor} ${isHighlight ? "scale-105 font-bold" : ""}`}
            >
            {/* Ranking + Avatar + Name */}
            <div className="flex items-center ml-4">
              <p className="w-6 text-center font-bold">#{index + 1}</p>
              <div className="flex items-center ml-6">
                <img
                  src={User}
                  alt="avatar"
                  className="w-10 h-10 border-2 rounded-lg border-black mr-2"
                  />
                <span className="font-bold">{item.username}</span>
              </div>
            </div>

            {/* Points */}
            <span className="bg-[#D1A34D] px-3 py-1 rounded-md whitespace-nowrap">
              {item.points} Poin
            </span>
          </div>
        );
      })}
    </div>
    </div>
  );
}