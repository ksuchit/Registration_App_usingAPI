import React, { createContext,  useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Components/Header";
import Login from "./Auth/Login";
import MyProfile from "./Components/MyProfile";
import Registration from "./Auth/Registration";
import NotFound from "./Components/NotFound";
import { Toaster } from "react-hot-toast";
import Loader from "./Loader/Loader";
import PublicRouting from "./Auth/PublicRouting";
import ProtectedRouting from "./Auth/ProtectedRouting";
import getToken from "./Services/TokenService";
import UpdateCompany from "./CompanyDetails/CompanyPortal/UpdateCompany";
import { getLoader } from "./Services/LoaderService";
import ChangePasswordModal from "./CompanyDetails/CompanyPortal/ChangePasswordModal";
import ResetPasswordModal from "./Auth/AuthOperation/ResetPasswordModal";
import VerifyEmail from "./Auth/AuthOperation/VerifyEmail";
import MapRouting from "./MapRouting";
const loginContext = createContext();
function App() {

  //  const [progress, setProgress] = useState(false || getLoader());
  console.log(getToken())
  const [live, setIsLive] = useState(getToken() || null);
  const routesData = MapRouting();
  
  
  return (
    <div className="App">
      <loginContext.Provider value={[live,setIsLive]} >
      <BrowserRouter>
        <Header />
        {/* {progress && <Loader />} */}
        <Routes>

           {/* PublicRouting   */}
          <Route element={<PublicRouting />}>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/registration" element={<Registration />} />
              <Route path="/auth/reset-password" element={<ResetPasswordModal /> } />
          </Route>

          {/* ProtectedRouting */}
          <Route element={<ProtectedRouting />}>
              {routesData.map((item,i) => {
                return <Route path={item.path} element={item.element} key={i}/>
            })}
            {/* <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/" element={<Navigate to={"/my-profile"} />} />
            <Route path="/my-profile/companyInfo" element={<UpdateCompany />} />
            <Route path="/auth/change-password" element={< ChangePasswordModal />} />
            <Route path="/auth/verify-email" element={<VerifyEmail /> } /> */}
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
        </loginContext.Provider>
    </div>
  );
}

export {loginContext}
export default App;