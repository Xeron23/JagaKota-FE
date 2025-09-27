import http from "../lib/axios";
import { useMutation } from "@tanstack/react-query";

const api = import.meta.env.VITE_API_BASE_URL;

export const GetLeaderboard = async () => {
  try {
    const leaderboard = await http.get(`${api}/user/leaderboard`, {
    });
    console.log(leaderboard.data.data);
    
    return leaderboard.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Gagal ");
  }
};