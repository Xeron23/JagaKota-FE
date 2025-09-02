import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ButtonSubmit from "../../components/Button.jsx";
import Input from "../../components/Input.jsx";
import Alert from "../../components/Alert.jsx";

import { useLogin } from "../../hooks/useAuth.jsx";

function Login() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const navigate = useNavigate();
  const loginMutation = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();

    loginMutation.mutate(formData, {
      onSuccess: (data) => {
        const { username, email, role, token } = data;
        const user = { username, email, role };

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        if (role === "ADMIN") {
          navigate("/dashboard");
        }

        if (role === "USER") {
          navigate("/");
        }
      },
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const apiError = loginMutation.error;

  const fieldErrors =
    typeof apiError === "object" &&
    apiError !== null &&
    !(apiError instanceof Error)
      ? apiError
      : {};

  console.log(fieldErrors);
  console.log(formData.identifier);

  const generalError = apiError instanceof Error ? apiError.message : null;

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('/images/asset_login_1.png'), url('/images/asset_login_2.png')",
        backgroundPosition: "left 100%, right center",
        backgroundSize: "1172px 498px, contain",
      }}
    >
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">Masuk</h2>
        <p className="mb-2 text-sm text-[#525252]">Selamat datang kembali.</p>
        <hr className="my-3 border-[1.5px] border-[#F7EEDF]" />

        <form onSubmit={handleLogin}>
          {/* Tampilkan alert untuk error umum */}
          {generalError && <Alert message={generalError} type="danger" />}

          <Input
            label="Username/Email"
            name="identifier"
            value={formData.identifier}
            id="identifier"
            onChange={handleChange}
            placeholder="budi123/budi@gmail.com"
            error={fieldErrors.identifier}
            disabled={loginMutation.isPending}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            id="password"
            onChange={handleChange}
            placeholder="********"
            error={fieldErrors.password}
            disabled={loginMutation.isPending}
          />

          <div className="mt-6 flex flex-col items-center gap-2 p-4">
            <ButtonSubmit
              style="h-[42px] w-[312px] bg-[#6B8F71] text-white py-2 px-4 rounded-md hover:bg-[#6B8F71] transition-colors duration-200 mb-2"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Masuk..." : "Login"}
            </ButtonSubmit>

            <a
              href="/register"
              className="flex h-[42px] w-[312px] items-center justify-center rounded-md border border-[#6B8F71] bg-white px-4 py-2 text-[#6B8F71] transition-colors duration-200"
            >
              Daftar
            </a>
          </div>

          <p className="mt-2 text-right text-sm font-medium text-black">
            Lupa sandi ?
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
