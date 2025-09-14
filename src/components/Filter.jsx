import React, { useState, useEffect } from "react";
import ProvinceRegencySelect from "./ProvinceRegencySelect";

const FilterLaporan = ({ onFilter, onClose }) => {
  const [weekly, setWeekly] = useState(false);
  const [tanggal, setTanggal] = useState(false);
  const [likes, setLikes] = useState(false);
    const [province, setProvince] = useState("");
    const [regency, setRegency] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();
    
    onFilter({
      weekly,
      tanggal,
      likes,
      province,
      regency
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md w-64 bg-white">
      <h3 className="mb-2 font-semibold">Urutkan menurut</h3>
      <div className="flex flex-col gap-1 mb-4">
        <label>
          <input type="checkbox" checked={weekly} onChange={() => setWeekly(!weekly)} />
          Laporan Mingguan
        </label>
        <label>
          <input type="checkbox" checked={tanggal} onChange={() => setTanggal(!tanggal)} />
          Tanggal Upload Terbaru
        </label>
        <label>
          <input type="checkbox" checked={likes} onChange={() => setLikes(!likes)} />
          Jumlah Like
        </label>
      </div>
    <ProvinceRegencySelect
        provinceId={province}
        regencyId={regency}
        onProvinceChange={setProvince}
        onRegencyChange={setRegency}
    />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Cari
      </button>
      <button type="button" className="bg-green-600 text-white px-4 py-2 rounded" onClick={onClose}>
        Tutup
      </button>
    </form>
  );
};

export default FilterLaporan;