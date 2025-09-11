import axios from "axios";

const apiBase = import.meta.env.VITE_API_BASE_URL;

const getAccessToken = () => localStorage.getItem("token");

const http = axios.create({
  baseURL: apiBase,
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        console.log("Attempting to refresh token...");

        // Use a separate axios instance for refresh to avoid interceptor loops
        const refreshResponse = await axios.post(
          `${apiBase}/user/refreshToken`,
          {},
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        console.log("Refresh response:", refreshResponse.data);

        // Try different possible response structures
        const newToken = refreshResponse.data?.token ||
          refreshResponse.data?.data?.token ||
          refreshResponse.data?.accessToken ||
          refreshResponse.data?.access_token;

        if (newToken) {
          console.log("New token received, updating storage...");
          localStorage.setItem("token", newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return http(originalRequest);
        } else {
          console.error("No token found in refresh response:", refreshResponse.data);
          throw new Error("No token in refresh response");
        }

      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError.response?.data || refreshError.message);

        // Clear storage and redirect to login
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Prevent multiple redirects
        if (!window.location.pathname.includes('/login')) {
          window.location.assign("/login");
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default http;