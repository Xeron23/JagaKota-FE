import { Link } from "react-router-dom";
import { useAuth } from "../../../context/Auth.jsx";
import userImage from "../../../assets/images/user.png";
import ButtonSubmit from "@/components/button.jsx";
import { GetProfile } from "@/hooks/useGetProfile.jsx";
import { useEffect, useState } from "react";
import Loader from "@/components/loader.jsx";
import { GetLeaderboard } from "@/hooks/useGetLeaderboard.jsx";


const menuItems = [
  { name: 'Profile', path: '/profile' },
  { name: 'Riwayat', path: '/history' },
  { name: 'Leaderboard', path: '/leaderboard' },
]


export default function Profile() {
    const { user, logout, isChecking } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [statistik, setStatistik] = useState({peringkat: null, point: null});

    useEffect(() => {
      // kalau user belum siap, jangan fetch
      if (!user?.id) return;

      const fetchProfile = async () => {
        try {
          const data = await GetProfile(user.id);
          const result = await GetLeaderboard();
          setProfileData(data); // update state hanya sekali setelah fetch
          result?.map((item, index) => {
            if(item.username === user.username){
              
              return setStatistik({peringkat: index+1, point: item.points});
            }
          });
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

      fetchProfile();
    }, [user?.id]);

    // kondisi render
    if (isChecking || !profileData) return <Loader />;

  return (
    <div className="min-h-screen flex flex-col text-black rounded-md bg-">
      <div className="flex">
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

        <main className="flex-1 p-6 space-y-6 w-full flex flex-col items-center justify-center">
          {/* Card User Info */}
          <div className="w-1/2 border flex justify-start bg-[#F7EEDF] rounded-lg">
            {/* Avatar + Button */}
            <div className="w-1/4 flex flex-col items-center gap-3 py-8">
              <img
                src={userImage}
                alt="User Avatar"
                className="w-24 h-24 rounded-lg bg-white object-cover"
              />
              <ButtonSubmit
                onClick={async () => {
                  await logout();
                  if (onClose) onClose();
                }}
                style={"bg-[#FFA3A3] w-24 py-2 rounded-md text-sm"}
              >
                Keluar Akun
              </ButtonSubmit>
            </div>

            {/* User Details */}
            <div className="flex-1 py-10 px-5 flex flex-col gap-3">
              <p className="text-sm font-bold p-2 bg-white rounded-lg">
                Email: {user.email}
              </p>
              <p className="text-sm p-2 font-bold bg-white rounded-lg">
                Username: {user.username}
              </p>
            </div>
          </div>

          {/* Statistik */}
          <div className="w-1/2 flex gap-3">
            <div className="w-1/3 rounded-lg p-3 gap-2 flex flex-col justify-center items-center h-28 bg-[#F7EEDF]">
              <p className="text-5xl font-bold">#{statistik.peringkat}</p>
              <p className="text-xs">Papan Peringkat</p>
            </div>
            <div className="w-1/3 rounded-lg p-3 gap-2 flex flex-col justify-center items-center h-28 bg-[#F7EEDF]">
              <p className="text-5xl font-bold">{statistik.point}</p>
              <p className="text-xs">Poin Jaga</p>
            </div>
            <div className="w-1/3 rounded-lg p-3 gap-2 flex flex-col justify-center items-center h-28 bg-[#F7EEDF]">
              <p className="text-5xl font-bold">{profileData?._count?.reports}</p>
              <p className="text-xs">Laporan Diunggah</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

