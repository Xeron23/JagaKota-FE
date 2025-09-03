const api = import.meta.env.VITE_API_BASE_URL;
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

export const Login = async (identifier, password) => {
  try {
    console.log("hooks useAuth login");
    const userLogin = await axios.post(
      `${api}/user/login`,
      { identifier, password },
      {
        withCredentials: true,
      },
    );
    return userLogin.data.data;
  } catch (error) {
    if (error.response?.data?.errors) {
      throw error.response.data.errors;
    }
    throw new Error(error.response?.data?.message || "Login gagal");
  }
};

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: ({ identifier, password }) => Login(identifier, password),
  });
};

export const Register = async (formData) => {
  try {
    const submissionData = {
      ...formData,
      provinceId: Number(formData.provinceId),
      regencyId: Number(formData.regencyId),
    };

    const response = await axios.post(`${api}/user/register`, submissionData, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (error.response?.data?.errors) {
      throw error.response.data.errors;
    }
    throw new Error(
      error.response?.data?.message || "Pendaftaran gagal, terjadi kesalahan.",
    );
  }
};

export const useRegister = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: Register,
  });
};

// Fungsi untuk logout
export const Logout = async (token) => {
  try {
    const userLogout = await axios.delete(`${api}/auth/logout`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return userLogout.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout gagal");
  }
};

export const useLogout = () => {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: Logout,
    onSuccess: () => {
      localStorage.removeItem("token");
    },
  });
};

// Fungsi untuk refresh token
export const Refresh = async () => {
  try {
    const refresh = await axios.post(
      `${api}/user/refreshToken`,
      {},
      {
        withCredentials: true,
      },
    );
    return refresh.data.data.accessToken;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout gagal");
  }
};

export const useRefresh = () => {
  return useMutation({
    mutationKey: ["refresh"],
    mutationFn: Refresh,
    onSuccess: (token) => {
      if (token) {
        localStorage.setItem("token", token);
      }
    },
  });
};
