import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { Button, Form } from "semantic-ui-react"
import Get, { Delete, Patch, Put } from "../Services/HttpService";
import Address from "./Address";
import UpdateAddressModal from "./UpdateAddressModal";
import UpdateProfileImgModal from "./UpdateProfileImgModal";

export default function UpdateProfile() {
    const [data, setData] = useState({})
    const [show, setShow] = useState(false);
    const [addressShow,setAddressShow]=useState(false);
    const [address, setAddress] = useState([]);
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
        
        
      }, []);
    
    
    const {
        register,
        handleSubmit,
        resetField,
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

        Delete(`/customers/address/${id}`)
            .then((response) => {
            console.log(response)
            })
            .catch((error) => {
            console.log(error)
        })
    }

    const [updateAdd,setUpdateAddress]=useState();
    const updateAddress = (item) => {
        console.log('update add')
        console.log(item)
        setUpdateAddress(item)
        setAddressShow(true)
        
    }
    return (
        <div>
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
                    <Form.Field className='d-flex flex-column'>
                        <label>Name</label>
                        <input type='text' defaultValue={data.name}
                            {...register('name',{required:true})}
                        />                   
                    </Form.Field>
                    <Form.Field className='d-flex flex-column'>
                        <label>Email</label>
                        <input type='email' defaultValue={data.email}
                            {...register('email',{required:true})}
                        />                   
                    </Form.Field>
                    <Button type="submit" className="m-1 p-2"
                                style={{ backgroundColor: "rgb(1, 1, 10)", color: "white" }}
                    >Save Changes</Button>
                            
                </Form>   
                }        
            </div>
            <UpdateProfileImgModal
                show={show}
                setShow={setShow}
                url={data.picture}
            />
            </div>
            <div>
                <hr></hr>
                <div className="d-flex gap-3">
                
                {address && 
                        address.map((item, i) => {
                            return (
                                <div key={i} style={{border:'1px solid black'}} className="p-2">
                                    <p>Street:{item.street}</p>
                                    <p>addressLine2:{item.addressLine2}</p>
                                    <p>state:{item.state}</p>
                                    <p>city:{item.city}</p>
                                    <p>pin:{item.pin}</p>
                                    <div className="d-flex justify-content-center">
                                        <button className="btn btn-danger btn-sm"
                                            onClick={()=>removeAddress(item._id)}
                                        >Remove</button>
                                        <button className="btn btn-info btn-sm mx-1"
                                            onClick={()=>updateAddress(item)}
                                        >update</button>

                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <Address />
                {/* <div className="d-flex justify-content-center">
                    <button className="btn btn-secondary ">Add</button>
                </div> */}
                {updateAdd && 
                <UpdateAddressModal 
                    show={addressShow}
                    setShow={setAddressShow}
                    updateAdd={updateAdd}
                />}
            </div>
        </div>
    )
}