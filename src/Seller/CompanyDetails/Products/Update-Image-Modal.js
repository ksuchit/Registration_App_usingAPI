import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CiCircleRemove } from 'react-icons/ci'
import getToken from '../../services/Token-Service';
import {FaRupeeSign} from 'react-icons/fa'


export default function UpdateImageModal(props) {
    console.log(props.data)
    const [index, setIndex] = useState(0);
    const [addImages, setAddImages] = useState([]);
    const [deleteImages, setDeleteImages] = useState([]);

    const formData = new FormData(); 

    const imgClicked = (i) => {
        setIndex(i)
    }

    const onUpdateImages = () => {
        console.log('update images clicked')

        for (let i = 0; i < addImages.length; i++){
            formData.append('new_images',addImages[i])
        }
        for (let i = 0; i < deleteImages.length; i++){
            formData.append('delete', deleteImages[i])
        }
        
        console.log(deleteImages)
        axios.patch(`https://shop-api.ngminds.com/products/images/${props.data._id}`, formData, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log(response)
                props.setData(response.data)
                console.log(response.data.images)
                props.setShow(false)
            })
            .catch((error) => {
            console.log(error)
        })

    }

    const removePreviousImages = (index) => {
        console.log(props.data.images[index].public_id)
        // when we click on delete icon then it will add to array but when we 
        // continiously clicking then it will add same img multiple times so to avoid it we write this
        if (!deleteImages.includes(props.data.images[index].public_id))
            setDeleteImages((prev) => [...prev,props.data.images[index].public_id])
        
    }
    
    const previewOfDeleteImg = (index) => {
        setDeleteImages((prev)=>prev.filter((item,i)=>i!==index))
    }

    const onExitModal = () => {
        console.log('onexit')
        setIndex(0)
        setAddImages([])
        setDeleteImages([])
    }

    const removePreviewImage = (index) => {
        setAddImages((prev)=>prev.filter((item,i)=> i!==index))
    }
    console.log(addImages)
  return (
    <Modal {...props} size="lg" centered onExit={()=>onExitModal()}>
      <Modal.Body>
        <div className='d-flex'>
            <div className='d-flex flex-column gap-3 mx-3'>
                {props.data.images.map((item, i) => {
                    return (
                        <div key={i}>
                            <img src={item.url} alt={i} style={{width:'100px'}} onClick={()=>imgClicked(i)} />
                        </div>
                    )
                })
                }        

            </div>
            <div>
                <div className='d-flex'>
                      {props.data.images.length > 0 ?
                          <img src={props.data.images[index]?.url}
                              style={{ width: '400px',height:'400px' }}
                              alt='1'
                          />
                          : <img src='https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'
                              style={{ width: '400px',height:'400px' }}
                              alt='no data' />
                      }
                    <div>
                        <CiCircleRemove
                            size={20}
                            style={{ backgroundColor: 'red' }}
                            onClick={()=>removePreviousImages(index)}     
                        />
                    </div>
                </div>
                <div className='py-2 px-3' style={{textAlign:'center'}}>
                        <h2>{props.data.name}</h2>
                        {/* <p>{props.data.description}</p>
                        <p className='fw-bolder'><FaRupeeSign />{props.data.price}</p> */}
                </div>
            </div>
        </div>
        <div>
                  <p style={{color:'red'}}>If you want to add Images Select from here:</p>
                  <input type='file' multiple
                      onChange={(event) => {
                          console.log(event.target.files)
                          for (let i = 0; i < event.target.files.length; i++){
                              setAddImages((prev)=>[...prev,event.target.files[i]])
                          }
                          
                    }}
                  /> 
              </div> 
              <div className='d-flex'>
                <p style={{ color: 'red' }}>Preview of Images To be Added:</p>
                <p>{addImages.length} Selected</p>
              </div>
              <div className='d-flex gap-3 my-2'>
                  {/* addImages contains images data not url so for preview we have to convert to url so we used here URL.createObjectURL function of js  */}
                  {addImages.length > 0 && 
                      addImages.map((item, i) => {
                          return (
                            <div key={i} className='d-flex'> 
                                  <img src={URL.createObjectURL(item)} alt={i} style={{ width: '100px' }} />
                                  <CiCircleRemove
                                    onClick={()=>removePreviewImage(i)}
                                  />
                            </div>
                        )
                    })
                  }
              </div>
              {/* Preview of Images U want To DELETE */}
              <div>
                <div className='d-flex'>
                    <p style={{ color: 'red' }} >Preview of Images U want To DELETE:</p>
                    <p>{deleteImages.length} Selected</p>
                </div>
                <div className='d-flex'>
                {/* this is for to get         */}
                  {deleteImages && 
                      deleteImages.map((item, i) => {
                          const url = props.data.images.filter((data, i) => {
                              if(data.public_id===item)
                              return data.url
                          })
                        return (
                            <div key={i} className='d-flex'> 
                                  <img src={url[0].url} alt={i} style={{ width: '100px' }} />
                                  <CiCircleRemove
                                    onClick={()=>previewOfDeleteImg(i)}
                                  />
                            </div>
                        )
                    })                  
                }
                </div>      
              </div>
      </Modal.Body>
        <Modal.Footer>
        <Button onClick={onUpdateImages}>Save Changes</Button>      
        <Button onClick={()=>props.setShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


     

    
  