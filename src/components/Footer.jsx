import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center ">
          <div className="text-sm">
            © {new Date().getFullYear()} JagaKota. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
