import axios from "axios";

export const getAllProvince = async()=>{
    try {
        // const province = await axios.get('http://localhost:9000/provinces');  
        const province = await axios.get('https://jagakota-backend.azurewebsites.net/provinces');  

        return province.data.data;
    } catch (error) {
        console.log(error);
        throw new Error(error.response.data.errors);
    }
};

export const getRegencyById = async(id)=>{
    try {
        // const userLogin = await axios.post('http://localhost:3000/api/auth/login', 
        // const regency = await axios.get(`https://jagakota-backend.azurewebsites.net/provinces/${id}/regencies`);  
        const regency = await axios.get(`http://localhost:9000/provinces/${id}/regencies`);  

        return regency.data.data;
    } catch (error) {
        console.log(error);
        
        throw new Error(error.response.data.errors);
    }
};



export const uploadLaporan = async(data, token)=>{
    try {
        // const response = await axios.post('https://jagakota-backend.azurewebsites.net/report', 
        const response = await axios.post('http://localhost:9000/report', 
            data, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        
        return response.data;
    } catch (error) {
        console.log(error.message);
        throw new Error(error.response.data.errors);
    }
}
