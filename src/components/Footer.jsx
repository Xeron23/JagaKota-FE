import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-gray-950 text-gray-300">
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

          {/* Support + Social */}
          <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm md:col-span-1 md:col-span-3 md:justify-start md:gap-4">
            <div className="text-sm">
              <span className="block text-white">Dukungan</span>
              <a
                className="text-gray-400 hover:text-white"
                href="mailto:support@jagakota.id"
              >
                support@jagakota.id
              </a>
            </div>
            <div className="ml-auto flex items-center gap-3 md:ml-0">
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="rounded-md p-2 text-gray-400 hover:bg-white/10 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm5 3a6 6 0 100 12 6 6 0 000-12zm0 2a4 4 0 110 8 4 4 0 010-8zm6.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="rounded-md p-2 text-gray-400 hover:bg-white/10 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M22.162 5.656a8.4 8.4 0 01-2.414.662 4.212 4.212 0 001.846-2.325 8.43 8.43 0 01-2.672 1.022A4.204 4.204 0 0015.39 4a4.206 4.206 0 00-4.203 4.203c0 .33.037.651.108.957A11.93 11.93 0 013.153 5.15a4.203 4.203 0 001.302 5.607 4.18 4.18 0 01-1.903-.526v.053A4.207 4.207 0 006.2 14.394a4.215 4.215 0 01-1.898.072 4.207 4.207 0 003.926 2.917A8.433 8.433 0 012 19.539a11.9 11.9 0 006.438 1.887c7.724 0 11.943-6.4 11.943-11.944 0-.182-.004-.363-.013-.543a8.519 8.519 0 002.094-2.283z" />
                </svg>
              </a>
              <a
                href="https://github.com"
                aria-label="GitHub"
                className="rounded-md p-2 text-gray-400 hover:bg-white/10 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.701 2 12.39c0 4.57 2.865 8.438 6.839 9.802.5.097.683-.224.683-.5 0-.247-.01-1.064-.015-1.931-2.782.628-3.37-1.23-3.37-1.23-.456-1.194-1.113-1.512-1.113-1.512-.91-.642.07-.629.07-.629 1.006.073 1.535 1.07 1.535 1.07.894 1.581 2.345 1.125 2.916.86.091-.673.35-1.126.636-1.386-2.221-.262-4.558-1.164-4.558-5.179 0-1.144.39-2.079 1.03-2.812-.103-.263-.447-1.318.098-2.748 0 0 .84-.275 2.75 1.072A9.44 9.44 0 0112 6.846c.852.004 1.71.116 2.512.34 1.91-1.347 2.749-1.072 2.749-1.072.546 1.43.202 2.485.1 2.748.64.733 1.029 1.668 1.029 2.812 0 4.026-2.341 4.914-4.57 5.17.36.326.68.968.68 1.953 0 1.409-.013 2.545-.013 2.89 0 .279.18.6.688.498A10.007 10.007 0 0022 12.39C22 6.701 17.523 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-gray-400 md:flex-row">
          <p>© {year} JagaKota. All rights reserved.</p>
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
