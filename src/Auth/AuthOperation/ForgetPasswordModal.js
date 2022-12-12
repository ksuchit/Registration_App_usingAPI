import { useState } from "react";
import { Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import  Post from "../../Services/HttpService"; 

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
    Post('/auth/forgot-password', data)
      .then((response) => {
        console.log(response) 
        toast.success(`E-mail sent to sally.bogisich@ethereal.email`)
        props.setShow(false)
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.response.data?.message)
        getCaptcha();
      })
    
    
   
  }
   
  const onVerify = () => {
     getCaptcha()
  }

  return (
    <div>
      <Modal show={props.show} >
        <Modal.Header>
          <h6>Enter valid email id so that we will send verification email to your mail id</h6>
        </Modal.Header>
        <Modal.Body>
          <div className="mx-5">
            <label>email</label>
            <div>
              <input type='email' onChange={(e) => setEmail(e.target.value)} />
              <button onClick={onVerify} className="mx-2 btn btn-success" >Verify</button>
            </div>
         
            <button onClick={onSubmit}
            className='btn btn-primary'
              style={{ backgroundColor: "rgb(1, 1, 10)", color: "white" }} >Submit</button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={() => props.setShow(false)}>Close</button>
         
        </Modal.Footer>
      </Modal>
        
      
    </div>

  );
}
