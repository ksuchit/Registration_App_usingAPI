import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { Form } from 'semantic-ui-react';
import { CreateProduct } from '../../Services/HttpService';
import {CiCircleRemove} from 'react-icons/ci'
import axios from 'axios';
import getToken from '../../Services/TokenService';
import toast from 'react-hot-toast';

export default function CreateNewProduct(props) {

  const [selectedImage, setSelectedImage] = useState([]);
  const [images, setImages] = useState([]);
  const formData =new FormData();
    const {
        register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();
  
  const onSubmit = (data) => {
    console.log(images)
    // data.images=formData
    // delete data.images
    for (let i = 0; i < images.length; i++){
      formData.append('images',images[i])
    }

    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('price', data.price)
    
    console.log(formData)
    console.log('suchit')

    axios.post(`https://shop-api.ngminds.com/products`, formData,
    {
      headers: {
        'Authorization' : `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data"
          }
    }
    )
      .then((response) => {
        console.log(response)
        toast.success('Product Created Successfully')
        props.setShow(false)
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.message)
      })
    
    
  }
  
  const removeImage = (imgUrl) => {
    setSelectedImage((prev) => prev.filter((item,i) => i !== imgUrl))
    setImages((prev)=> prev.filter((item,i)=> i!==imgUrl))
  }
  
  const exitModal = () => {
    reset();
    setSelectedImage([])
    setImages([])
  }

  return (
      <Modal {...props} onExit={exitModal}
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

      <h5>Image Preview</h5>
      {selectedImage && (
        selectedImage.map((item,i)=>{
          return(<div key={i}>
          <img alt="not found" width={"50px"} src={item} />
          <CiCircleRemove  onClick={()=>removeImage(i)} />
          </div>)
        })
        
      )}
      {selectedImage.length>0 &&  <p style={{color:'red'}}>Image selected:{selectedImage.length}</p> }
      
     
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Field className='d-flex flex-column'>
              <label>Select Image *</label>
            <input type='file'
              multiple
              onChange={(event) => {
                console.log(event.target.files)
                for (let i = 0; i < event.target.files.length; i++){
                  setSelectedImage((prev) => [...prev, URL.createObjectURL(event.target.files[i])])
                  setImages((prev)=>[...prev,event.target.files[i]])
                  
                }
             }}
              // {...register('images',{required:true})}
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
