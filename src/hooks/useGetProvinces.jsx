import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const api = import.meta.env.VITE_API_BASE_URL ?? "";

export const getAllProvince = async () => {
  try {
    const province = await axios.get(`${api}/provinces`);

    return province.data.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.errors);
  }
};

export const useGetProvinces = () => {
  return useQuery({
    queryKey: ["provinces"],
    queryFn: getAllProvince,
    
  });
};
