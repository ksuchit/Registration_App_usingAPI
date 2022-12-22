import { useContext, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import toast from "react-hot-toast";
import { loginContext } from "../App";
import { ImProfile } from "react-icons/im";
import { MdWork } from "react-icons/md";
import { BsFillKeyFill } from "react-icons/bs";
import { CgLogOff } from "react-icons/cg";
import { clearShopLocalStorage } from "../Shopping/Services/TokenService";
import {CgProfile} from 'react-icons/cg'
import { useNavigate } from "react-router-dom";

export default function DropDownShop() {
  const [live, setIsLive] = useContext(loginContext);
  const [user] = useState(JSON.parse(localStorage.getItem("shopUserName")) || "Suchit");
  const navigate = useNavigate();
  
  const logOutClicked = () => {
    setIsLive(null);
    clearShopLocalStorage();
    navigate("/home")
  };
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary" className="mx-2">
          {/* {user}
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
            alt="profileImg"
            className="mx-2"
            style={{ maxWidth: "50px", borderRadius: "100%" }}
          /> */}
          <CgProfile size={30} />
        </Dropdown.Toggle>

        <Dropdown.Menu variant="dark" align={{ lg: "end" }}>
          <Dropdown.Item onClick={()=>navigate("/profile")}>
            <ImProfile className="mx-2" />
            Profile
          </Dropdown.Item>
          {/* <Dropdown.Item navigate("/my-profi)le/companyInfo" ><MdWork className="mx-2"/>Company Info</Dropdown.Item> */}
          <Dropdown.Item onClick={()=>navigate("/change-password")}>
            <BsFillKeyFill className="mx-2" />
            Change Password
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={logOutClicked}>
            <CgLogOff size={20} className="mx-2" />
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}
