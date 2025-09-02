import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useLogin, useLogout, useRefresh } from "../hooks/useAuth.jsx";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [user, setUser] = useState({});

  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  const refreshMutation = useRefresh();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        let token = localStorage.getItem("token");
        let user = localStorage.getItem("user");
        if (token) {
          const data = jwtDecode(token);
          const now = Date.now() / 1000;

          if (data.exp < now) {
            localStorage.removeItem("token");
            // Try to refresh token
            try {
              const newToken = await refreshMutation.mutateAsync();
              if (newToken) {
                setIsAuth(true);
                setUser(newToken);
              }
            } catch (error) {
              console.error("Failed to refresh token:", error);
              window.location.href = "/login";
            }
          } else {
            setIsAuth(true);
            setUser(user);
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        window.location.href = "/login";
      }
      setIsChecking(false);
    };

    checkAuth();
  }, [refreshMutation]);

  const login = async (username, password) => {
    try {
      const result = await loginMutation.mutateAsync({ username, password });
      setIsAuth(true);
      setUser(result.data?.name || username);
      return {
        success: true,
        data: result,
      };
    } catch (err) {
      return {
        success: false,
        error: err.message,
      };
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      await logoutMutation.mutateAsync(token);
      setIsAuth(false);
      setUser(null);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        isChecking,
        user,
        login,
        logout,
        isLoading: loginMutation.isPending || logoutMutation.isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
