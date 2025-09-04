import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "../../components/Input.jsx";
import ButtonSubmit from "../../components/Button.jsx";
import Alert from "../../components/Alert.jsx";
import ProvinceRegencySelect from "@/components/ProvinceRegencySelect.jsx";

import { useAuth } from "@/context/Auth.jsx";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    street: "",
    provinceId: "",
    regencyId: "",
  });

  const navigate = useNavigate();
  const { register, isRegisterPending, registerError } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();

    const result = await register(formData);

    if (result.success) {
      navigate("/login");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProvinceChange = (provinceId) => {
    setFormData((prev) => ({ ...prev, provinceId, regencyId: "" }));
  };

  const handleRegencyChange = (regencyId) => {
    setFormData((prev) => ({ ...prev, regencyId }));
  };

  // cek apakah error nya object atau string
  const fieldErrors =
    typeof registerError === "object" &&
    registerError !== null &&
    !(registerError instanceof Error)
      ? registerError
      : {};

  const generalError =
    registerError instanceof Error ? registerError.message : null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Buat Akun Baru
        </h2>

        {/* Tampilkan alert untuk error umum */}
        {generalError && <Alert message={generalError} type="danger" />}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Nama Depan"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              error={fieldErrors.firstName}
              disabled={isRegisterPending}
            />
            <Input
              label="Nama Belakang (Optional)"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              error={fieldErrors.lastName}
              disabled={isRegisterPending}
            />
          </div>

          <Input
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="johndoe123"
            error={fieldErrors.username}
            disabled={isRegisterPending}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="johndoe123@example.com"
            error={fieldErrors.email}
            disabled={isRegisterPending}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="********"
            error={fieldErrors.password}
            disabled={isRegisterPending}
          />
          <Input
            label="Nomor Telepon"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="081234567890"
            error={fieldErrors.phoneNumber}
            disabled={isRegisterPending}
          />
          <Input
            label="Alamat Jalan"
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Jl. Diponegoro No. 12"
            error={fieldErrors.street}
            disabled={isRegisterPending}
          />

          <ProvinceRegencySelect
            provinceId={formData.provinceId}
            regencyId={formData.regencyId}
            onProvinceChange={handleProvinceChange}
            onRegencyChange={handleRegencyChange}
            regencyError={fieldErrors.regencyId}
            provinceError={fieldErrors.provinceId}
            theme="light"
          />

          <div className="pt-4">
            <ButtonSubmit
              style="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-semibold"
              disabled={isRegisterPending}
            >
              {isRegisterPending ? "Mendaftar..." : "Daftar"}
            </ButtonSubmit>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:underline"
          >
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
