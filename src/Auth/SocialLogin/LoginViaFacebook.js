import SocialButton from "./SocialButton";


export default function LoginViaFacebook() {
   
    const handleSocialLogin = (user) => {
        console.log(user);
      };
      
      const handleSocialLoginFailure = (err) => {
        console.error(err);
      };
    
     return (
        <div className="my-2">
        <SocialButton
            provider="facebook"
            appId="365586852354146"
            onLoginSuccess={handleSocialLogin}
            onLoginFailure={handleSocialLoginFailure}
            >
            Login with Facebook
        </SocialButton>
        </div>
    )
}