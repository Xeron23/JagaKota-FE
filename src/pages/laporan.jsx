import React, { useEffect, useRef, useState } from "react";
import Input from "../components/Input.jsx";
import {
  getAllProvince,
  getRegencyById,
  uploadLaporan,
} from "../resolver/auth/province";
import reportSchema from "../schema/province.js";
import NavBar from "../components/Navbar.jsx";

const UploadForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    street: "",
    province: "",
    latitude: "",
    longitude: "",
    regency: "",
    photo: null,
  });
  const [errorMessage, setErrorMessage] = useState({});
  const [province, setProvince] = useState([]);
  const [regency, setRegency] = useState([]);
  const [preview, setPreview] = useState(null);

  // Status tombol: idle | loading | success
  const [submitStatus, setSubmitStatus] = useState("idle");

  // Ref untuk reset input file
  const fileInputRef = useRef(null);

  useEffect(() => {
    getProvince();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition, (error) => {
        console.error("Error mendapatkan lokasi:", error.message);
      });
    } else {
      console.error("Geolocation tidak didukung di browser ini.");
    }
  }, []);

  const getProvince = async () => {
    try {
      const prov = await getAllProvince();
      setProvince(prov || []);
    } catch (e) {
      console.error("Gagal memuat provinsi", e);
    }
  };

  const getRegency = async (id) => {
    try {
      if (!id) {
        setRegency([]);
        return;
      }
      const reg = await getRegencyById(id);
      setRegency(reg || []);
    } catch (e) {
      console.error("Gagal memuat kota/kabupaten", e);
    }
  };

  const getPosition = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setFormData((prev) => ({
      ...prev,
      latitude,
      longitude,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "province" || name === "regency"
        ? parseInt(value || 0) || ""
        : value;
    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0] || null;

    // cleanup preview sebelumnya
    if (preview) URL.revokeObjectURL(preview);

    setFormData((prev) => ({
      ...prev,
      photo: file,
    }));

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      street: "",
      province: "",
      latitude: "",
      longitude: "",
      regency: "",
      photo: null,
    });
    setPreview(null);
    setRegency([]);
    setErrorMessage({});
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus("loading");

    // Validasi dulu
    const dataToValidate = {
      title: formData.title,
      description: formData.description,
      latitude: formData.latitude,
      longitude: formData.longitude,
      street: formData.street,
      provinceId: formData.province,
      regencyId: formData.regency,
    };

    try {
      await reportSchema.validate(dataToValidate, { abortEarly: false });
      setErrorMessage({});
    } catch (err) {
      setSubmitStatus("idle");
      if (err.inner) {
        const errorObj = {};
        err.inner.forEach((e) => {
          errorObj[e.path] = e.message;
        });
        setErrorMessage(errorObj);
      }
      return;
    }

    // Siapkan FormData setelah validasi
    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("latitude", formData.latitude);
    form.append("longitude", formData.longitude);
    form.append("street", formData.street);
    form.append("provinceId", formData.province);
    form.append("regencyId", formData.regency);
    if (formData.photo) form.append("photo", formData.photo);

    try {
      const token = JSON.parse(localStorage.getItem("user") || "{}")?.token;
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login kembali.");
      }

      const response = await uploadLaporan(form, token);
      if (response) {
        setSubmitStatus("success");
        resetForm();
        setTimeout(() => setSubmitStatus("idle"), 1500);
      } else {
        setSubmitStatus("idle");
      }
    } catch (err) {
      console.error("Gagal mengunggah laporan:", err);
      setSubmitStatus("idle");
    }
  };

  return (
    <div
      className="flex min-h-screen flex-col text-black"
      style={{
        backgroundImage:
          "url('/images/laporan.png'), linear-gradient(#F7EEDF, #F7EEDF)",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundPosition: "top center, bottom center",
        backgroundSize: "100% 65%, 100% 35%",
      }}
    >
      <NavBar />

      <div className="mx-auto mt-10 max-w-4xl rounded-xl bg-white p-6 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold">
          Upload Data Lokasi
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Kiri: Input */}
            <div className="space-y-4">
              <Input
                label="Title"
                name="title"
                id="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
                error={errorMessage.title}
              />

              <Input
                label="Description"
                name="description"
                id="description"
                type="text"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                error={errorMessage.description}
              />

              <Input
                label="Street"
                name="street"
                id="street"
                type="text"
                value={formData.street}
                onChange={handleChange}
                placeholder="Enter street"
                error={errorMessage.street}
              />

              {/* Province */}
              <div className="flex flex-col">
                <label
                  htmlFor="province"
                  className="mb-1 font-medium text-gray-700"
                >
                  Provinsi
                </label>
                <select
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={(e) => {
                    handleChange(e);
                    const val = e.target.value;
                    getRegency(val);
                    // reset pilihan regency saat ganti provinsi
                    setFormData((prev) => ({ ...prev, regency: "" }));
                  }}
                  className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">-- Pilih Provinsi --</option>
                  {province.map((prov) => (
                    <option key={prov.province_id} value={prov.province_id}>
                      {prov.name}
                    </option>
                  ))}
                </select>
                {errorMessage.province && (
                  <p className="mt-1 text-sm text-red-500">
                    {errorMessage.province}
                  </p>
                )}
              </div>

              {/* Regency */}
              <div className="flex flex-col">
                <label
                  htmlFor="regency"
                  className="mb-1 font-medium text-gray-700"
                >
                  Kota/Kabupaten
                </label>
                <select
                  id="regency"
                  name="regency"
                  value={formData.regency}
                  onChange={handleChange}
                  className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">-- Pilih Kota/Kabupaten --</option>
                  {regency.map((reg) => (
                    <option key={reg.regency_id} value={reg.regency_id}>
                      {reg.name}
                    </option>
                  ))}
                </select>
                {errorMessage.regency && (
                  <p className="mt-1 text-sm text-red-500">
                    {errorMessage.regency}
                  </p>
                )}
              </div>
            </div>

            {/* Kanan: Preview Gambar */}
            <div className="flex flex-col items-center rounded-lg border bg-gray-50 p-4">
              <div className="flex min-h-[250px] w-full items-center justify-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-[250px] w-auto rounded"
                  />
                ) : (
                  <span className="text-gray-400">Belum ada foto</span>
                )}
              </div>
              <div className="mt-4 w-full">
                <label
                  htmlFor="photo"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Foto Lokasi *
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="mt-1 block w-full text-sm file:rounded file:border file:bg-gray-100 file:px-6 file:py-3"
                />
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="flex justify-center">
            <label className="flex max-w-2xl items-start gap-2 text-center">
              <input type="checkbox" className="mt-1" />
              <span>
                Dengan ini saya siap mempertanggungjawabkan laporan yang saya
                kirimkan dan segala informasi yang tercantum adalah benar
                adanya.
              </span>
            </label>
          </div>

          {/* Tombol Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={submitStatus === "loading"}
              className="flex items-center gap-2 rounded-md bg-blue-600 px-6 py-2 text-white transition-colors duration-200 hover:bg-blue-700"
            >
              {submitStatus === "loading" && (
                <>
                  Memproses
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                </>
              )}
              {submitStatus === "success" && (
                <>
                  Berhasil
                  <span>✔</span>
                </>
              )}
              {submitStatus === "idle" && "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;
