import axios from "axios";

export const Login = async(identifier, password)=>{
    try {
        // const userLogin = await axios.post('https://jagakota-backend.azurewebsites.net/user/login', 
            const userLogin = await axios.post('http://localhost:9000/user/login', 
                {identifier,
                    password
                }
                ,{
                    withCredentials: true
                }
            );   

        return userLogin.data.data;
    } catch (error) {
        
        throw new Error(error.response.data.message);
    }
};


export const Register = async(data)=>{
    try {
        // const userRegister = await axios.post('https://jagakota-backend.azurewebsites.net/user/register', 
        const userRegister = await axios.post('http://localhost:9000/user/register', 
                {
                    username: data.username,
                    firstName: data.firstname,
                    lastName:data.lastname,
                    email:data.email,
                    password: data.password,
                    street: data.street,
                    phoneNumber: data['phone number'],
                    // latitude: data.latitude,
                    // longitude: data.longitude,
                    provinceId: data.province,
                    regencyId: data.regency
                },
                {
                    withCredentials: true
                }
        );

        return userRegister.data.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const Logout = async(token)=>{
    try {
        // const userLogout = await axios.post('https://jagakota-backend.azurewebsites.net/user/logout', 
        const userLogout = await axios.post('http://localhost:9000/user/logout', 
                {},
                {
                    withCredentials: true,
                    // headers: {
                    //     'authorization': `Bearer ${token}`
                    // }
                }
            );
        console.log(userLogout.data.data);
        return userLogout.data.data;
    } catch (error) {
        console.log(error);
        
        throw new Error(error.response.data.errors)
    }
};

export const Refresh = async()=>{
    try {
        // const refresh = await axios.post('https://jagakota-backend.azurewebsites.net/user/refreshToken',
        const refresh = await axios.post('http://localhost:9000/user/refreshToken',
            {},
            {
                withCredentials: true,
                // headers: {
                //     'authorization': `Bearer ${token}`
                // } q
            }
        );
        console.log('newToken: ',refresh.data.data.accessToken);
        
        console.log('success refresh token');
        
        return refresh.data.data.accessToken;
    } catch (error) {
        console.log('failed refresh token');
        throw new Error(error)
    }
};