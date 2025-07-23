// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Login, Logout, Refresh, Register } from "../resolver/auth/authApp.js";
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const [user, setUser] = useState("");
    const token = localStorage.getItem("token");
    
    useEffect(() => {
        const checkAuth = async()=>{
            try {
                let token = localStorage.getItem('token')
                if (token) {
                    const data = jwtDecode(token);
                    const now = Date.now() /1000;
                    if(data.exp >= now){
                        localStorage.removeItem("token");
                        token = await Refresh();
                        localStorage.setItem('token', token)
                    }
                    setIsAuth(true);
                    setUser(token)
                }
            } catch (error) {
                alert(error.message)
                // auto redirecr when gagal
                window.location.href = "/login";
            }
            
            setIsChecking(false);
        }
        checkAuth();
    }, []);

    const login = async (username, password) => {
        try {
            // hit api (/user/login)
            const userLogin = await Login(username, password);
            localStorage.setItem('token', userLogin.accessToken)

            setIsAuth(true);
            setUser(userLogin.data.name);
            return {
                success: true,
                data: userLogin
            }
        } catch (err) {
            return {
                success: false,
                error: err.message
            }
        }
    };


    const register = async({username, name, password}) =>{
        try {
            const data = {username, name, password};
            const userRegis = await Register(data)
            return {
                success: true,
                data: userRegis
            };

        } catch (error) {
            // console.log("test err: ", error.message);
            return {
                success: false,
                error: error.message
            }
        }
    }

    const logout = async () => {
        try {
            
            const user = await Logout(token);
            
            if(user== 'ok'){
                localStorage.removeItem("token");
                setIsAuth(false);
                setUser(null);
            }
        } catch (error) {
            return {
                success: false,
                error: error.message
            }
        }
    };

    return (
        <AuthContext.Provider value={{ isAuth, isChecking, user, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    );
}

// use this for get 
export const useAuth = () => {
    return useContext(AuthContext);
}; 
