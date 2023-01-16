import { useEffect, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Get, { Delete, Patch } from "../services/Http-Service";
import Address from "./Address";
import UpdateAddressModal from "./Update-Address-Modal";
import UpdateProfileImgModal from "./Update-Profile-Img-Modal";
import { BsThreeDotsVertical} from 'react-icons/bs'
import ImgCrop from "./ImgCropper/ImgCrop";

export default function UpdateProfile() {
    const [data, setData] = useState({})
    const [show, setShow] = useState(false);
    const [addressShow,setAddressShow]=useState(false);
    const [addAddressShow,setAddAddressShow]=useState(false);
    const [address, setAddress] = useState([]);
    const [showAddresses, setShowAddresses] = useState(false)
    const [img, setImg] = useState();
    const navigate = useNavigate();
    useEffect(() => {
    
        // axios get
          Get("/shop/auth/self")
            .then((response) => {
              console.log(response.data);
              setData(response.data);
              
            })
            .catch((err) => {
              console.log(err);
            });
        
        Get('/customers/address')
            .then((response) => {
                console.log(response)
                setAddress(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        
        
      }, [address.length]);
    
    const {
        register,
        handleSubmit,
    } = useForm(
        {
            defaultValues:{
                name: data.name,
                email:data.email
            }
        }
        )
    
    const onSubmit = (data) => {
        console.log(data)

        Patch('/customers/update-profile', data)
            .then((response) => {
                console.log(response)
                navigate('/profile')
            })
            .catch((error) => {
            console.log(error)
            })
    }

    const removeAddress = (id) => {
        console.log('remove add')

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
              html: `You won't be able to revert Address!</p>`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes, delete it!",
              cancelButtonText: "No, cancel!",
              reverseButtons: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                Delete(`/customers/address/${id}`)
                .then((response) => {
                    console.log(response)
                    setAddress((prev)=>prev.filter((item)=>item._id!==id))
                    swalWithBootstrapButtons.fire(
                      "Deleted!",
                      `Your Address has been deleted.`,
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
                  `Your Address is safe :)</p>`,
                  "error"
                );
              }
            });
        
    }

    const [updateAdd,setUpdateAddress]=useState({});
    const updateAddress = (item) => {
        console.log('update add')
        console.log(item)
        setUpdateAddress(item)
        setAddressShow(true)
        
    }

    const [defaultAddress,setDefaultAddress]=useState({})
    const onDefaultAddress = (item) => {
        console.log('on default addresss')
        setDefaultAddress(item)
    }

    return (
        <div>
            {showAddresses ?
                <button className="btn btn-secondary mx-2 mt-2"
                    onClick={() => setShowAddresses(false)}
                >Hide Address</button>
                :
                <button className="btn btn-secondary mx-2 mt-2"
                    onClick={() => setShowAddresses(true)}
                >Show Address</button>
            }
        <div className="d-flex my-2 justify-content-center gap-3" >
            <div className="d-flex flex-column justify-content-center">
                <div>
                    <img
                    src={data.picture}
                    alt="menProfile-Logo"
                    className="profile-img"
                    style={{ display: "block", width: 100, height: 100 }}
                    onClick={()=>setShow(true)}    
                    ></img>
                </div>
                 
            </div>
            <div>
                {
                data &&
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className='d-flex flex-column'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' defaultValue={data.name}
                            {...register('name',{required:true})}
                        />                   
                    </Form.Group>
                    <Form.Group className='d-flex flex-column'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' defaultValue={data.email}
                            {...register('email',{required:true})}
                        />                   
                    </Form.Group>
                    <Button type="submit" className="btn btn-secondary my-1"
                    >Save Changes</Button>
                </Form>   
                }        
            </div>
            <UpdateProfileImgModal
                show={show}
                setShow={setShow}
                data={data}
                setData={setData}    
            />
            </div>
            <div>
                <hr></hr>
                {
                    showAddresses ?
                        <div>
                            <div className="d-flex justify-content-center mb-2">
                                <button className="btn btn-secondary" onClick={()=>setAddAddressShow(true)}>Add Address</button>
                            </div>
                            <div className="d-flex gap-5 row">
                                {<ImgCrop setImg={setImg} />}
                                {img}
                                {address &&
                                    address.map((item, i) => {
                                        return (
                                            <div key={i} style={{ border: '1px solid black',borderRadius:'3%'}} className="p-2 col-3">
                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        <h6>{data.name}</h6>
                                                        <div>
                                                            {defaultAddress._id===item._id &&
                                                                <mark style={{backgroundColor:'grey'}}>Default</mark>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <Dropdown key={i}>
                                                            <Dropdown.Toggle
                                                                variant="dark">
                                                                <BsThreeDotsVertical />
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu align={{ sm: "end" }}>
                                                                <Dropdown.Item onClick={()=>onDefaultAddress(item)}>Set as Default</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => updateAddress(item)}>Update</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => removeAddress(item._id)} style={{color:'red'}}>Remove</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                                {/* <hr></hr> */}
                                                <p className="mb-0">{item.street} ,
                                                    {item.addressLine2}</p>
                                                <p className="mb-0">
                                                    {item.city}
                                                    -{item.pin}
                                                </p>
                                                <p>
                                                    {item.state}
                                                </p>
                                        
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    : ""
                }
                <Address
                    show={addAddressShow}
                    setShow={setAddAddressShow}
                    setAddress={setAddress}
                />
                {updateAdd && 
                <UpdateAddressModal 
                    show={addressShow}
                    setShow={setAddressShow}
                    updateAdd={updateAdd}
                    setAddress={setAddress}
                />}
            </div>
        </div>
    )
}