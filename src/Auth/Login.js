import React, {  useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import  { setToken } from "../Services/TokenService";
import securePost from "../Services/HttpService";
import toast from "react-hot-toast";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { loginContext } from "../App";
import { GoogleReCaptcha, GoogleReCaptchaProvider } from "react-google-recaptcha-v3";


export default function Login() {
    const [,setIsLive] = useContext(loginContext);
    const navigate = useNavigate();
    const[emailOrPasswordIsWrong,setEmailOrPasswordIsWrong]=useState(false);
    const [captchaToken, setCaptchaToken] = useState();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    
    const onSubmit = (data) => {
        delete data.checkBox
        data.captcha = captchaToken;
        //axios post
        securePost("/auth/login",data)
            .then((response) => {
                console.log(response)
                toast.success("Successfully Login !");
                //set to localStorage
                setToken(response.data.token)
                localStorage.setItem('userName',JSON.stringify(data.email))
                setIsLive(response.data.token)
                navigate('/my-profile')
            }
        )
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data.message);
                setToken(null)
                if (err.response.data.message === 'Incorrect email or password')
                setEmailOrPasswordIsWrong(true)
            }
        )
    }
    
    const changePwd=()=>{
        navigate('/auth/changePassword')
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
                    {...register("checkBox",{required:true})}            
                />
                <label className="form-check-label" for="defaultCheck1">
                    Keep me Logged In
                </label>
                </div>
                <GoogleReCaptchaProvider reCaptchaKey="6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI">
                    <GoogleReCaptcha onVerify={(token)=> setCaptchaToken(token)} />
                </GoogleReCaptchaProvider>
                </Form.Field>
                {errors.checkBox?.type === 'required' && <p style={{ color: "red" }}>captcha must selected</p>}
                <Button type="submit" className="m-1 p-2" style={{backgroundColor:"rgb(1, 1, 10)",color:"white"}}>Submit</Button>
                {
                    emailOrPasswordIsWrong ? <Button onClick={changePwd}>forget password</Button> : ""
                    
                }
            <p>Not a member? <NavLink style={{ textDecoration: 'none' }} to='/auth/registration' >Register</NavLink></p>
                
            </Form>
            
        </div>
    )
}