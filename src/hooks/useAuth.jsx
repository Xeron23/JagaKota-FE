import http from "../lib/axios";
import { useMutation } from "@tanstack/react-query";

const api = import.meta.env.VITE_API_BASE_URL;

export const Login = async (identifier, password) => {
  try {
    const userLogin = await http.post(`${api}/user/login`, {
      identifier,
      password,
    });
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
    const response = await http.post(`${api}/user/register`, submissionData);
    return response.data;
  } catch (error) {
    if (error.response?.data?.errors) {
      throw error.response.data.errors;
    }
    throw new Error(error.response?.data?.message || "Login gagal");
  }
};

export const useRegister = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: Register,
  });
};

export const Logout = async () => {
  try {
    await http.delete(`${api}/auth/logout`);
    return true;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Logout gagal");
  }
};

export const useLogout = () => {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: Logout,
  });
};

export const Refresh = async () => {
  try {
    const res = await http.post(`${api}/user/refreshToken`, {});
    return res.data?.data?.accessToken;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Refresh gagal");
  }
};

export const useRefresh = () => {
  return useMutation({
    mutationKey: ["refresh"],
    mutationFn: Refresh,
  });
};
