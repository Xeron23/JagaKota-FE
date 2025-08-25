import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/Auth";

import Spinner from "../components/Loader.jsx";

export default function AdminAccess() {
  const { isAuth, isChecking, user } = useAuth();
  console.log(user);

  if (isChecking) return <Spinner />;

  return !isAuth || user.role !== "ADMIN" ? (
    <Navigate to="/dashboard" />
  ) : (
    <Outlet />
  );
}
