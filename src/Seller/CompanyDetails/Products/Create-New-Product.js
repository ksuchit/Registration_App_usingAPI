import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { getProducts } from '../../services/Http-Service';
import {CiCircleRemove} from 'react-icons/ci'
import axios from 'axios';
import getToken from '../../services/Token-Service';
import toast from 'react-hot-toast';
import { Form } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser'
export default function CreateNewProduct(props) {

  const [selectedImage, setSelectedImage] = useState([]);
  const [images, setImages] = useState([]);
  const [text, setText] = useState('');

  const formData = new FormData();
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
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i])
    }

    formData.append('name', data.name)
    formData.append('description', parse(text))
    formData.append('price', data.price)
    
    console.log(formData.getAll('images'))
    console.log('suchit')

    axios.post(`https://shop-api.ngminds.com/products`, formData,
      {
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data"
        }
      }
    )
      .then((response) => {
        console.log(response)
        toast.success('Product Created Successfully')
        props.setShow(false)
        // callGetProducts();    //so we dont need to refresh page to get new created product 
      })
      .catch((error) => {
        console.log(error)
        toast.error(error.message)
      })
    
    
  }
  
  const callGetProducts = () => {
    getProducts(`/products`)
      .then((response) => {
        props.setProducts(response.data.results);
      })
  }


  const removeImage = (index) => {
    setSelectedImage((prev) => prev.filter((item,i) => i !== index))
    setImages((prev)=> prev.filter((item,i)=> i!==index))
  }
  
  const exitModal = () => {
    reset();
    setSelectedImage([])
    setImages([])
  }

  return (
    <div >
      <Modal {...props} onExit={exitModal}
      size="md"
      centered
      backdrop="static"
    >
      <h2 style={{textAlign:'center'}} className='my-1'>Create Product</h2>
      <Modal.Body>
      <div className='createProduct-container'>
        <div>
          <h5 style={{ color: 'white' }}>Image Preview</h5>
          <div className='d-flex flex-wrap gap-1'>
            {selectedImage && (
              selectedImage.map((item,i)=>{
                return (<div key={i}>
                <div className='d-flex'>
                  <img alt="not found" width={"70px"} height={'70px'} src={item} />
                    <CiCircleRemove onClick={() => removeImage(i)}
                      style={{ backgroundColor: 'white',borderRadius:'50%' }} />
                </div>
                </div>)
              })
              
            )}
          </div>    
          {selectedImage.length>0 &&  <p style={{color:'red'}}>Image selected:{selectedImage.length}</p> }
        </div>      
      
     
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='d-flex flex-column'>
              <Form.Label style={{color:'white'}}>Select Image *</Form.Label>
                <Form.Control type='file'
                 
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
            </Form.Group>
          {errors.images && <p style={{color: "red"}}>Image is Required</p>}
          <Form.Group className='d-flex flex-column'>
              <Form.Label style={{color:'white'}}>Name *</Form.Label>
                <Form.Control type='text' placeholder='Enter Name'
                 
              {...register('name',{required:true})}
            />  
          </Form.Group>
          {errors.name && <p style={{color: "red"}}>Name is Required</p>}
          <Form.Group className='d-flex flex-column'>
            <Form.Label style={{ color: 'white' }}>Discription</Form.Label>
              <CKEditor
                  editor={ ClassicEditor }
                  data={text}
                  onChange={ ( event, editor ) => {
                      const data = editor.getData();
                      // console.log({ event, editor, data });
                      setText(data)
                  }} 
                 
              />
            {/* <textarea type='text' placeholder='Enter details about Image'
              {...register('description')}
            />   */}
          </Form.Group>
          {/* {errors.description && <p style={{color: "red"}}>Description is Required</p>} */}
          <Form.Group className='d-flex flex-column'>
              <Form.Label style={{color:'white'}}>Price *</Form.Label>
            <Form.Control type='number' placeholder='Enter Price' min={0}
              {...register('price',{required:true})}
            />  
          </Form.Group>
          {errors.price && <p style={{color: "red"}}>Price is Required</p>}
          <Button type="submit" className="m-1 p-2" style={{backgroundColor:"rgb(1, 1, 10)",color:"white"}}>Submit</Button>
          </Form>
        </div>
      </Modal.Body>
        <Button onClick={()=>props.setShow(false)}>Close</Button>
    </Modal>
  </div>
  );
}
