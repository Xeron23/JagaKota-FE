import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const api = import.meta.env.VITE_API_BASE_URL;

async function getRegenciesByProvinceId(provinceId) {
  try {
    const res = await axios.get(`${api}/provinces/${provinceId}/regencies`);
    const payload = res.data;
    return payload.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.errors);
  }
}

export const useGetRegencies = (provinceId) => {
  return useQuery({
    queryKey: ["regencies", provinceId],
    queryFn: () => getRegenciesByProvinceId(provinceId),
    enabled: !!provinceId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 1200 * 60 * 1000, // 1200 minutes
  });
};
