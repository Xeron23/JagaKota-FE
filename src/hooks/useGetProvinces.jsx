import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getAllProvince = async () => {
  try {
    // const province = await axios.get('http://localhost:9000/provinces');
    const province = await axios.get(
      "https://jagakota-backend.azurewebsites.net/provinces",
    );

    return province.data.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.response.data.errors);
  }
};

export const useGetProvinces = () => {
  return useQuery({
    queryKey: ["provinces"],
    queryFn : getAllProvince,
  })
}
