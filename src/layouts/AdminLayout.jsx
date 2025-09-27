import Sidebar from '../pages/admin/components/Sidebar';
import BackgroundJagaKota from '../assets/images/reportcarrousel-background.svg'

export default function AdminLayout({ children }) {
  return (
    <div className="bg-[#F7EEDF] min-h-screen">
      {/* Sidebar */}
      <Sidebar />


      {/* Main Content */}
    <main className="ml-80 pt-16 p-6 overflow-auto relative min-h-screen bg-[#F7EEDF]">
      {/* Layer background image dengan opacity */}
      <div
        className="absolute inset-0 bg-no-repeat bg-bottom bg-fixed"
        style={{
          backgroundImage: `url(${BackgroundJagaKota})`,
          backgroundSize: "100% 500px contain",
          // backgroundPosition: "left 100%, right center",
          opacity: 0.2, // 20% opacity
          pointerEvents: "none", // biar nggak ganggu klik
        }}
      />

      {/* Konten */}
      <div className="relative z-10">
        {children}
      </div>
    </main>
    </div>
  );
}
