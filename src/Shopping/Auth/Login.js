import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Post } from "../Services/HttpService";
import { setShopToken } from "../Services/TokenService";
import { shopLoginContext } from "../../App";
import { Button, Form } from "react-bootstrap";

export default function Login() {
    const navigate = useNavigate();
    const[,setShopIsLive]=useContext(shopLoginContext)
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
                navigate('/home')
            })
            .catch((error) => {
            console.log(error)
        })
    }

    const forgotPassword = () => {
        console.log('forgot password clicked')
        navigate('/home')
    }
    return (
        <div className="loginContainer">
        <div className="loginPage w-25 h-auto p-2">
            {/* <h2>Login</h2>
            <hr /> */}
            <Form onSubmit={handleSubmit(onSubmit)} className="reg-form h-auto p-2">
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
                    <Form.Control placeholder="Enter Password" className="p-2"
                        type='password'
                    {...register("password",{required:true , minLength:8 })}
                    />
                </Form.Group>
                {errors.password?.type === 'required' && <p style={{ color: "red" }}>password is Required</p>}
                {errors.password?.type === 'minLength' && <p style={{ color: "red" }}>minimum 8 charachters Required</p>}
                <div className="d-flex justify-content-end">
                    <NavLink style={{ textDecoration: 'none' }} onClick={forgotPassword}>forget Password?</NavLink>
                </div>
                <div className="d-flex flex-column">
                    {/* <NavLink style={{ textDecoration: 'none' }} to='/auth/forgot-password' ><button className=" mx-1 btn btn-sm btn-primary float-right">forgot password</button></NavLink> */}
                    <Button type="submit" className="m-1 my-2 p-2" style={{backgroundColor:"rgb(1, 1, 10)",color:"white"}}>Submit</Button>
                    <p className="mx-1">Not a member? <NavLink style={{ textDecoration: 'none' }} to='/auth/registration' >Register</NavLink></p>
                </div>
            </Form>
            </div>
        </div>
            
    )
}