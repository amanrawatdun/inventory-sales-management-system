import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});


api.interceptors.request.use((data)=>{
    const token= localStorage.getItem('token');
    if(token){
        data.headers.Authorization=`Bearer ${token}`;
    }
    return data;
})

export default api;
