import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { UpdateUserRole } from "../Services/HttpService";

export default function EditRole(props) {
  
  const [role, setRole] = useState("")
  
  const editRole = () => {
    console.log(role)
    UpdateUserRole(`/users/role/${props.editUser._id}`,{role:role})
      .then((response) => {
        console.log(response);
        props.setUsers((prev) => prev.map((item) => {
          if (item._id === props.editUser._id)
            item.role = role
          
          return item;
        }))
        //it will automatically close modal after successfully changing user role
        props.setShow(false)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal show={props.show} onHide={() => props.setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title><h1  style={{alignItems:'center'}}>Edit Role</h1></Modal.Title>
      </Modal.Header>
      <div className="registration">
        <div className="p-5">
          {props.editUser.role === 'admin' ?
            <>
              <input type='radio' name="role" value='admin' defaultChecked />
              <label for='admin'>admin</label><br /><hr />
              <input type='radio' name="role" value='user' onChange={(e)=>setRole(e.target.value)} />
              <label for='user'>user</label>
            </>
            :
            <>
          <input type='radio' name="role" value='admin'  onChange={(e)=>setRole(e.target.value)} />
          <label for='admin'>admin</label><br/><hr/>
          <input type='radio' name="role" value='user' defaultChecked/>
          <label for='user'>user</label>
           </>
          }
        </div>
      </div>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => props.setShow(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={editRole}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
