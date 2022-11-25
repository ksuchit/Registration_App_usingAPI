import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { FaUserAlt } from "react-icons/fa";
import { MdWork, MdEmail} from "react-icons/md";
import {  getUsers, secureGet } from "../Services/HttpService";
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { ImProfile } from 'react-icons/im'
import CreateUserModal from "./CreateUserModal";
import UpdateProfileModal from "./UpdateProfileModal";
import EditUser from "./EditUser";
import EditRole from "./EditRole";
import DeleteUserModal from "./DeleteUserModal";

export default function UpdateCompany() {
    
  const [editUserShow, setEditUserShow] = useState(false);
  const [editRoleShow, setEditRoleShow] = useState(false);
  const [deleteUserShow, setDeleteUserShow] = useState(false);
  const [editUserDetails, setEditUserDetails] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [modalShowUpdate, setModalShowUpdate] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  
  const [orgData,setOrgData]=useState({})
    useEffect(() => {
        const fetchData = async () => {
            // axios get
            await secureGet("/auth/self")
                .then((response) => {
                    console.log(response.data);
                    setCurrentUser(response.data);
                    setOrgData(response.data?._org)
                    
                })
                .catch((err) => {
                    console.log(err);
                });
        
              delete orgData._id;
                  
            //axios getUsers for employees details
            await getUsers('/users')
                .then((response) => {
                    console.log(response)
                    setUsers(response.data.results)
                })
                .catch((error) => {
                    console.log(error)
                })
        };
        fetchData();
    }, [])

    const currentUser_Update = {
      email: currentUser?.email,
      name: currentUser._org?.name
    }
  //edit user details like name,email
  const editUser = (user) => {
    console.log(users)
    console.log(user)
    setEditUserDetails(user)
    setEditUserShow(true)
  } 

  //edit user role 
  const editRole = (user) => {
    console.log(user)
    setEditUserDetails(user)
    setEditRoleShow(true)
  }

  //delete user
  const deleteUser = (user) => {
    console.log(user)
    setEditUserDetails(user)
    setDeleteUserShow(true)
  }
  return (
    <div>
          <div className="d-flex my-profile">
              <div>
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
                alt="menProfile-Logo"
                className="profile-img"
                style={{ display: "block", width: 100, height: 100 }}
              ></img>
              </div>
              <div className="vr mx-4" style={{width:'5px',currentColor:'rgb(1, 1, 10)',opacity:1}}></div>
              <div>
              <div className="d-flex mb-2">
              <ImProfile size={25}/>
                {currentUser.name}
             </div>
            <div className="mb-3">
            <MdEmail size={25} />
            {currentUser._org?.email} 
            </div>
              <div className="d-flex">
              <FaUserAlt size={23} />
              <h5>{currentUser.role}</h5>
          </div>
          <div className="d-flex">
              <MdWork size={23} />
              <h5>{currentUser._org?.name}</h5>
              </div>
            </div>
         
          </div>
          <div>
        <button onClick={() => setModalShow(true)}>Create User</button>
        <button onClick={()=> setModalShowUpdate(true)}>Update Profile</button>
        
        <CreateUserModal
          show={modalShow}
          onHide={()=>setModalShow(false)}
          setUsers={setUsers}
        />
        <UpdateProfileModal
          show={modalShowUpdate}
          onHide={() => setModalShowUpdate(false)}
          currentUser_Update={currentUser_Update}
          setCurrentUser={setCurrentUser}
        />
        <EditUser
          show={editUserShow}  
          setShow={setEditUserShow}
          editUser={editUserDetails}
          setEditUser={setEditUserDetails}
          setUsers={setUsers}
        />
        <EditRole
          show={editRoleShow}
          setShow={setEditRoleShow}
          editUser={editUserDetails}
          setUsers={setUsers}
        />
        <DeleteUserModal
          show={deleteUserShow}
          setShow={setDeleteUserShow}
          editUser={editUserDetails}
          setUsers={setUsers}
        />
      </div>
      <div className="usersData">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.role}
                    <AiFillEdit size={25} onClick={ ()=>editRole(user)} /></td>
                  <td>{user.email}</td>
                  <td><AiFillEdit size={25} className='mx-2'
                        onClick={()=>editUser(user)}
                  />
                          <AiFillDelete size={25}  onClick={()=>deleteUser(user)} /></td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
