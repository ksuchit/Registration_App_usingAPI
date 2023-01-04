import SocialLogin from "react-social-login";
import React from "react";  
import {BsFacebook} from 'react-icons/bs'

class SocialButton extends React.Component {
    render() {
      const { children, triggerLogin, ...props } = this.props;
      return (
        <button className="btn btn-primary" onClick={triggerLogin} {...props}>
          {children} <BsFacebook className="mx-1" size={25}/>
        </button>
      );
    }
}
export default SocialLogin(SocialButton);