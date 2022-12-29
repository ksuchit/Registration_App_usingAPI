import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";

// import setLoader from "../Services/LoaderService";
import getToken, { removeToken } from "../Seller/Services/TokenService";
import getShopToken from "../Shopping/Services/TokenService";
const axiosInstance = axios.create({
  baseURL: `https://shop-api.ngminds.com/`,
  
})

  // axios.defaults.headers.common['Authorization']=`Bearer ${getToken()}`; 
  
  
  axiosInstance.interceptors.request.use((request) => {
     // spinning start to show
  // UPDATE: Add this code to show global loading indicator
  document.body.classList.add('loading-indicator');

    if(request.url.includes('shop/') || request.url.includes('customers')){
      console.log("shop",request);
      if(getShopToken()){
        
          request.headers = { Authorization: `Bearer ${getShopToken()}` }
        }
    }else{console.log("auth")
         if(getToken()){
          console.log(getToken());
        
          request.headers = { Authorization: `Bearer ${getToken()}` }
         
    }}

    console.log(request)
    // setLoader(true)
    {<Loader />}
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
       // spinning hide
  // UPDATE: Add this code to hide global loading indicator
  document.body.classList.remove('loading-indicator');
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