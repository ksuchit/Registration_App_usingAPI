import React, { useContext } from 'react';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { BiHide, BiShow } from 'react-icons/bi';
import { NavLink, useNavigate } from 'react-router-dom';
import { shopLoginContext } from '../../App';
import { Post } from '../Services/HttpService';
import { setShopToken } from '../Services/TokenService';

export default function LoginModal(props){
    
    const navigate = useNavigate();
    const[,setShopIsLive]=useContext(shopLoginContext)
    const [showPassword,setShowPassword]=useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data)
        
        Post('/shop/auth/login', data)
            .then((response) => {
                console.log(response)
                setShopToken(response.data.token)
                setShopIsLive(response.data.token)
                localStorage.setItem('shopUserName', JSON.stringify(response.data.customer?.name))
                toast.success('Successfully Login')
                props.setShow(false)
                navigate('/home')
            })
            .catch((error) => {
            console.log(error)
        })
    }

    
    return (
    <>
      <Modal
        show={props.show}
        onHide={()=>props.setShow(false)}
        // backdrop="static"
        // keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
        <Form onSubmit={handleSubmit(onSubmit)}
            style={{ border: '3px solid grey',borderRadius:'3%' }} className="p-2">
            <Form.Group className="d-flex flex-column p-1">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter Email"
                    className="p-2"
                     {...register("email",{required:true , pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
                    />
                </Form.Group>
                {errors.email && <p style={{ color: "red" }}>email is Required</p>}
                <Form.Group className="d-flex flex-column p-1">
                    <Form.Label>Password</Form.Label>
                    <div className="position-relative">
                        <Form.Control placeholder="Enter Password" className="p-2"
                         type={showPassword ? 'text' : 'password'}
                        {...register("password",{required:true , minLength:8 })}
                        />
                    
                    <div className="position-absolute top-50 end-0" style={{marginTop:'-3%',marginRight:'2%'}}>
                        {showPassword ?<BiHide onClick={()=>setShowPassword(false)} size={20}/>
                        :<BiShow onClick={()=>setShowPassword(true)} size={20}/>
                        }
                    </div>
                    </div>
                </Form.Group>
                {errors.password?.type === 'required' && <p style={{ color: "red" }}>password is Required</p>}
                {errors.password?.type === 'minLength' && <p style={{ color: "red" }}>minimum 8 charachters Required</p>}
                
                <div className="d-flex flex-column">
                    <div className='d-flex justify-content-start'>
                        <Button type="submit" className="m-1 my-2 p-2" style={{backgroundColor:"rgb(1, 1, 10)",color:"white"}}>Submit</Button>
                    </div>      
                    <Form.Text className="mx-1">Not a member? <NavLink style={{ textDecoration: 'none' }} to='/auth/registration' >Register</NavLink></Form.Text>
                </div>
            </Form>
            
        </Modal.Body>
      </Modal>
    </>
  );
}
