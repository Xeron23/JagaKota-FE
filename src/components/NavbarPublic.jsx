import React from "react";
import { Button } from "@/components/ui/button";
import JagaKotaLogo from "../assets/JagaKota.svg";
import JagaKotaLogo2 from "../assets/JagaKota2.svg";

const NavbarMenu = [
  { name: "Home", href: "#home" },
  { name: "Partner", href: "#partner" },
  { name: "Tournament", href: "#tournament" },
  { name: "Blog", href: "#blog" },
];

const Navbar = () => {
  return (
    <nav className="bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-3">
            <img
              src={JagaKotaLogo}
              alt="JagaKota Logo"
              className="h-[41px] w-[75px] mt-[6px] ml-[20px]"
            />
            <img
              src={JagaKotaLogo2}
              alt="JagaKota Logo"
              className="w-[113px] h-[22px] mt-[16px] ml-[82px]"
            />
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            {NavbarMenu.map((item, index) => (
              <a
                key={index}
                href={`/${item.href}`}
                className="text-gray-900 hover:text-gray-500 px-3 py-2 rounded-md text-sm font-medium hover:font-bold transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="flex items-center space-x-4 ml-6">
            <Button variant="outline" size="lg" className="px-4">
              Sign Up
            </Button>
            <Button size="lg" className="px-4">
              Login
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
