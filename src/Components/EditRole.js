import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function EditRole(props) {

  return (
      <Modal show={props.show} onHide={()=>props.setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>props.setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>props.setShow(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  );
}
