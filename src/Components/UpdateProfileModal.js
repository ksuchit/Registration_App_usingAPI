import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import toast from 'react-hot-toast';
import { UpdateCompanyInfo } from '../Services/HttpService';

export default function UpdateProfileModal(props) {

    const [userEmail, setUserEmail] = useState("");
    const [userComapnay, setUserCompany] = useState("");

    const saveChanges = () => {
            
        UpdateCompanyInfo('/users/org',
            {
                name: userComapnay,
                email: userEmail
            })
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
                <div className=' registration'>
                    <div className='p-4 d-flex flex-column'>
                        <label>Organisation Name</label>
                      <input type="text" placeholder='name'  defaultValue={props.currentUser_Update.name}
                            onChange={(e)=> setUserCompany(e.target.value) }
                        />
                        <label>Organisation Email</label>
                        <input type="text" placeholder='email'  defaultValue={props.currentUser_Update.email}
                          onChange={(e)=> setUserEmail(e.target.value) }
                      />
                      {userEmail}
                      {userComapnay}
                    </div>
                </div>
            </Modal.Body>
        <Modal.Footer>
          <Button variant="primary"  onClick={saveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  );
}
