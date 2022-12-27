import React, { createContext,  useEffect,  useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Components/Header";
import Login from "./Seller/Auth/Login";
import Registration from "./Seller/Auth/Registration";
import NotFound from "./Components/NotFound";
import { Toaster } from "react-hot-toast";
// import Loader from "./Loader/Loader";
import PublicRouting from "./Seller/Auth/PublicRouting";
import ProtectedRouting from "./Seller/Auth/ProtectedRouting";
import getToken from "./Seller/Services/TokenService";
// import { getLoader } from "./Services/LoaderService";
import ResetPasswordModal from "./Seller/Auth/AuthOperation/ResetPasswordModal";
import MapRouting from "./MapRouting";
import MapRoutingCustomer from "./MapRoutingCustomer";
import getShopToken from "./Shopping/Services/TokenService";
// import Cookies from "universal-cookie";

const loginContext = createContext();
const shopLoginContext = createContext();
function App() {

  //  const [progress, setProgress] = useState(false || getLoader());
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
      <loginContext.Provider value={[live, setIsLive]} >
      <shopLoginContext.Provider value={[shopLive,setShopIsLive]} >
      <BrowserRouter>
        <Header />
        {/* {progress && <Loader />} */}
        <Routes>

          <Route>
              {customerRouteData.map((item,i)=>{
                return <Route path={item.path} element={item.element} />
              })}
          </Route>

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
    </div>
  );
}

export {loginContext,shopLoginContext}
export default App;