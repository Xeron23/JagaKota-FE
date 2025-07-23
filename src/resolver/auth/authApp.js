import axios from "axios";

export const Login = async(username, password)=>{
    try {
        const userLogin = await axios.post('http://localhost:3000/api/auth/login', 
                {username, password}
                ,{
                    withCredentials: true
                }
            );  
        return userLogin.data.data;
    } catch (error) {
        throw new Error(error.response.data.errors);
    }
};


export const Register = async(data)=>{
    try {
        const userRegister = await axios.post('http://localhost:3000/api/auth/', 
                data,
                {
                    withCredentials: true
                }
        );
        return userRegister.data.data;
    } catch (error) {
        throw new Error(error.response.data.errors);
    }
};

export const Logout = async(token)=>{
    try {
            const userLogout = await axios.delete('http://localhost:3000/api/auth/logout', {
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            return userLogout.data.data;
    } catch (error) {
        console.log(error);
        
        throw new Error(error.response.data.errors)
    }
};

export const Refresh = async()=>{
    try {
        const refresh = await axios.post('http://localhost:3000/api/auth/refresh',
            {},
            {
                withCredentials: true,
            }
        );
        return refresh.data.accessToken;
    } catch (error) {
        throw new Error(error.response.data.errors)
    }
};