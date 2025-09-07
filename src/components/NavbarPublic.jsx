import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import JagaKotaLogo from "@/assets/JagaKota.svg";
import JagaKotaLogo2 from "@/assets/JagaKota2.svg";
import { useAuth } from "@/context/Auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NavbarMenu = [
  { name: "Beranda", href: "#beranda" },
  { name: "Laporan", href: "#laporan" },
];

const Navbar = () => {
  const [elevated, setElevated] = useState(false);
  const { isAuth, isChecking, user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
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
      const initial = (user?.username?.[0] || "U").toUpperCase();
      return (
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="px-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatarUrl} alt={user?.username} />
                    <AvatarFallback>{initial}</AvatarFallback>
                  </Avatar>
                  <span className="hidden text-sm font-medium text-gray-700 sm:inline">
                    {user?.username}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="text-xs text-gray-500">Signed in as</div>
                <div className="truncate font-medium">{user?.username}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 focus:text-red-600"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-3">
        <Button asChild variant="outline" size="sm" className="px-4">
          <Link to="/register">Sign Up</Link>
        </Button>
        <Button
          asChild
          size="sm"
          className="transition-color duration-600 w-full justify-center rounded-lg bg-gradient-to-r from-gray-900 to-gray-700 px-6 py-2 text-sm font-medium text-white shadow-md hover:from-gray-800 hover:to-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
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
