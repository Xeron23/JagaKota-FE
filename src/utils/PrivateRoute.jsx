import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth.jsx";
import Spinner from "../components/loader.jsx";

export default function PrivateRoute() {
    const { isAuth, isChecking } = useAuth();
    if (isChecking) return (<Spinner/>);
    
    return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}