import { useState } from "react";
import { Modal } from "react-bootstrap";
import { ForgotPassword } from "../Services/HttpService";

export default function ForgetPasswordModal(props) {

  const [captchaToken, setCaptchaToken] = useState();
  const [email, setEmail] = useState("");

  const getCaptcha = () => {
    window.grecaptcha.ready(function () {
      window.grecaptcha.execute('6LevmbQZAAAAAMSCjcpJmuCr4eIgmjxEI7bvbmRI', { action: 'submit' })
        .then(function (token) {
          console.log(token)
          setCaptchaToken(token);
        });
    });
  }

  const onSubmit = () => {
    const data = {
      email: email,
      captcha: captchaToken
    }
    console.log(data)

  // forget password method is called
    ForgotPassword('/auth/forgot-password', data)
      .then((response) => {
        console.log(response) 
      })
      .catch((error) => {
        console.log(error)
        getCaptcha();
      })
    
    
   
  }
   
  const onVerify = () => {
     getCaptcha()
  }

  return (
    <div>
      <Modal show={props.show}  >
        <Modal.Body>
          <label>email</label>
          <input type='email' onChange={(e) => setEmail(e.target.value)} />
          <button onClick={onVerify}>Verify</button><br></br>
          <button onClick={onSubmit}>Submit</button>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={()=>props.setShow(false)}>Close</button>
        </Modal.Footer>
      </Modal>
        
      
    </div>

  );
}
