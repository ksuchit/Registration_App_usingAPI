import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { Patch } from '../../services/Http-Service';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser'
import { useState } from 'react';

export default function UpdateProductModal(props) {
    console.log(props.data)
    const [text,setText]=useState(props.data?.description)
    const {
        register,
        handleSubmit,
        resetField,
    } = useForm(
        {
            defaultValues:{
                name: props.data.name,
                description: parse(props.data?.description),
                price:props.data.price
            }
        }
        )
    
    const onSubmit = (data) => {
        console.log(data)
        data.description = text;
        Patch(`/products/${props.data._id}`, data)
            .then((response) => {
                console.log(response)
                props.setData(response.data)
                props.setShow(false)
            })
            .catch((error) => {
            console.log(error)
        })
    }
    
    const onExitModal = () => {
        resetField('name')
        resetField('description')
        resetField('price')
    }
  return (
    <Modal {...props} size="md" centered onExit={()=>onExitModal}>
      <Modal.Body>
        {
        props.data &&
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className='d-flex flex-column'>
                    <Form.Label>Name of Product</Form.Label>
                    <Form.Control type='text' defaultValue={props.data.name}
                        {...register('name',{required:true})}
                    />                   
                </Form.Group>
                <Form.Group className='d-flex flex-column'>
                    <Form.Label>Description</Form.Label>
                    <CKEditor
                        editor={ ClassicEditor }
                        data={text}
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            // console.log({ event, editor, data });
                            setText(data)
                        }} 
                    />          
                </Form.Group> 
                <Form.Group className='d-flex flex-column'>
                    <Form.Label>Price of Product</Form.Label>
                    <Form.Control type='number' defaultValue={props.data.price}
                        {...register('price',{required:true})}
                    />                   
                </Form.Group>
                <Button type="submit" className="m-1 p-2" style={{backgroundColor:"rgb(1, 1, 10)",color:"white"}}>Submit</Button>
                          
            </Form>   
        }        
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>props.setShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


      
   