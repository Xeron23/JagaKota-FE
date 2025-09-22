import { useQuery } from "@tanstack/react-query";
import http from "../lib/axios";

const fetchReportById = async (id) => {
  if (!id) {
    throw new Error("Report ID is required");
  }

  console.log("Fetching report by ID:", id);

  try {
    const res = await http.get(`/report/${id}`);

    if (!res?.data?.data) {
      throw new Error("Report not found");
    }

    return res.data.data;
  } catch (error) {
    console.error("Error fetching report by ID:", error);

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
    enabled: !!id, // Only run query if ID exists
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error) => {
      // Don't retry for 404 errors
      if (error.message.includes("tidak ditemukan")) {
        return false;
      }
      // Don't retry for permission errors
      if (error.message.includes("tidak memiliki akses")) {
        return false;
      }
      // Retry up to 3 times for other errors
      return failureCount < 3;
    },
    ...options,
  });
};
