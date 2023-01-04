import React, { useState } from "react";
import {useForm} from "react-hook-form"
import { NavLink, useNavigate } from "react-router-dom";
import Post  from "../services/Http-Service";
import toast from "react-hot-toast";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

export default function Registration() {
    const navigate = useNavigate();
    const [isEmailRegistered, setIsEmailRegistered] = useState(false);
    const [captchaToken, setCaptchaToken] = useState();
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    const getCaptcha = () => {
        
        window.grecaptcha.ready(function() {
        window.grecaptcha.execute('6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI', { action: 'submit' })
                .then(function (token) {
                    console.log(token)
                    setCaptchaToken(token);
            });
          });
    }
   
    const onSubmit = (data) => {
        delete data.Rpassword;
        delete data.checkBox;
        data.captcha = captchaToken;
        //axios post
        Post("/auth/register",data)
            .then((response) => {
                console.log(response)
                toast.success('Successfully Registered')
                console.log(response.data?.token)
                // callPost(response.data?.token);
                navigate('/seller/auth/login');
            }
        )
            .catch((err) => {
                console.log(err)
                toast.error(err.response.data.message)
                if (err.response.data.message === 'There is already an account with this email address') {
                    setIsEmailRegistered(true)
                }
        })
        
        // }
        console.log(data)

    }

    const callPost = (token) => {
        //  Post method is called
        axios.post('https://shop-api.ngminds.com/auth/send-verification-email?captcha=false',
        {
            headers: {
                'Authorization': `Bearer${token}`
            }
        })
    .then((response)=>{
        console.log(response)
    })
    .catch((error)=>{
        console.log(error)
        getCaptcha();
    })

    }

    return (
        <div className="registration-container">
        <div className="registration ">
            <Form onSubmit={handleSubmit(onSubmit)} className="reg-form  h-auto p-2">
                <h2>Registration</h2>
                <hr/>
                <Form.Group className="d-flex flex-column p-1">
                    <Form.Label className="fw-bolder">Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Full Name"
                    className="p-2"
                    {...register("name",{required:true})}
                    />
                </Form.Group>
                { errors.name && <p style={{color: "red"}}>user name is Required</p>}
                <Form.Group className="d-flex flex-column p-1">
                    <Form.Label className="fw-bolder">Company Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Company Name"
                    className="p-2"
                    { ...register("company",{required:true})}                    
                    />
                </Form.Group>
                { errors.company && <p style={{color: "red"}}>company name is Required</p>}
                <Form.Group className="d-flex flex-column p-1">
                    <Form.Label className="fw-bolder">Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter Email" 
                    className="p-2"
                        {...register("email",
                            {
                                required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                onChange:()=> setIsEmailRegistered(false)
                            })}
                    />
                </Form.Group>
                {errors.email && <p style={{ color: "red" }}>email is Required</p>}
                {isEmailRegistered ? <p style={{ color: "red" }}>user email is alredy exist</p> : ""}
                <Form.Group className="d-flex flex-column p-1">
                    <Form.Label className="fw-bolder">Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password"
                    className="p-2"
                    {...register("password",{required:true , minLength:8 })}
                    />
                </Form.Group>
                {errors.password?.type === 'required' && <p style={{ color: "red" }}>password is Required</p>}
                {errors.password?.type==='minLength' && <p style={{ color: "red" }}>minimum 8 charachters Required</p>}
                
                <Form.Group className="d-flex flex-column p-1">
                    <Form.Label className="fw-bolder">Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password"
                    className="p-2"
                        {...register("Rpassword", {
                             minLength: 8,
                            validate: (val) => {
                                if (watch('password') !== val) {
                                    return "Your passwords do no match";
                                }
                              },
                        })}
                    />
                </Form.Group>
                {errors.Rpassword && <p style={{ color: "red" }}>Your passwords do no match</p>}
                
                {/* captcha */}
                <Form.Group className="p-1">
                <div className="form-check">
                        <Form.Control className="form-check-Form.Control" type="checkbox" value="" id="defaultCheck1"
                        onClick={getCaptcha}
                    {...register('checkBox',{required:true})}          
                />
                <Form.Label className="form-check-Form.Label" >
                    Keep me Logged In
                </Form.Label>
                </div>
                    
                
                </Form.Group>
                {errors.checkBox?.type === 'required' && <p style={{color: "red"}}>checkBox must selected </p>}
                <Button type="submit" className="m-1 p-2" style={{backgroundColor:"rgb(1, 1, 10)",color:"white"}}>Submit</Button>
            </Form>
            <NavLink style={{ textDecoration: 'none' }} to='/seller/auth/login' >Already have an account? </NavLink>
        </div>
    </div>
    )
}