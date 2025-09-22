import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth.jsx";
import Spinner from "../components/loader.jsx";

export default function PrivateRoute({ allowedRoles }) {
  const { isAuth, isChecking, user } = useAuth();
  if (isChecking) return <Spinner />;
  if(!isAuth){
      return <Navigate to="/login" replace />;
  }


  
  if (!allowedRoles.includes(user['role'])) {
    // Kalau role tidak sesuai, redirect ke dashboard default role dia
    return user.role === "ADMIN"
      ? <Navigate to="/admin/dashboard" replace />
      : <Navigate to="/" replace />;
  }

  return <Outlet />;
}
