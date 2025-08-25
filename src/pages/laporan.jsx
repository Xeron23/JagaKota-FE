import React, { useEffect, useState } from "react";
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
    const province = await getAllProvince();
    setProvince(province);
  };

  const getRegency = async (id) => {
    const regency = await getRegencyById(id);
    setRegency(regency);
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
      name === "province" || name === "regency" ? parseInt(value) : value;
    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      photo: file,
    }));
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitStatus("loading"); // mulai loading

    const form = new FormData();

    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("latitude", formData.latitude);
    form.append("longitude", formData.longitude);
    form.append("street", formData.street);
    form.append("provinceId", formData.province);
    form.append("regencyId", formData.regency);
    form.append("photo", formData.photo);
    console.log(form);

    try {
      const data = {
        title: formData.title,
        description: formData.description,
        latitude: formData.latitude,
        longitude: formData.longitude,
        street: formData.street,
        provinceId: formData.province,
        regencyId: formData.regency,
      };

      await reportSchema.validate(data, { abortEarly: false });
      setErrorMessage({});
      const token = JSON.parse(localStorage.getItem("user")).token;

      const response = await uploadLaporan(form, token);
      console.log("response: ", response);

      if (response) {
        setSubmitStatus("success"); // tampilkan status berhasil
        setTimeout(() => setSubmitStatus("idle"), 2000); // kembali normal setelah 2 detik
        formData.title = "";
        formData.description = "";
        formData.street = "";
        formData.province = "";
        formData.regency = "";
        formData.photo = null;
        formData.latitude = "";
        formData.longitude = "";
        setPreview(null);

        // Reset input file HTML
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        return;
      }
    } catch (err) {
      setSubmitStatus("idle"); // kembali normal jika error
      if (err.inner) {
        const errorObj = {};
        err.inner.forEach((e) => {
          errorObj[e.path] = e.message;
        });
        setErrorMessage(errorObj);
      }
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col text-black"
      style={{
        backgroundImage:
          "url('/images/laporan.png'), linear-gradient(#F7EEDF, #F7EEDF)",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundPosition: "top center, bottom center",
        backgroundSize: "100% 65%, 100% 35%",
      }}
    >
      <NavBar />

      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Upload Data Lokasi
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  className="text-gray-700 font-medium mb-1"
                >
                  Provinsi
                </label>
                <select
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={(e) => {
                    handleChange(e);
                    getRegency(e.target.value);
                  }}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">-- Pilih Provinsi --</option>
                  {province.map((prov) => (
                    <option key={prov.province_id} value={prov.province_id}>
                      {prov.name}
                    </option>
                  ))}
                </select>
                {errorMessage.province && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorMessage.province}
                  </p>
                )}
              </div>

              {/* Regency */}
              <div className="flex flex-col">
                <label
                  htmlFor="regency"
                  className="text-gray-700 font-medium mb-1"
                >
                  Kota/Kabupaten
                </label>
                <select
                  id="regency"
                  name="regency"
                  value={formData.regency}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">-- Pilih Kota/Kabupaten --</option>
                  {regency.map((reg) => (
                    <option key={reg.regency_id} value={reg.regency_id}>
                      {reg.name}
                    </option>
                  ))}
                </select>
                {errorMessage.regency && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorMessage.regency}
                  </p>
                )}
              </div>
            </div>

            {/* Kanan: Preview Gambar */}
            <div className="flex flex-col items-center border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-center w-full min-h-[250px]">
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
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Foto Lokasi *
                </label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="mt-1 block w-full text-sm file:py-3 file:px-6 file:border file:rounded file:bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="flex justify-center">
            <label className="flex items-start gap-2 max-w-2xl text-center">
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
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
            >
              {submitStatus === "loading" && (
                <>
                  Memproses
                  <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
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
