import { useState } from "react";
import { GoogleReCaptcha, GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { EmailVerification, ForgotPassword } from "../Services/HttpService";

export default function ForgetPasswordModal(props) {

  const [captchaToken,setCaptchaToken]=useState("");
  
  const verifyEmail=()=>{
    const data={
      email:"sally.bogisich@ethereal.email",
      captcha:captchaToken
    }
    console.log(data)
    ForgotPassword('/auth/forgot-password',data)
    .then((response)=>{
      console.log(response)
    })
    .catch((error)=>{
      console.log(error)
    })

    // EmailVerification('/auth/send-verification-email',{captcha:captchaToken})
    // .then((response)=>{
    //   console.log(response)
    // })
    // .catch((error)=>{
    //   console.log(error)
    // })
  }
  return (
        <div>
          <label>email</label>
          <input type='email'/>
          <GoogleReCaptchaProvider reCaptchaKey="6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI">
              <GoogleReCaptcha onVerify={(token)=> setCaptchaToken(token)} />
          </GoogleReCaptchaProvider>
          <button onClick={verifyEmail}>verify</button>
        </div>

  );
}
