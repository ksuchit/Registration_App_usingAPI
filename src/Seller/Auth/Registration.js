import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import {useForm} from "react-hook-form"
import { NavLink, useNavigate } from "react-router-dom";
import Post  from "../Services/HttpService";
import toast from "react-hot-toast";
import axios from "axios";

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
                <Form.Field className="d-flex flex-column p-1">
                    <label className="fw-bolder">Full Name</label>
                    <input type="text" placeholder="Enter Full Name"
                    className="p-2"
                    {...register("name",{required:true})}
                    />
                </Form.Field>
                { errors.name && <p style={{color: "red"}}>user name is Required</p>}
                <Form.Field className="d-flex flex-column p-1">
                    <label className="fw-bolder">Company Name</label>
                    <input type="text" placeholder="Enter Company Name"
                    className="p-2"
                    { ...register("company",{required:true})}                    
                    />
                </Form.Field>
                { errors.company && <p style={{color: "red"}}>company name is Required</p>}
                <Form.Field className="d-flex flex-column p-1">
                    <label className="fw-bolder">Email</label>
                    <input type="text" placeholder="Enter Email" 
                    className="p-2"
                        {...register("email",
                            {
                                required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                onChange:()=> setIsEmailRegistered(false)
                            })}
                    />
                </Form.Field>
                {errors.email && <p style={{ color: "red" }}>email is Required</p>}
                {isEmailRegistered ? <p style={{ color: "red" }}>user email is alredy exist</p> : ""}
                <Form.Field className="d-flex flex-column p-1">
                    <label className="fw-bolder">Password</label>
                    <input type="password" placeholder="Enter Password"
                    className="p-2"
                    {...register("password",{required:true , minLength:8 })}
                    />
                </Form.Field>
                {errors.password?.type === 'required' && <p style={{ color: "red" }}>password is Required</p>}
                {errors.password?.type==='minLength' && <p style={{ color: "red" }}>minimum 8 charachters Required</p>}
                
                <Form.Field className="d-flex flex-column p-1">
                    <label className="fw-bolder">Confirm Password</label>
                    <input type="password" placeholder="Enter Password"
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
                </Form.Field>
                {errors.Rpassword && <p style={{ color: "red" }}>Your passwords do no match</p>}
                
                {/* captcha */}
                <Form.Field className="p-1">
                <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"
                        onClick={getCaptcha}
                    {...register('checkBox',{required:true})}          
                />
                <label className="form-check-label" >
                    Keep me Logged In
                </label>
                </div>
                    
                
                </Form.Field>
                {errors.checkBox?.type === 'required' && <p style={{color: "red"}}>checkBox must selected </p>}
                <Button type="submit" className="m-1 p-2" style={{backgroundColor:"rgb(1, 1, 10)",color:"white"}}>Submit</Button>
            </Form>
            <NavLink style={{ textDecoration: 'none' }} to='/seller/auth/login' >Already have an account? </NavLink>
        </div>
    </div>
    )
}