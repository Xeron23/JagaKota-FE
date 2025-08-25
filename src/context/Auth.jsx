// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Login, Logout, Refresh, Register } from "../resolver/auth/authApp.js";
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const [user, setUser] = useState("");
    const token =  JSON.parse(localStorage.getItem("user"));
    
    useEffect(() => {
        
        const checkAuth = async()=>{
            try {
                let user =  JSON.parse( localStorage.getItem('user')); 
                if (user) {
                    const data = jwtDecode(user.token);

                    const now = Date.now() /1000;
                    const bufferTime = 60;
                    console.log('now: ', now);
                    console.log('exp: ', data.exp);
                    
                    if(data.exp <= now){
                        console.log('token expired, refresh token');
                        const token = await Refresh();
                        localStorage.setItem('user', JSON.stringify({
                            user: user.user,
                            token: token
                        }))
                        
                        // localStorage.removeItem("user");
                    }
                    
                    setIsAuth(true);
                    setUser(user.user);
                    // window.location.href = "/dashboard";
                }
            } catch (error) {
                alert(error.message);
                // auto redirecr when gagal
                localStorage.removeItem("user");
                setIsAuth(false);
                setUser(null);
            }
            
            setIsChecking(false);
        }
        checkAuth();
    }, []);

    const login = async (identifier, password) => {
        try {
            // hit api (/user/login)
            let userLogin = await Login(identifier, password);
            userLogin.user = jwtDecode(userLogin.token);
            console.log(userLogin);
            
            localStorage.setItem('user', JSON.stringify(userLogin))


            setIsAuth(true);
            setUser(userLogin.user);
            return {
                success: true,
                data: userLogin.user
            }
        } catch (err) {
            return {
                success: false,
                error: err.message
            }
        }
    };


    const register = async(data) =>{
        try {
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
            const user = await Logout(token.token);

            if(user== 'Logout successful.'){
                localStorage.removeItem("user");
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
