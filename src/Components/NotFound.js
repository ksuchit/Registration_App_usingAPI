import React from "react";
import { NavLink } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="notFoundPage">
            <>
                <h1>Oops! You seem to be lost.</h1>
                <p>go to.....<NavLink style={{textDecoration:'none'}} to={'/auth/login'}>Login Page</NavLink></p>
            </>
        </div>
    )
}