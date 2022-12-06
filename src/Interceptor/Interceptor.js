import axios from "axios";
import toast from "react-hot-toast";
import setLoader from "../Services/LoaderService";
import getToken, { removeToken } from "../Services/TokenService";

const axiosInstance = axios.create({
  baseURL: `https://shop-api.ngminds.com/`,
  
})

  // axios.defaults.headers.common['Authorization']=`Bearer ${getToken()}`; 
  
  axiosInstance.interceptors.request.use((request) => {

    request.headers['Authorization'] = `Bearer ${getToken()}`;
    console.log(request)
    // setLoader(true)
    return request;
  },
    ((err) => {
      return Promise.reject(err)
    })
  )

  axiosInstance.interceptors.response.use(
    (response) => {
      console.log(response)
      // setLoader(false)
      return response;
    },
    ((err) => {
      console.log(err)
      // setLoader(false)
      if (err.response.request.status === 401) {
        removeToken();
        // toast.success('LogOut Due to Token Expired')
      }
      return Promise.reject(err)
    })
  )

export default axiosInstance;