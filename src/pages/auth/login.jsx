import { useState } from "react";
import ButtonSubmit from "../../components/Button.jsx";
import { useAuth } from "../../context/Auth.jsx";
import { useNavigate } from "react-router-dom";
import schema from "../../schema/login.js";
import Input from "../../components/Input.jsx";
import Alert from "../../components/Alert.jsx";

function Login() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ identifier: "", password: "" });

  // error message
  const [errorMessage, setErrorMessage] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await schema.validate(formData, { abortEarly: false });
      setErrorMessage({});

      const auth = await login(formData.identifier, formData.password);
      if (auth.success) {
        navigate("/dashboard");
      }
      if (auth.error) {
        setErrorMessage({ err: auth.error });
      }
    } catch (err) {
      if (err.inner) {
        const errorObj = {};
        err.inner.forEach((e) => {
          errorObj[e.path] = e.message;
        });
        setErrorMessage(errorObj);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('/images/asset_login_1.png'), url('/images/asset_login_2.png')",
        backgroundPosition: "left 100%, right center",
        backgroundSize: "1172px 498px, contain",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Masuk</h2>
        <p className="text-sm text-[#525252] mb-2">Selamat datang kembali.</p>
        <hr className="border-[#F7EEDF] my-3 border-[1.5px]" />
        <form onSubmit={handleSubmit}>
          {errorMessage.err && (
            <Alert message={errorMessage.err} type="danger" />
          )}
          <Input
            label="Username/Email"
            name="identifier"
            value={formData.identifier}
            id="identifier"
            onChange={handleChange}
            placeholder="budi123/budi@gmail.com"
            error={errorMessage.username}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            id="password"
            onChange={handleChange}
            placeholder="********"
            error={errorMessage.password}
          />
          <div className="flex items-center justify-end mt-2 mb-3">
            <label className="flex items-center space-x-2 cursor-pointer">
              <span className="text-black">Ingat saya?</span>
              <input
                type="checkbox"
                className="h-4 w-4 text-[#F7EEDF] border-gray-300 rounded focus:ring-[#F7EEDF]"
              />
            </label>
          </div>

          <div className="flex flex-col items-center gap-2 mt-6 p-4">
            <ButtonSubmit
              onClick={null}
              style="h-[42px] w-[312px] bg-[#6B8F71] text-white py-2 px-4 rounded-md hover:bg-[#6B8F71] transition-colors duration-200 mb-2"
            >
              Login
            </ButtonSubmit>
            <a
              href="/"
              className="h-[42px] flex items-center justify-center w-[312px] bg-white border border-[#6B8F71] text-[#6B8F71] py-2 px-4 rounded-md transition-colors duration-200"
            >
              Daftar
            </a>
          </div>
          <p className="mt-2 text-sm font-medium text-center text-black text-right">
            Lupa sandi ?
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
