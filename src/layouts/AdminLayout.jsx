import { useState, useEffect } from "react";
import Sidebar from '../pages/admin/components/Sidebar';
import BackgroundJagaKota from '../assets/images/reportcarrousel-background.svg';

export default function AdminLayout({ children }) {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Full HD 14 inch sekitar 1920px width
      setIsLargeScreen(window.innerWidth > 1920);
    };

    handleResize(); // cek awal
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-[#F7EEDF] min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main
        className={`pt-16 p-6 overflow-auto relative min-h-screen bg-[#F7EEDF] ${
          isLargeScreen ? "ml-80" : "ml-56"
        }`}
      >
        {/* Layer background image dengan opacity */}
        <div
          className="absolute inset-0 bg-no-repeat bg-bottom bg-fixed"
          style={{
            backgroundImage: `url(${BackgroundJagaKota})`,
            backgroundSize: "100% 500px contain",
            opacity: 0.2,
            pointerEvents: "none",
          }}
        />

        {/* Konten */}
        <div className="relative z-10">{children}</div>
      </main>
    </div>
  );
}
