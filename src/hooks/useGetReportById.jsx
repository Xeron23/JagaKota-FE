import { useQuery } from "@tanstack/react-query";
import http from "../lib/axios";

const fetchReportById = async (id) => {
  try {
    const res = await http.get(`/report/${id}`);

    return res.data.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("Laporan tidak ditemukan");
    }

    if (error.response?.status === 403) {
      throw new Error("Anda tidak memiliki akses untuk melihat laporan ini");
    }

    if (error.response?.status >= 500) {
      throw new Error("Terjadi kesalahan pada server");
    }

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
    retry: (failureCount, error) => {
      if (error.message.includes("tidak ditemukan")) {
        return false;
      }
      if (error.message.includes("tidak memiliki akses")) {
        return false;
      }
      return failureCount < 3;
    },
    ...options,
  });
};
