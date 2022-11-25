import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Form } from 'semantic-ui-react';
import { UpdateCompanyInfo } from '../Services/HttpService';

export default function UpdateProfileModal(props) {

    const {
      register,
    handleSubmit,
    } = useForm()
  
  const onSubmit = (data) => {
    console.log(data)

    UpdateCompanyInfo('/users/org',data)
        
        .then((response) => {
            console.log(response)
            props.setCurrentUser()
        })
        .catch((error) => {
            console.log(error)
            toast.error(error.response.data.message)
        })
  }

  return (
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Update Company Details</Modal.Title>
        </Modal.Header>
      <Modal.Body>
      <div className='registration'>
      <Form onSubmit={handleSubmit(onSubmit)} className="reg-form  h-auto p-2">
                    <Form.Field className="d-flex flex-column p-1">
                        <label>Organisation Name</label>
                        <input type="text" defaultValue={props.currentUser_Update.name}
                        className="p-2"
                        {...register("name")}
                        />
                    </Form.Field>
                    <Form.Field className="d-flex flex-column p-1">
                        <label>Organisation Email</label>
                        <input type="text" defaultValue={props.currentUser_Update.email}
                        className="p-2"
                        { ...register("email")}                    
                        />
          </Form.Field>
          <Button type="submit" className="m-1 p-2" style={{backgroundColor:"rgb(1, 1, 10)",color:"white"}}>Submit</Button>
          </Form>
          </div>
            </Modal.Body>
      </Modal>
  );
}
