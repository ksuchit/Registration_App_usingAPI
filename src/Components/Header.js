import React, { useContext  } from "react";
import { NavLink } from "react-router-dom";
import { loginContext } from "../App";
import OffCanvas from "./DropDown";

export default function Header() {
    const [live] = useContext(loginContext);
   
    return (
        <div className="header p-3">
            <div className="d-flex">
                <img src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/h0kvromeujgdyexmj42o"
                   className="h-img" alt="logo" />
                <h1 className="mx-2">Angular Minds</h1>
                </div>
            <div className="h-nav d-flex flex-row">
                {live ?
                    <>
                    <NavLink to='/products' style={{ textDecoration: 'none', color: 'white' }}
                        className='my-auto mx-2'
                        >Products
                    </NavLink>
                    <OffCanvas /> 
                    </>
                 : ""}
            </div>
        </div>
    )
}