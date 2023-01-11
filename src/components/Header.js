import React, { useContext  } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { loginContext, shopLoginContext } from "../App";
import DropDown from "./Drop-Down";
import logo from '../images/logo.png' 
import DropDownShop from "./Drop-Down-Shop";
import { BsCart } from 'react-icons/bs'
import { useSelector } from "react-redux";

export default function Header() {
    const [live] = useContext(loginContext);
    const [shopLive,] = useContext(shopLoginContext)
    const location = useLocation();
    // console.log(location.pathname)

    const state = useSelector((state) => state);
    // console.log(state)
    const length = state.cartReducer.cart.length;

    return (
        <div className="header p-2">
            <div className="d-flex align-items-center">
                <NavLink to={'/home'}>
                    <img src={logo}
                        className="h-img" alt="logo" />
                </NavLink>
                <NavLink to={'/home'} style={{textDecoration:'none'}}><h5 className="mx-2" style={{color:'white'}}>READER'S PALACE</h5></NavLink>
                </div>
            <div className="h-nav d-flex flex-row">
                {live && (location.pathname.includes('seller'))?
                    <>
                    <NavLink to='/seller/products' style={{ textDecoration: 'none', color: 'white' }}
                        className='my-auto mx-2'
                        >Products
                    </NavLink>
                    <DropDown /> 
                    </>
                 : 
                 //first we check the path n then display nav if seller is there then it will show seller 
                //otherwise it will show customer
                 (!location.pathname.includes('seller')) ?
                    shopLive ?
                    <>
                    <NavLink to='/home' style={{ textDecoration: 'none', color: 'white' }}
                        className='my-auto mx-2'
                        >HOME
                    </NavLink>
                    <NavLink to='/cart' style={{ textDecoration: 'none', color: 'white' }}
                        className='my-auto mx-2'
                            ><BsCart size={25} /> {length>0 ? length : ""}
                    </NavLink>      
                    <DropDownShop /> 
                    </>
                :
                    <div className=" d-flex justify-content-center">
                        <NavLink to='/home' style={{ textDecoration: 'none', color: 'white' }}
                        className='my-auto mx-2'
                        >HOME
                        </NavLink>
                        <NavLink to='/cart' style={{ textDecoration: 'none', color: 'white' }}
                            className='my-auto mx-2'
                                ><BsCart size={25} /> {length>0 ? length : ""}
                        </NavLink>              
                        <NavLink to='/auth/login' style={{ textDecoration: 'none', color: 'white' }}
                        className='my-auto mx-2'
                        >LOGIN
                        </NavLink>
                        <NavLink to='/auth/registration' style={{ textDecoration: 'none', color: 'white' }}
                        className='my-auto mx-2'
                        >SIGNUP
                        </NavLink>
                    </div>
                :""}
                
            </div>
        </div>
    )
}