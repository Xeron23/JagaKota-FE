import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const api = import.meta.env.VITE_API_BASE_URL ?? "";

export const getAllProvince = async () => {
  try {
    const res = await axios.get(`${api}/provinces`);
    const payload = res.data;
    return payload.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.errors);
  }
};

export const useGetProvinces = () => {
  return useQuery({
    queryKey: ["provinces"],
    queryFn: getAllProvince,
    cacheTime: 1200 * 60 * 1000, // 1200 minutes
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
