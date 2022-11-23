import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChangePassword(){
    
    const navigate = useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const [userData,setUserData]=useState(JSON.parse(localStorage.getItem('data')) || [])

    const changePwd=()=>{
        if(password===confirmPassword)
        {
            console.log("change password")
            // setUserData(JSON.parse(localStorage.getItem('data')))
            let res = userData.find(data => data.email === email)       //if email matcehs return that object
            console.log(res ,"ressssss")
            if (res) {
                const filteredUserData = userData.filter(data => data !== res)  //it returns all data except matching data in array
                res.password = password;
                console.log(res,"filteredresss")
                filteredUserData.push(res)
                console.log(filteredUserData)
                localStorage.setItem('data', JSON.stringify(filteredUserData))
                
                navigate('/auth/login')
            }
        }
    }
    return(
        <div className="changePwd d-flex flex-column w-25 h-auto p-2">
            <p>please enter registered Email id</p>
            <label>Email</label>
            <input type="email" placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
             <input type="text" placeholder="password"
             onChange={(e)=>setPassword(e.target.value)}
            />
            <label>Confirm Password</label>
             <input type="password" placeholder="confirm password"
             onChange={(e)=>setConfirmPassword(e.target.value)}
             />
             <button onClick={changePwd}>Change</button>
             
        </div>
    )
}