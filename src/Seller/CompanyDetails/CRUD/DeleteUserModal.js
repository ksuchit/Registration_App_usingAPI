import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { DeleteUser } from '../../Services/HttpService';

export default function DeleteUserModal(props) {

  const deleteUser = () => {
    console.log(props.editUser?._id)
    DeleteUser(`/users/${props.editUser?._id}`)
      .then((response) => {
        console.log(response)
        props.setUsers((prev)=> prev.filter((item)=>item._id!==props.editUser?._id))
      })
      .catch((error) => {
        console.log(error)
      })
    
      //it will close modal after delete user
      props.setShow(false)
  }
  return (
      <Modal
        show={props.show}
        onHide={()=> props.setShow(false)}
        backdrop="static"
        keyboard={false}
      >
      <Modal.Body>
        <div>
        <h1 style={{textAlign:'center'}} >Delete User</h1>
          <p>Are you sure you want to delete account of..<p style={{color:'red'}}>{props.editUser?.name}</p> </p>
          
        </div>
        <div>
          <button className='btn btn-secondary' onClick={()=> props.setShow(false)}>Cancel</button>
          <button className='btn btn-danger mx-2' onClick={deleteUser}>Delete</button>
        </div>
        </Modal.Body>
      </Modal>
  );
}
