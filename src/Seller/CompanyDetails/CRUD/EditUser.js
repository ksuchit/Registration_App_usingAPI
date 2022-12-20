import React from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Patch } from '../../Services/HttpService';

export default function EditUser(props) {
    const {
        register,
      handleSubmit,
      resetField,
    } = useForm({
      defaultValues: {
        name: props.editUser?.name,
        email: props.editUser?.email,
        password:""
      }
      });
   
  const handleClick = () => {
    resetField('name');
    resetField('email');
    resetField('password')
  }
  
    const onSubmit = (data) => {
      console.log(data)
      Patch(`/users/${props.editUser._id}`, data)
        .then((response) => {
          console.log(response)
          props.setUsers((prev) => prev.map((item) => {
            if (item._id === props.editUser._id)
            {
              item.name = data.name
              item.email=data.email
            }
            return item;
          }))
          //when user is successfully updated it will close modal automatically
          props.setShow(false)
        })
        .catch((error) => {
          console.log(error)
          toast.error(error.response.data.message)
        })
        
    }

  return (
      <Modal show={props.show}  onHide={()=>props.setShow(false)} onExit={handleClick}>
       
          <Modal.Body>
              <div>
                  <h1 style={{textAlign:'center'}}>Edit User</h1>
                  <div className='registration'>
                  <Form onSubmit={handleSubmit(onSubmit)} className="reg-form  h-auto p-2">
                    <Form.Group className="d-flex flex-column p-1">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" defaultValue={props.editUser?.name}
                        className="p-2"
                        {...register("name")}
                        />
                    </Form.Group>
                    <Form.Group className="d-flex flex-column p-1">
                        <Form.Label>Company Email</Form.Label>
                        <Form.Control type="text" defaultValue={props.editUser?.email}
                        className="p-2"
                        { ...register("email")}                    
                        />
                    </Form.Group>
                    <Form.Group className='d-flex flex-column p-1'>
                              <Form.Label>Password</Form.Label>
                              <Form.Control type="text" placeholder='Enter Password'
                                  className='p-2'
                                {...register("password")}
                              />
                    </Form.Group>     
                <Button type="submit" className="m-1 p-2" style={{backgroundColor:"rgb(1, 1, 10)",color:"white"}}>Submit</Button>
                          
                </Form>
                </div>
                </div>
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>props.setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  );
}
