import axiosInstance from "../../Interceptor/Interceptor";


export default function Get(url){
    return axiosInstance.get(`${url}`)
}

export function Post(url, data) {
    return axiosInstance.post(`${url}`,data)
}

export function Patch(url, data) {
    return axiosInstance.patch(`${url}`,data)
}

export function Delete(url) {
    return axiosInstance.delete(`${url}`)
}

export function Put(url, data) {
    return axiosInstance.put(`${url}`,data)
}