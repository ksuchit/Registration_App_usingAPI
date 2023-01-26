import React, { useContext, useEffect, useState } from "react";
import { GoVerified } from "react-icons/go";
import { MdMarkEmailRead, MdWork } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import toast from "react-hot-toast";
import { loginContext } from "../../../App";
import { EmailVerification, Get } from "../../services/Http-Service";

export default function MyProfile(props) {
  const [ ,setIsLive] = useContext(loginContext);
  const [data, setData] = useState({});
  
  
  useEffect(() => {
    
    // axios get
      Get("/auth/self")
        .then((response) => {
          console.log(response.data);
          setData(response.data);
          
        })
        .catch((err) => {
          toast.error(err.message);
          console.log(err);
          setIsLive(null)
        });
    
  }, []);
  console.log(data, "dataMyprofile");
 
  const verifyEmail = () => {
    console.log("email verification")

    EmailVerification('/auth/send-verification-email?captcha=false')
      .then((response) => {
        console.log(response)
        toast.success('check your email')
      })
      .catch((error) => {
        console.log(error)
    })
  }

  return (
    <div className="my-profile-container">
    <div className="d-flex flex-column my-profile">
        <>
          <h2 style={{color:'white',textAlign:'center'}}>MyProfile</h2>
          <hr style={{color:'white'}} size='10'/>
          <div className="d-flex justify-content-center">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
                alt="menProfile-Logo"
                className="profile-img"
                style={{ display: "block", width: 100, height: 100 }}
              ></img>
          </div>
          <>
            {data.isEmailVerified && (
              <span className="bg-success p-1 px-4 rounded text-white d-flex justify-content-center ">
                Verified <GoVerified className="mx-2 my-1" />{" "}
              </span>
              )                
              }
            { (data.isEmailVerified=== false && (<>
              <span className="bg-danger p-1 px-4 rounded text-white d-flex justify-content-center ">
                Not Verified <AiFillCloseCircle className="mx-2 my-1" />
              </span>
              <button onClick={verifyEmail}>Verify</button>
              </>))}
          </>
          <div className="p-2 my-2" style={{backgroundColor:'bisque',borderRadius:'2%'}}>
            <div className="d-flex">
              <h3>{data.name}</h3>
            </div>
            <div className="d-flex">
              <FaUserAlt size={23} />
              <h5>{data.role}</h5>
            </div>
            <div className="d-flex">
              <MdMarkEmailRead size={25} />
              <h6> {data.email}</h6>
            </div>
            <div className="d-flex">
              <MdWork size={25} /> <h6>{data._org?.name}</h6>
            </div>
          </div>
          
        </>
          
    </div>
</div>

  );
}
