import axios from "axios";

const axiosInstance = axios.create({
    baseURL:'http://127.0.0.1:8000/api/',
    headers:{
        Authorization:`Bearer ${localStorage.getItem('access')}`
    }
});


axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        if(error.response.status === 401){
            try{
                const refresh = localStorage.getItem('refresh')
                const res = await axios.post('http://127.0.0.1:8000/api/token/refresh/',{refresh});
                localStorage.setItem('access',res.data.access);
                error.config.headers['Authorization'] = `Bearer ${res.data.access}`
                return axiosInstance(error.config)
            } catch{
                window.location.href='/login';
            }
        }
        return Promise.reject(error);
    }
)



export default axiosInstance;