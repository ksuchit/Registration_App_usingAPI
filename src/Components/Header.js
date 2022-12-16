import React, { useContext  } from "react";
import { NavLink } from "react-router-dom";
import { loginContext } from "../App";
import DropDown from "./DropDown";
import logo from '../Images/logo.png' 

export default function Header() {
    const [live] = useContext(loginContext);
   
    return (
        <div className="header p-2">
            <div className="d-flex align-items-center">
                <img src={logo}
                   className="h-img" alt="logo" />
                <h5 className="mx-2" >READER'S PALACE</h5>
                </div>
            <div className="h-nav d-flex flex-row">
                {live ?
                    <>
                    <NavLink to='/seller/products' style={{ textDecoration: 'none', color: 'white' }}
                        className='my-auto mx-2'
                        >Products
                    </NavLink>
                    <DropDown /> 
                    </>
                 : ""}
            </div>
        </div>
    )
}