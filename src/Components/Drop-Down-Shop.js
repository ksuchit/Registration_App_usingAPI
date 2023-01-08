import { useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { shopLoginContext } from "../App";
import { ImProfile } from "react-icons/im";
import { BsFillKeyFill } from "react-icons/bs";
import { CgLogOff } from "react-icons/cg";
import { clearShopLocalStorage } from "../Shopping/services/Token-Service";
import {CgProfile} from 'react-icons/cg'
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function DropDownShop() {
  const [, setShopIsLive] = useContext(shopLoginContext);
  const navigate = useNavigate();
  const cookies=new Cookies();
  const logOutClicked = () => {
    setShopIsLive(null);
    clearShopLocalStorage();
    cookies.set('registered', 'false');
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
          <Dropdown.Item onClick={()=>navigate("/orders")}>
            <BsFillKeyFill className="mx-2" />
            My-Orders
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
