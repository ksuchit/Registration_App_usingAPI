import { GoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import { SocialLogin } from "../Services/HttpService";

// const clientId = '976464159587-o17tlgqossa884u4otgp4qfd2balbv4m.apps.googleusercontent.com'

export default function LoginViaGoogle() {
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
            token: res.clientId,
            // captcha:captchaToken
        }
        SocialLogin('/auth/login/google?captcha=false', data)
            .then((res) => {
            console.log(res)
            })
            .catch((error) => {
            console.log(error)
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