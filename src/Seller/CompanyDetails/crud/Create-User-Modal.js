import React  from "react";
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useForm} from "react-hook-form"
import toast from "react-hot-toast";
import Post from "../../services/Http-Service";


export default function CreateUserModal(props) {

    const {
        register,
        watch,
      handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
   
    const onSubmitCreateUser = (data) => {
      delete data.Rpassword;
      console.log(data)
      Post('/users',data)
                .then((response) => {
                  console.log(response)
                  data._id = response.data._id;
                  console.log(data)
                  //it will automatically close modal after successfully registered
                  props.onHide()
                  toast.success('User Created Successfully')
                })
                .catch((error) => {
                  console.log(error)
                  toast.error(error.response.data.message)
                })
      
     
    }
  
  
  return (
    <Modal
      {...props}
      size="md"
        centered
          backdrop="static"
      keyboard={false}
      onExit={()=>reset()}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Register New user
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <div>
            <Form onSubmit={handleSubmit(onSubmitCreateUser)} className="reg-form  h-auto p-2" >
                
                <Form.Group className="d-flex flex-column p-1">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Full Name"
                    className="p-2"
                    {...register("name",{required:true})}
                    />
                </Form.Group>
                { errors.name && <p style={{color: "red"}}>user name is Required</p>}
                <Form.Group className="d-flex flex-column p-1">
                    <Form.Label>Role</Form.Label>
                    <Form.Control type="text" placeholder="Enter Role"
                    className="p-2"
                    { ...register("role",{required:true})}                    
                    />
                </Form.Group>
                { errors.role && <p style={{color: "red"}}>role is Required</p>}
                <Form.Group className="d-flex flex-column p-1">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter Email"
                    className="p-2"
                    {...register("email",{required:true , pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
                    />
                </Form.Group>
                {errors.email && <p style={{ color: "red" }}>email is Required</p>}
                <Form.Group className="d-flex flex-column p-1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password"
                    className="p-2"
                    {...register("password",{required:true , minLength:8 })}
                    />
                </Form.Group>
                {errors.password?.type === 'required' && <p style={{ color: "red" }}>password is Required</p>}
                {errors.password?.type==='minLength' && <p style={{ color: "red" }}>minimum 8 charachters Required</p>}
                
                <Form.Group className="d-flex flex-column p-1">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password"
                    className="p-2"
                        {...register("Rpassword", {
                             minLength: 8,
                            validate: (val) => {
                                if (watch('password') !== val) {
                                    return "Your passwords do no match";
                                }
                              },
                        })}
                    />
                </Form.Group>
                {errors.Rpassword && <p style={{color: "red"}}>Your passwords do no match</p>}
                <Button type="submit" className="m-1 p-2" style={{backgroundColor:"rgb(1, 1, 10)",color:"white"}}>Submit</Button>
            </Form>
        </div>
    

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

  
