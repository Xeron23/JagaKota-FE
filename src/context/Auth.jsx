import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  useLogin,
  useLogout,
  useRefresh,
  useRegister,
} from "../hooks/useAuth.jsx";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [user, setUser] = useState({});

  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  const refreshMutation = useRefresh();
  const registerMutation = useRegister();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        let token = localStorage.getItem("token");
        let userData = localStorage.getItem("user");

        if (token) {
          const data = jwtDecode(token);
          const now = Date.now() / 1000;

          if (data.exp < now) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            try {
              const newToken = await refreshMutation.mutateAsync();
              if (newToken) {
                setIsAuth(true);
                // Decode the new token to get user info
                const decodedUser = jwtDecode(newToken);
                setUser(decodedUser);
              }
            } catch (error) {
              console.error("Failed to refresh token:", error);
              setIsAuth(false);
              setUser({});
            }
          } else {
            setIsAuth(true);
            setUser(userData ? JSON.parse(userData) : {});
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuth(false);
        setUser({});
      }
      setIsChecking(false);
    };

    checkAuth();
  }, []);

  const login = async (identifier, password) => {
    try {
      const result = await loginMutation.mutateAsync({ identifier, password });
      const { username, email, role, token } = result;
      const userData = { username, email, role };

      // Store user data and token
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);

      setIsAuth(true);
      setUser(userData);

      return {
        success: true,
        data: result,
        role: role,
      };
    } catch (err) {
      return {
        success: false,
        error: err,
      };
    }
  };

  const register = async (formData) => {
    try {
      const result = await registerMutation.mutateAsync(formData);
      return {
        success: true,
        data: result,
      };
    } catch (err) {
      return {
        success: false,
        error: err,
      };
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      await logoutMutation.mutateAsync(token);
      setIsAuth(false);
      setUser({});
      return { success: true };
    } catch (error) {
      // Even if logout fails, clear local state
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsAuth(false);
      setUser({});
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
        register,
        logout,
        isLoading:
          loginMutation.isPending ||
          logoutMutation.isPending ||
          registerMutation.isPending,
        loginError: loginMutation.error,
        registerError: registerMutation.error,
        isLoginPending: loginMutation.isPending,
        isRegisterPending: registerMutation.isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
