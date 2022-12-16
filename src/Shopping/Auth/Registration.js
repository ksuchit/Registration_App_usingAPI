import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import {useForm} from "react-hook-form"
import { NavLink } from "react-router-dom";
import {Country,State,City} from 'country-state-city'

export default function Registration() {
    const [isEmailRegistered, setIsEmailRegistered] = useState(false);
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    
    const onSubmit = (data) => {
       
        console.log(data)
    }

   
    return (
        <div className="registration-container">
        <div className="registration ">
            <Form onSubmit={handleSubmit(onSubmit)} className="reg-form  h-auto p-2">
                <h2>Registration</h2>
                <hr/>
                <Form.Field className="d-flex flex-column p-1">
                    <label className="fw-bolder">Full Name</label>
                    <input type="text" placeholder="Enter Full Name"
                    className="p-2"
                    {...register("name",{required:true})}
                    />
                </Form.Field>
                { errors.name && <p style={{color: "red"}}>user name is Required</p>}
               
                <Form.Field className="d-flex flex-column p-1">
                    <label className="fw-bolder">Email</label>
                    <input type="text" placeholder="Enter Email" 
                    className="p-2"
                        {...register("email",
                            {
                                required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                onChange:()=> setIsEmailRegistered(false)
                            })}
                    />
                </Form.Field>
                {errors.email && <p style={{ color: "red" }}>email is Required</p>}
                {isEmailRegistered ? <p style={{ color: "red" }}>user email is alredy exist</p> : ""}
                 
                <Form.Field className="d-flex flex-column p-1">
                    <label className="fw-bolder">Street</label>
                    <input type="text" placeholder="Enter Street" 
                    className="p-2"
                        {...register("street",
                            {
                                required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                onChange:()=> setIsEmailRegistered(false)
                            })}
                    />
                </Form.Field>
                {errors.email && <p style={{ color: "red" }}>Street is Required</p>}
                    
                <Form.Field className="d-flex flex-column p-1">
                    <label className="fw-bolder">AddressLine2</label>
                    <input type="text" placeholder="Enter AddressLine2" 
                    className="p-2"
                        {...register("addressLine2",
                            {
                                required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                onChange:()=> setIsEmailRegistered(false)
                            })}
                    />
                </Form.Field>
                {errors.email && <p style={{ color: "red" }}>addressLine2 is Required</p>}
                <div>
                    <div>
                        <input type='text' placeholder="Country"/>
                        <input type='text' placeholder="State"/>
                    </div>
                    <div>
                        <input type='text' placeholder="City"/>
                        <input type='text' placeholder="Pin Code"/>
                    </div>    
                </div>    
                <Form.Field className="d-flex flex-column p-1">
                    <label className="fw-bolder">Password</label>
                    <input type="password" placeholder="Enter Password"
                    className="p-2"
                    {...register("password",{required:true , minLength:8 })}
                    />
                </Form.Field>
                {errors.password?.type === 'required' && <p style={{ color: "red" }}>password is Required</p>}
                {errors.password?.type==='minLength' && <p style={{ color: "red" }}>minimum 8 charachters Required</p>}
                
                <Form.Field className="d-flex flex-column p-1">
                    <label className="fw-bolder">Confirm Password</label>
                    <input type="password" placeholder="Enter Password"
                    className="p-2"
                        {...register("Rpassword", {
                             minLength: 8,
                            validate: (val) => {
                                if (watch('password') !== val) {
                                    return "Your passwords do no match";
                                }
                              },
                        })}
                    />
                </Form.Field>
                {errors.Rpassword && <p style={{ color: "red" }}>Your passwords do no match</p>}
                
                <Button type="submit" className="m-1 p-2" style={{backgroundColor:"rgb(1, 1, 10)",color:"white"}}>Submit</Button>
            </Form>
            <NavLink style={{ textDecoration: 'none' }} to='/auth/login' >Already have an account? </NavLink>
        </div>
    </div>
    )
}