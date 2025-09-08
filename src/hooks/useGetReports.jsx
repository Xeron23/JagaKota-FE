import { useQuery } from "@tanstack/react-query";
import http from "../lib/axios";

const fetchReports = async ({
  offset = 1,
  limit = 10,
  provinceId,
  regencyId,
  stage,
  progress,
} = {}) => {
  const params = { offset, limit };
  if (provinceId) params.provinceId = Number(provinceId);
  if (regencyId) params.regencyId = Number(regencyId);
  if (stage) params.stage = stage;
  if (progress) params.status = progress;

  try {
    const res = await http.get("/report", { params });
    const data = Array.isArray(res?.data?.data) ? res.data.data : [];
    const meta = res?.data?.meta ?? {
      page: Number(offset) || 1,
      limit: Number(limit) || 10,
      total: data.length,
      totalPages: data.length
        ? Math.ceil(data.length / (Number(limit) || 10))
        : 0,
    };
    const message = res?.data?.message;
    const status = res?.data?.status ?? true;
    const code = res?.data?.code;

    return { data, meta, message, status, code };
  } catch (error) {
    if (error?.response?.status === 404) {
      const message =
        error?.response?.data?.message || "Laporan tidak ditemukan";
      return {
        data: [],
        meta: {
          page: Number(offset) || 1,
          limit: Number(limit) || 10,
          total: 0,
          totalPages: 0,
        },
        message,
        status: false,
        code: 404,
      };
    }
    throw error;
  }
};

export const useGetReports = (params) =>
  useQuery({
    queryKey: ["reports", params],
    queryFn: () => fetchReports(params),
    keepPreviousData: true,
    cacheTime: 5 * 60 * 1000,
    staleTime: 30_000,
  });
