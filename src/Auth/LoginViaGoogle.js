import React from "react";
import GoogleLogin from "react-google-login";

const clientId = '976464159587-o17tlgqossa884u4otgp4qfd2balbv4m.apps.googleusercontent.com'

export default function LoginViaGoogle() {
    
    const onSuccess = (res) => {
        console.log('[Login success] currentUser:', res.profileObj);
    }

    const onFailure = (res) => {
        console.log('[Login failed] res:',res)
    }

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                // cookiePolicy={'http://localhost:3000/'}  
                isSignedIn={true}
            />

        </div>
    )
}