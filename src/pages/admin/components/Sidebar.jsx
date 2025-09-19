import { Link, useLocation } from 'react-router-dom';
import JagaKota from '../../../assets/JagaKotaa.svg';
import { useAuth } from '@/context/Auth';

export default function Sidebar() {
  const location = useLocation(); // ambil route saat ini
  const {user} = useAuth()
  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Reports', path: '/admin/reports' },
    { name: 'Progress', path: '/admin/reports/progress' },
  ];

  return (
    <div className="w-72 bg-white text-black h-screen p-4 fixed flex flex-col justify-between">
      <div className=' p-1'>
      <img
        src={JagaKota}
        alt='Logo Jaga Kota'
        className='w-3/4 mb-6'
      />
      <ul>
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`block p-2 rounded mb-1 
                ${location.pathname === item.path ? 'bg-[#94c59c]' : 'hover:bg-[#94c59c]'}`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      </div>
      <div className='p-1 flex'>
        <img
          src="/images/user-square.png"
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-white"
        />
        <p className='ml-1 mt-2'>{user.username}</p>
      </div>
    </div>
  );
}
