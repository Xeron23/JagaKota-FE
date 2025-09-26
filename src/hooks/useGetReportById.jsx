import { useQuery } from "@tanstack/react-query";
import http from "../lib/axios";

const fetchReportById = async (id) => {
  try {
    const res = await http.get(`/report/${id}`);

    return res.data.data;
  } catch (error) {
    throw new Error(error.message || "Gagal memuat detail laporan");
  }
};

export const useGetReportById = (id, options = {}) => {
  return useQuery({
    queryKey: ["report", id],
    queryFn: () => fetchReportById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
};
