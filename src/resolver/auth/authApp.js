import axios from "axios";

const api = import.meta.env.VITE_API_BASE_URL;
export const Login = async (username, password) => {
  try {
    const userLogin = await axios.post(`${api}/user/login`,
      { username, password }
      , {
        withCredentials: true
      }
    );
    return userLogin.data.data;
  } catch (error) {

    throw new Error(error.response.data.message);
  }
};


export const Register = async (data) => {
  console.log(data)
  try {
    const userRegister = await axios.post(`${api}/user/register`,
      data,
      {
        withCredentials: true
      }
    );
    console.log(userRegister);
    return userRegister.data.data;

  } catch (error) {
    console.log(error.response.data.errors);
    throw new Error(error.response.data.message);
  }
};

export const Logout = async (token) => {
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

export const Refresh = async () => {
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
    console.log('newToken: ', refresh.data.data.accessToken);

    console.log('success refresh token');

    return refresh.data.data.accessToken;
  } catch (error) {
    console.log('failed refresh token');
    throw new Error(error)
  }
};