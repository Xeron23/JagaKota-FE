import http from "../lib/axios";
import { useMutation } from "@tanstack/react-query";

const api = import.meta.env.VITE_API_BASE_URL;

export const UpdateReport = async (idReport, status, notes) => {
  try {
    const userLogin = await http.patch(`${api}/report/${idReport}/verify`, {
      verificationStatus: status,
      verificationNotes: notes,
    });
    return userLogin.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Gagal ");
  }
};


// export const filterReport = 

// export const useReport = () => {
//   return useMutation({
//     mutationKey: ["report"],
//     mutationFn: ({ identifier, password }) => Login(identifier, password),
//   });
// };