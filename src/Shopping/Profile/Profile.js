import React, { useContext, useEffect, useState } from "react";
import { MdMarkEmailRead } from "react-icons/md";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Get, { Delete } from "../services/Http-Service";
import { shopLoginContext } from "../../App";
import Swal from "sweetalert2";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {HiUserRemove} from 'react-icons/hi'

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
    <div>
    <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src={data.picture}
                    alt="Avatar" className="my-5" style={{ width: '130px',borderRadius:'50%' }} fluid />
                  <MDBTypography tag="h5">Suchit S. Kore</MDBTypography>
                  <MDBCardText>Web Designer</MDBCardText>
                  <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id="button-tooltip-2">Update Profile</Tooltip>}
                       >
                        {({ ref, ...triggerHandler }) => (
                            <span {...triggerHandler} ref={ref}><MDBIcon far icon="edit mb-5"  onClick={()=>navigate('/update-profile')} /></span>
                        )}
                  </OverlayTrigger>
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <div className="d-flex justify-content-between">
                      <MDBTypography tag="h6">Information</MDBTypography>
                      <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip id="button-tooltip-2">Delete Account</Tooltip>}
                       >
                        {({ ref, ...triggerHandler }) => (
                            <span {...triggerHandler} ref={ref}><HiUserRemove size={20} onClick={()=>onDeleteAccount()}/></span>
                        )}
                      </OverlayTrigger>
                  </div>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol className="mb-3">
                        <MDBTypography tag="h6">Name</MDBTypography>
                        <MDBCardText className="text-muted">{data.name}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBTypography tag="h6">More Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">{data.email}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">******5556</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <div className="d-flex justify-content-start">
                      <a href="#!"><MDBIcon fab icon="facebook me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="twitter me-3" size="lg" /></a>
                      <a href="#!"><MDBIcon fab icon="instagram me-3" size="lg" /></a>
                    </div>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
</div>
  );
}
