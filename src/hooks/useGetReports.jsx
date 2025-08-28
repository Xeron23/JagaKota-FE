import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const api = import.meta.env.VITE_API_BASE_URL ?? "";

export const getAllReports = async (offset = 0, limit = 10) => {
  try {
    const res = await axios.get(`${api}/report`, {
      params: { offset, limit },
    });
    const payload = res.data;
    return payload.data; // returns the array of reports
  } catch (error) {
    const res = error?.response?.data;
    const msg =
      typeof res?.errors === "string"
        ? res.errors
        : res?.errors
          ? Object.values(res.errors).join(", ")
          : res?.message || error.message || "Gagal memuat laporan";
    throw new Error(msg);
  }
};

export const useGetReports = (options = {}) => {
  const { offset = 0, limit = 10, ...queryOptions } = options;

  return useQuery({
    queryKey: ["reports", { offset, limit }],
    queryFn: () => getAllReports(offset, limit),
    cacheTime: 1200 * 60 * 1000, // 1200 minutes
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...queryOptions,
  });
};
