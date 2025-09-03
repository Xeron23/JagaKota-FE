// src/components/Navbar.jsx (or wherever you placed it)
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import JagaKotaLogo from "@/assets/JagaKota.svg";
import JagaKotaLogo2 from "@/assets/JagaKota2.svg";
import { useAuth } from "@/context/Auth"; // Adjust path if necessary
import { useLogout } from "@/hooks/useAuth";

const NavbarMenu = [
  { name: "Beranda", href: "#beranda" },
  { name: "Laporan", href: "#laporan" },
];

const Navbar = () => {
  const [elevated, setElevated] = useState(false);
  const { isAuth, isChecking, user } = useAuth();
  // const navigate = useNavigate();
  const logoutMutation = useLogout();

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    // // Navigate to login page after logout is complete
    // navigate("/login");
  };

  const renderAuthButtons = () => {
    if (isChecking) {
      return (
        <div className="flex items-center space-x-3">
          <div className="h-9 w-20 animate-pulse rounded-md bg-gray-200"></div>
          <div className="h-9 w-20 animate-pulse rounded-md bg-gray-200"></div>
        </div>
      );
    }

    if (isAuth) {
      return (
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">
            Hi, {user.username}!
          </span>
          <Button asChild variant="ghost" size="sm" className="px-4">
            <Link to="/profile">Profile</Link>
          </Button>
          <Button onClick={handleLogout} size="sm" className="px-4">
            Logout
          </Button>
        </div>
      );
    }

    // User is not logged in
    return (
      <div className="flex items-center space-x-3">
        <Button asChild variant="outline" size="sm" className="px-4">
          <Link to="/register">Sign Up</Link>
        </Button>
        <Button asChild size="sm" className="px-4">
          <Link to="/login">Login</Link>
        </Button>
      </div>
    );
  };

  return (
    <nav
      className={`sticky top-0 z-50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 ${
        elevated ? "border-b border-gray-100 shadow-sm" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={JagaKotaLogo} alt="JagaKota" className="h-10 w-auto" />
            <img src={JagaKotaLogo2} alt="JagaKota" className="h-5 w-auto" />
          </Link>

          <div className="flex items-center space-x-1">
            {NavbarMenu.map((item) => (
              <a
                key={item.href}
                href={`/${item.href}`}
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>

          {renderAuthButtons()}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
