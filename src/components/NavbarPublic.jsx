import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import JagaKotaLogo from "@/assets/JagaKota.svg";
import JagaKotaLogo2 from "@/assets/JagaKota2.svg";

const NavbarMenu = [
  { name: "Beranda", href: "#beranda" },
  { name: "Laporan", href: "#laporan" },
];

const Navbar = () => {
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 ${
        elevated ? "shadow-sm border-b border-gray-100" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-3">
            <img src={JagaKotaLogo} alt="JagaKota" className="h-10 w-auto" />
            <img src={JagaKotaLogo2} alt="JagaKota" className="h-5 w-auto" />
          </Link>

          <div className="flex items-center space-x-1">
            {NavbarMenu.map((item) => (
              <a
                key={item.href}
                href={`/${item.href}`}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <Button asChild variant="outline" size="sm" className="px-4">
              <Link to="/">Sign Up</Link>
            </Button>
            <Button asChild size="sm" className="px-4">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
