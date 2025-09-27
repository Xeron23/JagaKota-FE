import { useMutation } from "@tanstack/react-query";
import http from "../lib/axios";

const buildReportFormData = (payload = {}) => {
  const { stage, progressNotes, photo } = payload;

  const form = new FormData();
  if (stage != null) form.append("stage", String(stage));
  if (progressNotes != null) form.append("progressNotes", String(progressNotes));
  if (photo instanceof File || (photo && typeof photo === "object")) {
    form.append("photo", photo);
  }
  return form;
};

export const postReportProgress = async (id, payload = {}, config = {}) => {
  try {
    const form = buildReportFormData(payload);
    const res = await http.post(`/report/${id}/progress`, form, {
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

export const usePostReportprogress = (options = {}) => {
  return useMutation({
    mutationKey: ["post-report-progress"],
    mutationFn: async (vars = {}) => {
      const { id, config, ...payload } = vars;
      return postReportProgress(id, payload, config);
    },
    ...options,
  });
};
