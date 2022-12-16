import axiosInstance from "../../Interceptor/Interceptor";


export default function Get(url){
    return axiosInstance.get(`${url}`)
}