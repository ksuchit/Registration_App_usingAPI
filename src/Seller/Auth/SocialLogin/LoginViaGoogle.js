import { GoogleLogin } from "@react-oauth/google";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../../../App";
import Post from "../../Services/HttpService";
import { setToken } from "../../Services/TokenService";

// const clientId = '976464159587-o17tlgqossa884u4otgp4qfd2balbv4m.apps.googleusercontent.com'

export default function LoginViaGoogle() {
    const navigate = useNavigate();
    const [, setIsLive] = useContext(loginContext);

    const [captchaToken, setCaptchaToken] = useState();

    // useEffect(() => {
    //     window.grecaptcha.ready(function() {
    //         window.grecaptcha.execute('6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI', { action: 'submit' })
    //                 .then(function (token) {
    //                     console.log(token)
    //                     setCaptchaToken(token);
    //             });
    //           });
    // },[])

    const onSuccess = (res) => {
        console.log('[Login success] currentUser:',res);
        const data = {
            token: res.credential,
            // captcha:captchaToken
        }
        Post('/auth/login/google?captcha=false', data)
            .then((response) => {
                console.log(res)
                toast.success("Successfully Login !");
                // set to localStorage
                setToken(response.data.token)
                localStorage.setItem('userName', JSON.stringify(response.data.user?.name))
                setIsLive(response.data.token)
                navigate('/seller/my-profile')
            })
            .catch((error) => {
                console.log(error)
                toast.error(error.response.data?.message)
        })
    }

    const onFailure = (res) => {
        console.log('[Login failed] res:',res)
    }

    return (
        <div>
                <GoogleLogin
                onSuccess={onSuccess}
                onError={onFailure}
                />
        </div>
    )
}