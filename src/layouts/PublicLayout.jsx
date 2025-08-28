import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/NavbarPublic";
import Footer from "@/components/Footer";
import Loader from "@/components/loader";

export default function PublicLayout() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <Loader
          duration={700}
          onFinish={() => setIsLoading(false)}
          fullscreen
        />
      )}

      <div
        className={`flex min-h-screen flex-col transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Navbar />
        <main className="container mx-auto flex-1 py-2">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
