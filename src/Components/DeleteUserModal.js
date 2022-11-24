import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default function DeleteUserModal(props) {

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
        <p>Are you sure you want to delete your account?</p>
        </div>
        <div>
          <button className='btn btn-secondary' onClick={()=> props.setShow(false)}>Cancel</button>
          <button className='btn btn-danger'>Delete</button>
        </div>
        </Modal.Body>
      </Modal>
  );
}
