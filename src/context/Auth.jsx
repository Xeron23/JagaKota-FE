import { createContext, useContext, useEffect, useState } from "react";
import {
  useLogin,
  useLogout,
  useRegister,
} from "../hooks/useAuth.jsx";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [user, setUser] = useState({});

  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  const registerMutation = useRegister();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setIsAuth(true);
      setUser(JSON.parse(userData));
    } else {
      setIsAuth(false);
      setUser({});
    }
    setIsChecking(false);
  }, []);

  const login = async (identifier, password) => {
    try {
      const result = await loginMutation.mutateAsync({ identifier, password });
      const { username, email, role, token } = result;
      const userData = { username, email, role };

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
