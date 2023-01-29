import React, { createContext,  lazy,  useEffect,  useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
// import Loader from "./Loader/Loader";
import PublicRouting from "./Seller/Auth/Public-Routing";
import ProtectedRouting from "./Seller/Auth/Protected-Routing";
import getToken from "./Seller/services/Token-Service";
import MapRouting from "./Map-Routing";
import MapRoutingCustomer from "./Map-Routing-Customer";
import getShopToken from "./Shopping/services/Token-Service";
import { Suspense } from "react";
import PublicRoutingShop from "./Shopping/Auth/Public-Routing-Shop";
import ProtectedRoutingShop from "./Shopping/Auth/Protected-Routing-Shop";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import Cookies from "universal-cookie";

const Login=lazy(()=>import('./Seller/Auth/Login'))
const Registration=lazy(()=>import('./Seller/Auth/Registration'))
const ResetPasswordModal=lazy(()=>import('./Seller/Auth/auth-Operation/Reset-Password-Modal'))
const NotFound=lazy(()=>import('./components/Not-Found'))
const loginContext = createContext();
const shopLoginContext = createContext();
function App() {

  // const [progress, setProgress] = useState(false);
 
  console.log(getToken())
  const [live, setIsLive] = useState(getToken() || null);
  const [shopLive,setShopIsLive]=useState(getShopToken() || null)
  const routesData = MapRouting();
  const customerRouteData = MapRoutingCustomer();
  // const cookies = new Cookies();
  // useEffect(() => {
  //   window.addEventListener('beforeunload', cookies.remove('registered'))
  //   return () => {
  //     window.removeEventListener('beforeunload')
  //   }
  // }, [])
  
 
  return (
    <div className="App">
      <Suspense fallback={<button class="btn btn-primary" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Loading...
        </button>}
      >
      <loginContext.Provider value={[live, setIsLive]} >
      <shopLoginContext.Provider value={[shopLive,setShopIsLive]} >
      <BrowserRouter>
        <Header />
        {/* {progress && <Loader />} */}
        <Routes>

         
          <Route element={<PublicRoutingShop />}>
            {customerRouteData?.public.map((item,i)=>{
              return <Route path={item.path} element={item.element} key={i} />
            })}
          </Route>
          <Route element={<ProtectedRoutingShop />}>
            {customerRouteData?.protected.map((item,i)=>{
              return <Route path={item.path} element={item.element} key={i} />
            })}
          </Route>
         {customerRouteData.global.map((item,i)=>{
          return <Route path={item.path} element={item.element} key={i}/>
         })}
          {/* {customerRouteData.map((item, i) => {
            return <Route path={item.path} element={item.element} key={i} />
          })} */}
                
           {/* PublicRouting   */}
          <Route element={<PublicRouting />}>
            <Route path="/seller/auth/login" element={<Login />} />
            <Route path="/seller/auth/registration" element={<Registration />} />
            <Route path="/seller/auth/reset-password" element={<ResetPasswordModal /> } />
          </Route>
          {/* ProtectedRouting */}
          <Route element={<ProtectedRouting />}>
              {routesData.map((item,i) => {
                return <Route path={item.path} element={item.element} key={i}/>
            })}
          </Route>
          
          <Route path="*" element={<NotFound />} />
          </Routes>
          
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      </shopLoginContext.Provider>    
      </loginContext.Provider>
      </Suspense>
    </div>
  );
}

export {loginContext,shopLoginContext}
export default App;