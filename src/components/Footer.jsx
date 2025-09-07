import React from "react";
import JagaKotaLogo from "../assets/JagaKotaa.svg";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-950 text-gray-300">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(255,255,255,0.05),transparent)]"
      />
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="text-xl font-semibold text-white">JagaKota</div>
            <p className="mt-3 text-sm text-gray-400">
              Platform pelaporan kerusakan infrastruktur. Bantu kota jadi lebih
              baik.
            </p>
          </div>

          {/* Links */}
          <nav className="grid grid-cols-2 gap-6 text-sm md:grid-cols-3">
            <div>
              <div className="mb-3 font-medium text-white">Produk</div>
              <ul className="space-y-2">
                <li>
                  <a className="hover:text-white" href="/lapor">
                    Lapor
                  </a>
                </li>
                <li>
                  <a className="hover:text-white" href="/status">
                    Status
                  </a>
                </li>
                <li>
                  <a className="hover:text-white" href="/panduan">
                    Panduan
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="mb-3 font-medium text-white">Perusahaan</div>
              <ul className="space-y-2">
                <li>
                  <a className="hover:text-white" href="/tentang">
                    Tentang
                  </a>
                </li>
                <li>
                  <a className="hover:text-white" href="/kontak">
                    Kontak
                  </a>
                </li>
                <li>
                  <a className="hover:text-white" href="/karir">
                    Karir
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="mb-3 font-medium text-white">Legal</div>
              <ul className="space-y-2">
                <li>
                  <a className="hover:text-white" href="/kebijakan-privasi">
                    Privasi
                  </a>
                </li>
                <li>
                  <a className="hover:text-white" href="/ketentuan">
                    Ketentuan
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-gray-400 md:flex-row">
          <div className="flex items-center space-x-3">
            <img
              src={JagaKotaLogo}
              alt="JagaKota Logo"
              className="ml-[40px] mt-[6px] h-[54px] w-[100px]"
            />
            <p className="justify-center">
              © {year} JagaKota. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a className="hover:text-white" href="/kebijakan-privasi">
              Kebijakan Privasi
            </a>
            <a className="hover:text-white" href="/ketentuan">
              Ketentuan Layanan
            </a>
            <a className="hover:text-white" href="#top">
              Kembali ke atas
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
