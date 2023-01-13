import axios from 'axios';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Delete } from '../services/Http-Service';
import getShopToken from '../services/Token-Service';
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Form } from 'react-bootstrap';

export default function UpdateProfileImgModal(props) {
  const [srcImg, setSrcImg] = useState();
  const [image, setImage] = useState();
  const [crop, setCrop] = useState({aspect: 16 / 9});
  const [result, setResult] = useState();

  const navigate = useNavigate();

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

  const onSave = () => {
    console.log('on save clicked')
    console.log(getShopToken())
    console.log(result);
    // axios.post('https://shop-api.ngminds.com/customers/profile-picture', formData,
    //   {
    //     headers: {
    //       'Authorization': `Bearer ${getShopToken()}`,
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   }
        
    // )
    //   .then((response) => {
    //     console.log(response)
    //     props.data.picture = response.data.picture
    //     props.setData(props.data)
    //     navigate('/update-profile')
    //     props.setShow(false)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })

  }

  const handleImage = async (event) => {
    setSrcImg(URL.createObjectURL(event.target.files[0]));
    console.log(event.target.files[0]);
};

  const getCroppedImg = async () => {
    // try {
        const canvas = document.createElement("canvas");
        const scaleX = srcImg.naturalWidth / srcImg.width;
        const scaleY = srcImg.naturalHeight / srcImg.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
            srcImg,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        const base64Image = canvas.toDataURL("image/jpeg", 1);
        setResult(base64Image);
        console.log(result);
    // } catch (e) {
    //     console.log("crop the image");
    // }
    console.log(crop)
};

const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(result);
}

  return (
    <>
      <Modal
        show={props.show}
        onHide={() => props.setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Profile Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className='d-flex flex-column'>
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
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Select Image you want to crop</Form.Label>
                    <div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                        />
                    </div>
                    <div>
                        {srcImg && 
                            <div>
                                <ReactCrop
                                    style={{maxWidth: "50%"}}
                                    src={srcImg}
                                    onImageLoaded={setImage}
                                    crop={crop}
                                    onChange={c =>setCrop(c)}
                                  > 
                                   <img src={srcImg} alt='oewfj'/>
                                  </ReactCrop>
                                <Button className="cropButton" onClick={getCroppedImg}
                                >
                                    crop
                                </Button>
                            </div>
                        }
                        {result && (
                            <div>
                                <img src={result} alt="cropped"/>
                            </div>
                        )}
                    </div>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
