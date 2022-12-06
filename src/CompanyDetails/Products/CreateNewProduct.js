import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { Form } from 'semantic-ui-react';
import Post from '../../Services/HttpService';

export default function CreateNewProduct(props) {

    const {
        register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
  const onSubmit = (data) => {
    console.log(data)
    console.log('suchit')

    Post('/products', data)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
    
    
    }
  
  return (
      <Modal {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Create Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Field className='d-flex flex-column'>
              <label>Select Image *</label>
            <input type='file'
              {...register('images',{required:true})}
            />  
          </Form.Field>
          {errors.images && <p style={{color: "red"}}>Image is Required</p>}
          <Form.Field className='d-flex flex-column'>
              <labe>Name *</labe>
            <input type='text' placeholder='Enter Name'
              {...register('name',{required:true})}
            />  
          </Form.Field>
          {errors.name && <p style={{color: "red"}}>Name is Required</p>}
          <Form.Field className='d-flex flex-column'>
              <label>Discription</label>
            <textarea type='text' placeholder='Enter details about Image'
              {...register('description')}
            />  
          </Form.Field>
          {/* {errors.description && <p style={{color: "red"}}>Description is Required</p>} */}
          <Form.Field className='d-flex flex-column'>
              <label>Price *</label>
            <input type='number' placeholder='Enter Price'
              {...register('price',{required:true})}
            />  
          </Form.Field>
          {errors.price && <p style={{color: "red"}}>Price is Required</p>}
          <Button type="submit" className="m-1 p-2" style={{backgroundColor:"rgb(1, 1, 10)",color:"white"}}>Submit</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>props.setShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
