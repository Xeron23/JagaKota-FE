import { Link } from "react-router-dom";
import { useAuth } from "../context/Auth.jsx";


export default function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Welcome</p>
            <Link to="/profile">Go to Profile</Link>
            <br />
            <button onClick={logout}>Logout</button>
        </div>
    );
}