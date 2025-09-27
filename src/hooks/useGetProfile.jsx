import http from "../lib/axios";
import { useMutation } from "@tanstack/react-query";

const api = import.meta.env.VITE_API_BASE_URL;

export const GetProfile = async (id) => {
  try {
    const userLogin = await http.get(`${api}/user/${id}`, {
    });
    return userLogin.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Gagal ");
  }
};