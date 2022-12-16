import React, {  useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import  { setToken } from "../Services/TokenService";
import Post  from "../Services/HttpService";
import toast from "react-hot-toast";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { loginContext } from "../../App";
import ForgetPasswordModal from "./AuthOperation/ForgetPasswordModal";
import LoginViaGoogle from "./SocialLogin/LoginViaGoogle";
import LoginViaFacebook from "./SocialLogin/LoginViaFacebook";
import {BiShow,BiHide} from 'react-icons/bi'

export default function Login() {
    const [, setIsLive] = useContext(loginContext);
    const navigate = useNavigate();
    const [captchaToken, setCaptchaToken] = useState();
    const [show, setShow] = useState(false);
    const [showPassword,setShowPassword]=useState(false);

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
        Post("/auth/login",data)
            .then((response) => {
                console.log(response)
                toast.success("Successfully Login !");
                //set to localStorage
                setToken(response.data.token)
                localStorage.setItem('userName', JSON.stringify(response.data.user?.name))
                setIsLive(response.data.token)
                navigate('/seller/my-profile')
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
    const forgotPass = () => {
        console.log("forget")
        setShow(true)
    }
  
    return (
        <div className="loginContainer">
        <div className="loginPage w-25 h-auto p-2">
            {/* <h2>Login</h2>
            <hr /> */}
            <Form onSubmit={handleSubmit(onSubmit)} className="reg-form h-auto p-2">
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
                    <input placeholder="Enter Password" className="p-2"
                    //  {showPassword ? type='text' : type='password'}
                    {...register("password",{required:true , minLength:8 })}
                    />
                    {showPassword ?<BiHide onClick={()=>setShowPassword(false)}/>
                    :<BiShow onClick={()=>setShowPassword(true)}/>
                    }
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
                
                <button type="button" className="m-1 btn btn-sm btn-secondary float-right" onClick={forgotPass}>forget Password</button>
                <div className="d-flex flex-column">
                    {/* <NavLink style={{ textDecoration: 'none' }} to='/auth/forgot-password' ><button className=" mx-1 btn btn-sm btn-primary float-right">forgot password</button></NavLink> */}
                    <Button type="submit" className="m-1 my-2 p-2" style={{backgroundColor:"rgb(1, 1, 10)",color:"white"}}>Submit</Button>
                    <p className="mx-1">Not a member? <NavLink style={{ textDecoration: 'none' }} to='/seller/auth/registration' >Register</NavLink></p>
                </div>
            </Form>
            <div>
                <ForgetPasswordModal
                    show={show}
                    setShow={setShow}
                />
            </div>
            
            <div>
                <LoginViaGoogle />
                <LoginViaFacebook />
            </div>

            </div>
        </div>
            
    )
}