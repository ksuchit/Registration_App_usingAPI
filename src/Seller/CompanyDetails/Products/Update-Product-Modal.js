import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { UpdateProduct } from '../../services/Http-Service';

export default function UpdateProductModal(props) {
    console.log(props.data)
    const {
        register,
        handleSubmit,
        resetField,
    } = useForm(
        {
            defaultValues:{
                name: props.data.name,
                description: props.data?.description,
                price:props.data.price
            }
        }
        )
    
    const onSubmit = (data) => {
        console.log(data)

        UpdateProduct(`/products/${props.data._id}`, data)
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
                    <textarea type='text' defaultValue={props.data.description}
                        {...register('description')}
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


      
   