import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Delete } from '../Services/HttpService';
import getShopToken from '../Services/TokenService';

export default function UpdateProfileImgModal(props){
    const navigate = useNavigate();

    const formData = new FormData();

    const removeImg = () => {
        console.log('clicked remove btn')

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
              html: `You won't be able to revert Profile Pic!</p>`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes, delete it!",
              cancelButtonText: "No, cancel!",
              reverseButtons: true,
            })
            .then((result) => {
              if (result.isConfirmed) {
                Delete('/customers/profile-picture')
                  .then((response) => {
                    console.log(response);
                    swalWithBootstrapButtons.fire(
                      "Deleted!",
                      `Your Profile Pic has been deleted.`,
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
                  `Your Profile Pic is safe :)</p>`,
                  "error"
                );
              }
            });
    }

    const onSave=()=>{
      console.log('on save clicked')
      console.log(getShopToken())
      axios.post('https://shop-api.ngminds.com/customers/profile-picture',formData,
        {
          headers: {
        'Authorization': `Bearer ${getShopToken()}`,
        'Content-Type': 'multipart/form-data'
          }
        }
        
      )
      .then((response)=>{
        console.log(response)
        props.data.picture=response.data.picture
        props.setData(props.data)
        navigate('/update-profile')
        props.setShow(false)
      })
      .catch((error)=>{
        console.log(error)
      })

    }

    return (
    <>
      <Modal
        show={props.show}
        onHide={()=>props.setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Profile Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='d-flex gap-3'>
                <div>
                    <img
                    src={props.data.picture}
                    alt="menProfile-Logo"
                    style={{ display: "block", width: 100, height: 100 }}
                    ></img>

                    <div className='d-flex justify-content-center my-2'>
                        <button className='btn btn-danger btn-sm' onClick={removeImg}>Remove</button>         
                    </div>        
                </div>
                <div>
                  <label>Upload from Computer</label>          
                   <input type='file'
                        onChange={(e)=>formData.append('picture',e.target.files[0])}        
                            />         
                </div>        
            </div>
            <div className='d-flex justify-content-end'>
            <Button variant="secondary" className='mx-2' onClick={()=>props.setShow(false)}>
                Cancel
            </Button>
            <Button variant="primary" onClick={onSave}>Save</Button>
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
