import React, {  useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import  { setToken } from "../Services/TokenService";
import securePost  from "../Services/HttpService";
import toast from "react-hot-toast";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { loginContext } from "../App";
import {FcGoogle} from 'react-icons/fc'
import {BsLinkedin} from 'react-icons/bs'
import {BsGithub} from 'react-icons/bs'

export default function Login() {
    const [, setIsLive] = useContext(loginContext);
    const navigate = useNavigate();
    const [captchaToken, setCaptchaToken] = useState();
    
    const {
        register,
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
   
    
    console.log(captchaToken)
    localStorage.setItem('captchaToken',JSON.stringify(captchaToken))

    const onSubmit = (data) => {
        delete data.checkBox
        data.captcha = captchaToken;
        console.log(data)
        //axios post
        securePost("/auth/login",data)
            .then((response) => {
                console.log(response)
                toast.success("Successfully Login !");
                //set to localStorage
                setToken(response.data.token)
                localStorage.setItem('userName', JSON.stringify(data.email))
                setIsLive(response.data.token)
                navigate('/my-profile')
            }
        )
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data.message);
                setToken(null)
                getCaptcha();
               
            }
        )
    }
    
  
    return (
        <div className="loginPage w-25 h-auto p-2">
            <h1>Login</h1>
            <hr />
            <Form onSubmit={handleSubmit(onSubmit)} className="reg-form  h-auto p-2">
            <Form.Field className="d-flex flex-column p-1">
                    <label>Email</label>
                    <input type="text" placeholder="Enter Email"
                    className="p-2"
                     {...register("email",{required:true , pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
                    />
                </Form.Field>
                {errors.email && <p style={{ color: "red" }}>email is Required</p>}
                <Form.Field className="d-flex flex-column p-1">
                    <label>Password</label>
                    <input type="password" placeholder="Enter Password"
                    className="p-2"
                    {...register("password",{required:true , minLength:8 })}
                    />
                </Form.Field>
                {errors.password?.type === 'required' && <p style={{ color: "red" }}>password is Required</p>}
                {errors.password?.type === 'minLength' && <p style={{ color: "red" }}>minimum 8 charachters Required</p>}
                <Form.Field className="p-1">

                <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"
                        onClick={getCaptcha}
                            {...register("checkBox", { required: true} )}            
                />
                <label className="form-check-label">
                    Keep me Logged In
                </label>
                </div>
                
                </Form.Field>
                {errors.checkBox?.type === 'required' && <p style={{ color: "red" }}>captcha must selected</p>}
                <div className="d-flex flex-column">
                    <NavLink  style={{textDecoration:'none'}} to='/auth/forgot-password' ><button className=" mx-1 btn btn-sm btn-primary float-right">forgot password</button></NavLink>
                    <Button type="submit" className="m-1 my-2 p-2" style={{backgroundColor:"rgb(1, 1, 10)",color:"white"}}>Submit</Button>
                    <p className="mx-1">Not a member? <NavLink style={{ textDecoration: 'none' }} to='/auth/registration' >Register</NavLink></p>
                </div>
            </Form>
            <div className="p-1">
                <NavLink to='https://accounts.google.com/signin/v2/challenge/pwd?rart=ANgoxcdbbNxH1nYXChBQ7n_DhSet9sRm1XXzUFTdrodQQJThJv3oPCktvjFuZq-YDK8WsXHW_gXYeU7G-XB1iBPG0qMJAeBgcA&TL=ADFpJfPKW-hzwAGpLtv3pl4oTpyv-P64Yzte0beTkmC8V9Z0ePTBQMyECB8bOlqN&flowName=GlifWebSignIn&cid=1&flowEntry=ServiceLogin'>
                    <FcGoogle size={30} className='m-2' /></NavLink>
                <NavLink to='https://in.linkedin.com/?src=go-pa&trk=sem-ga_campid.14650114788_asid.127961666300_crid.601257986830_kw.linkedin%20log%20in_d.c_tid.kwd-310359770384_n.g_mt.e_geo.9062088&mcid=6844056167778418689&cid=&gclid=Cj0KCQiA1ZGcBhCoARIsAGQ0kkr2iaiQL42rVDQKQDahBw6MtzcsIBuGZknCk8CIT0W4QJ3MoJ8neTIaAg2rEALw_wcB&gclsrc=aw.ds'>
                    <BsLinkedin size={30} className='m-2' /></NavLink>
                <NavLink to='https://github.com/login'><BsGithub size={35} className='m-2' /></NavLink>
            </div>
        </div>
    )
}