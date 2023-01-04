import React from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Patch } from '../../services/Http-Service';

export default function UpdateProfileModal(props) {

    const {
      register,
    handleSubmit,
    } = useForm()
  
  const onSubmit = (data) => {
    console.log(data)

    Patch('/users/org',data)
        
        .then((response) => {
            console.log(response)
            props.setCurrentUser(response.data)
            props.setShow(false)
        })
        .catch((error) => {
            console.log(error)
            toast.error(error.response.data.message)
        })
  }

  return (
      <Modal show={props.show} onHide={()=>props.setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Company Details</Modal.Title>
        </Modal.Header>
      <Modal.Body>
      <div>
      <Form onSubmit={handleSubmit(onSubmit)} className="reg-form  h-auto p-2">
                    <Form.Group className="d-flex flex-column p-1">
                        <Form.Label>Organisation Name</Form.Label>
                        <Form.Control type="text" defaultValue={props.currentUser_Update.name}
                        className="p-2"
                        {...register("name")}
                        />
                    </Form.Group>
                    <Form.Group className="d-flex flex-column p-1">
                        <Form.Label>Organisation Email</Form.Label>
                        <Form.Control type="text" defaultValue={props.currentUser_Update.email}
                        className="p-2"
                        { ...register("email")}                    
                        />
          </Form.Group>
          <Button type="submit" className="m-1 p-2" style={{backgroundColor:"rgb(1, 1, 10)",color:"white"}}>Submit</Button>
          </Form>
          </div>
            </Modal.Body>
      </Modal>
  );
}
