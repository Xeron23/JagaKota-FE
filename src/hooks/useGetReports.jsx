import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const api = import.meta.env.VITE_API_BASE_URL ?? "";

export const getAllReports = async (offset, limit) => {
  try {
    const res = await axios.get(`${api}/report?offset=${offset}&limit=${limit}`);
    const payload = res.data;
    return payload.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.errors);
  }
};

export const useGetReports = () => {
  return useQuery({
    queryKey: ["reports"],
    queryFn: getAllReports,
    cacheTime: 1200 * 60 * 1000, // 1200 minutes
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
