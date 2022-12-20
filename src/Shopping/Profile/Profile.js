import React, { useContext, useEffect, useState } from "react";
import { MdMarkEmailRead } from "react-icons/md";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Get, { Delete } from "../Services/HttpService";
import { shopLoginContext } from "../../App";
import Swal from "sweetalert2";

export default function Profile() {
  const navigate = useNavigate();
  const [,setShopIsLogin]=useContext(shopLoginContext)
  const [data, setData] = useState({});
  
  
  useEffect(() => {
    
    // axios get
      Get("/shop/auth/self")
        .then((response) => {
          console.log(response.data);
          setData(response.data);
          
        })
        .catch((err) => {
          toast.error(err.message);
          console.log(err);
          setShopIsLogin(null)
        });
    
  }, []);
  console.log(data, "dataMyprofile");
 
  const onDeleteAccount = () => {
    console.log('delete account clicked')

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        html: `You won't be able to revert Account!</p>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          Delete('/customers/account')
            .then((response) => {
              console.log(response);
              swalWithBootstrapButtons.fire(
                "Deleted!",
                `Your Account has been deleted.`,
                "success"
              );
              navigate("/profile");
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            `Your Account is safe :)</p>`,
            "error"
          );
        }
      });
  }

  return (
    <div className="my-profile-container">
    <div className="d-flex flex-column my-profile ">
        <>
          <h2 style={{color:'white',textAlign:'center'}}>MyProfile</h2>
          <hr style={{color:'white'}} size='10'/>
          <div className="d-flex justify-content-center">
            <img
                src={data.picture}
                alt="menProfile-Logo"
                className="profile-img"
                style={{ display: "block", width: 100, height: 100 }}
              ></img>
          </div>
         
          <div className="p-2 my-2" style={{backgroundColor:'bisque',borderRadius:'2%'}}>
            <div className="d-flex">
              <h3>{data.name}</h3>
            </div>
            
            <div className="d-flex">
              <MdMarkEmailRead size={25} />
              <h6> {data.email}</h6>
            </div>
            
          </div>
          
          <button className="btn btn-secondary"
            onClick={()=>navigate('/update-profile')}
          >Update</button>
          <button className="btn btn-danger my-1"
            onClick={()=>onDeleteAccount()}
          >Delete Account</button>
        </>
    </div>
</div>

  );
}
