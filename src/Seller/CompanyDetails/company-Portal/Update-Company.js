import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { FaUserAlt } from "react-icons/fa";
import { MdWork, MdEmail} from "react-icons/md";
import {  Get } from "../../services/Http-Service";
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { ImProfile } from 'react-icons/im'
import CreateUserModal from "../crud/Create-User-Modal";
import UpdateProfileModal from "../crud/Update-Profile-Modal";
import EditUser from "../crud/Edit-User";
import EditRole from "../crud/Edit-Role";
import DeleteUserModal from "../crud/Delete-User-Modal";
import Pagination from "./Pagination";

export default function UpdateCompany() {
    
  const [editUserShow, setEditUserShow] = useState(false);
  const [editRoleShow, setEditRoleShow] = useState(false);
  const [deleteUserShow, setDeleteUserShow] = useState(false);
  const [editUserDetails, setEditUserDetails] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [modalShowUpdate, setModalShowUpdate] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([]);
  
  const [orgData, setOrgData] = useState({})
  const [pageNum, setPageNum] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(4)
  const [userRole, setUserRole] = useState('');
  const [sortBy, setSortBy] = useState();
  const [totalPages, setTotalPages] = useState();
  const [totalResults, setTotalResults] = useState();
  const [searchByName, setSearchByName] = useState('');


  
    useEffect(() => {
        const fetchData = async () => {
            // axios get
            await Get("/auth/self")
                .then((response) => {
                    console.log(response.data);
                    setCurrentUser(response.data);
                    setOrgData(response.data?._org)

                })
                .catch((err) => {
                    console.log(err);
                });
        
        delete orgData._id;
         
            userRole ?
              //axios getUsers for employees details
              await Get(`/users?&role=${userRole}&limit=${itemsPerPage}&page=${pageNum}&sortBy=${sortBy}`)
                .then((response) => {
                  console.log(response)
                  setUsers(response.data.results)
                  setTotalPages(response.data.totalPages)
                  setTotalResults(response.data.totalResults)
                })
                .catch((error) => {
                  console.log(error)
                })
              :
              await Get(`/users?&limit=${itemsPerPage}&page=${pageNum}&sortBy=${sortBy}`)
                .then((response) => {
                  console.log(response)
                  setUsers(response.data.results)
                  setTotalPages(response.data.totalPages)
                  setTotalResults(response.data.totalResults)
                })
                .catch((error) => {
                  console.log(error)
                })
          
        //   userName ?
        //   //axios Get for employees details
        //   await Get(`/users?&name=${searchByName}&limit=${itemsPerPage}&page=${pageNum}&sortBy=${sortBy}`)
        //     .then((response) => {
        //       console.log(response)
        //       setUsers(response.data.results)
        //     })
        //     .catch((error) => {
        //       console.log(error)
        //     })
        //   :
        //   await Get(`/users?&limit=${itemsPerPage}&page=${pageNum}&sortBy=${sortBy}`)
        //     .then((response) => {
        //       console.log(response)
        //       setUsers(response.data.results)
        //     })
        //     .catch((error) => {
        //       console.log(error)
        //     })
          
         };
        fetchData();
    }, [itemsPerPage,pageNum,userRole,sortBy])

    const currentUser_Update = {
      email: currentUser?.email,
      name: currentUser._org?.name
    }
  //edit user details like name,email
  const editUser = (user) => {
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

  //pagination 
  const roleSelectedByUser = (e) => {
    console.log(e.target.value)
    const role=(e.target.value)
    setUserRole(role)
    console.log(userRole)
    
  }

  const [userName, setUserName] = useState("");

  const userSearchByName = () => {
    
    setSearchByName(()=>userName)
    console.log(searchByName)

  }

  const callSortBy = (e) => {
    console.log(e.target.value)
    const sortBy = e.target.value;
    setSortBy(sortBy)

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
              {currentUser.role === 'admin' ?
                <div>
                  <button className="btn btn-secondary mx-1" onClick={() => setModalShow(true)}>Create User</button>
                  <button className="btn btn-secondary mx-1" onClick={() => setModalShowUpdate(true)}>Update Profile</button>
                </div>
              : ""}
              </div>
          </div>
      <div>
        
        <CreateUserModal
          show={modalShow}
          onHide={()=>setModalShow(false)}
        />
        <UpdateProfileModal
          show={modalShowUpdate}
          setShow={setModalShowUpdate}
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
        {/* <div className="my-2">
          <input className="mx-2" type='text' placeholder="Search By Name..."  onChange={(e)=>setUserName(e.target.value)}/>
          <button className="btn btn-success" onClick={userSearchByName}>Search</button>
        </div> */}
      </div>
      <div className="usersData">
        {/* <div className="col-1"></div> */}
        {/* <div className="col-10"> */}
      <div className="d-flex justify-content-between">
        {/* **********Search*********** */}
        <div className="my-2">
            <input className="mx-2" type='text' placeholder="Search By Name..."  onChange={(e)=>setUserName(e.target.value)}/>
            <button className="btn btn-success" onClick={userSearchByName}>Search</button>
        </div>
        {/* ***********Sort By*********** */}
        <div className="mx-5">
          <lable className='fw-bolder'>Sort By-</lable>
          <select onChange={callSortBy}>
            <option value={''}>Default</option>
            <option value={'name'}>Name</option>  
            <option value={'role'}>Role</option>  
            <option value={'email'}>Email</option>  
          </select>
        </div>
      </div>
        <Table striped bordered hover >
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Role
                <label className="searchByRole">Search By-</label>
                <select onChange={roleSelectedByUser}>
                  <option value=''>Show All</option>
                  <option value='admin'>Admin</option>
                  <option value='user'>User</option>
                </select>
              </th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {
              users.length>0 ? 
                (currentUser.role==='admin') ? 
                 users.map((user, i) => {
                  return (
                <tr key={i}>
                   {/* ex.  (4 *(1-1)+i+1) */}
                  <td>{(itemsPerPage * (pageNum -1) )+ i + 1}</td>   
                  <td>{user.name}</td>
                  <td>{user.role}
                    <AiFillEdit size={25} onClick={ ()=>editRole(user)} /></td>
                  <td>{user.email}</td>
                  <td><AiFillEdit size={25} className='mx-2'
                        onClick={()=>editUser(user)}
                  />
                          <AiFillDelete size={25}  onClick={()=>deleteUser(user)} /></td>
                </tr>)})
                
                : 
                users.map((user, i) => {
                  return (  
                <tr key={i}>
                   {/* ex.  (4 *(1-1)+i+1) */}
                  <td>{(itemsPerPage * (pageNum -1) )+ i + 1}</td>   
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.email}</td>
                </tr>)})
              
          :<p className="fw-bolder" style={{color:'red',textAlign:'center'}}>No data Found</p>
          }
          </tbody>
          </Table>
          <Pagination
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            pageNum={pageNum}
            setPageNum={setPageNum}
            users={users}
            totalPages={totalPages}
            totalResults={totalResults}
          />
          </div>
        {/* <div className="col-1"></div> */}
      {/* </div> */}
    </div>
  );
}
