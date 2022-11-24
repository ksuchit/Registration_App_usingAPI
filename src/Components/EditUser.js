import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { Form } from 'semantic-ui-react';
import { UpdateUserInfo } from '../Services/HttpService';

export default function EditUser(props) {
    const {
        register,
        handleSubmit,
      } = useForm();
   
    const onSubmit = (data) => {
        console.log(data)
        UpdateUserInfo(`/users/${props.id}`,data)
    }
  
  return (
      <Modal show={props.show} onHide={()=>props.setShow(false)}>
       
          <Modal.Body>
              <div>
                  <h1>Edit User</h1>
                  <div className='registration'>
                  <Form onSubmit={handleSubmit(onSubmit)} className="reg-form  h-auto p-2">
                    <Form.Field className="d-flex flex-column p-1">
                        <label>Full Name</label>
                        <input type="text" placeholder="Enter Full Name"
                        className="p-2"
                        {...register("name")}
                        />
                    </Form.Field>
                    <Form.Field className="d-flex flex-column p-1">
                        <label>Company Email</label>
                        <input type="text" placeholder="Enter Company Email"
                        className="p-2"
                        { ...register("email")}                    
                        />
                    </Form.Field>
                    <Form.Field className='d-flex flex-column p-1'>
                              <label>Password</label>
                              <input type="text" placeholder='Enter Password'
                                  className='p-2'
                                {...register("password")}
                              />
                    </Form.Field>     
                <Button type="submit" className="m-1 p-2" style={{backgroundColor:"rgb(1, 1, 10)",color:"white"}}>Submit</Button>
                          
                </Form>
                </div>
                </div>
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>props.setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>props.setShow(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  );
}
