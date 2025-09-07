import { useQuery } from "@tanstack/react-query";
import http from "../lib/axios";

const fetchReports = async ({
  offset = 1,
  limit = 10,
  provinceId,
  regencyId,
} = {}) => {
  const params = { offset, limit };
  if (provinceId) params.provinceId = Number(provinceId);
  if (regencyId) params.regencyId = Number(regencyId);

  const res = await http.get("/report", { params });
  const data = res?.data?.data ?? [];
  const meta = res?.data?.meta ?? {
    page: Number(offset) || 1,
    limit: Number(limit) || 10,
    total: data.length,
    totalPages: 1,
  };
  return { data, meta };
};

export const useGetReports = (params) =>
  useQuery({
    queryKey: ["reports", params],
    queryFn: () => fetchReports(params),
    keepPreviousData: true,
    staleTime: 30_000,
  });
