import { useMutation } from "@tanstack/react-query";
import http from "../lib/axios";

const buildReportFormData = (payload = {}) => {
  const {
    title,
    description,
    latitude,
    longitude,
    street,
    photo,
    provinceId,
    regencyId,
  } = payload;

  const form = new FormData();
  if (title != null) form.append("title", String(title));
  if (description != null) form.append("description", String(description));
  if (latitude != null) form.append("latitude", parseFloat(latitude));
  if (longitude != null) form.append("longitude", parseFloat(longitude));
  if (street != null) form.append("street", String(street));
  if (provinceId != null) form.append("provinceId", Number(provinceId));
  if (regencyId != null) form.append("regencyId", Number(regencyId));
  if (photo instanceof File || (photo && typeof photo === "object")) {
    form.append("photo", photo);
  }
  return form;
};

export const postReport = async (payload = {}, config = {}) => {
  try {
    const form = buildReportFormData(payload);
    const res = await http.post("/report", form, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...(config.headers || {}),
      },
      onUploadProgress: config.onUploadProgress,
    });
    return res.data;
  } catch (error) {
    if (error.response?.data?.errors) {
      console.log(error.response.data.errors);
      throw error.response.data.errors;
    }

    throw new Error(error.response?.data?.message || "Login gagal");
  }
};

export const usePostReport = (options = {}) => {
  return useMutation({
    mutationKey: ["post-report"],
    mutationFn: async (vars = {}) => {
      const { config, ...payload } = vars;
      return postReport(payload, config);
    },
    ...options,
  });
};
