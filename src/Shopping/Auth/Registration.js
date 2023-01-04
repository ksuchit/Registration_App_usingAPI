import React, { useState } from "react";
import {useForm} from "react-hook-form"
import { NavLink, useNavigate } from "react-router-dom";
import {Country,State,City} from 'country-state-city'
import { Post } from "../services/Http-Service";
import { toast } from "react-hot-toast";
import { Button, Form } from "react-bootstrap";

export default function Registration() {
    const navigate = useNavigate();
    const [isEmailRegistered, setIsEmailRegistered] = useState(false);
    
    const [state, setState] = useState([]);
    const [countryCode, setCountryCode] = useState("")
    const [city, setCity] = useState([])
    const [currentState,setCurrentState]=useState('')
    const [currentCity, setCurrentCity] = useState('')
    
    function getState(countryCode) {
        setState(State.getStatesOfCountry(countryCode));
        setCountryCode(countryCode)
        
    }
    
    function getCity(stateCode) {
        setCity(City.getCitiesOfState(countryCode, stateCode))
        setCurrentState(state.find((item)=>item.isoCode===stateCode))
    }
    function cityOfState(city) {
        setCurrentCity(city)

    }

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    
    const onSubmit = (data) => {
        console.log(data)
        const address = {
            street: data.street,
            addressLine2: data.addressLine2,
            city: currentCity,
            state: currentState.name,
            pin: data.pin
        }
        const payload = {
            email: data.email,
            password: data.password,
            name: data.name,
            address:address
        }

        Post('/shop/auth/register', payload)
            .then((response) => {
                console.log(response)
                toast.success('Successfully Registered')
                navigate('/auth/login')
            })
            .catch((error) => {
            console.log(error)
        })
    }
    
    

   
    return (
        <div className="registration-container">
        <div className="registration ">
            <Form onSubmit={handleSubmit(onSubmit)} className="reg-form  h-auto p-2">
                <h2>Registration</h2>
                <hr/>
                <Form.Group className="d-flex flex-column p-1">
                    <Form.Label className="fw-bolder">Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Full Name"
                    className="p-2"
                    {...register("name",{required:true})}
                    />
                </Form.Group>
                { errors.name && <p style={{color: "red"}}>user name is Required</p>}
               
                <Form.Group className="d-flex flex-column p-1">
                    <Form.Label className="fw-bolder">Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter Email" 
                    className="p-2"
                        {...register("email",
                            {
                                required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                onChange:()=> setIsEmailRegistered(false)
                            })}
                    />
                </Form.Group>
                {errors.email && <p style={{ color: "red" }}>email is Required</p>}
                {isEmailRegistered ? <p style={{ color: "red" }}>user email is alredy exist</p> : ""}
                 
                <Form.Group className="d-flex flex-column p-1">
                    <Form.Label className="fw-bolder">Street</Form.Label>
                    <Form.Control type="text" placeholder="Enter Street" 
                    className="p-2"
                        {...register("street",
                            {
                                required: true,
                                onChange:()=> setIsEmailRegistered(false)
                            })}
                    />
                </Form.Group>
                {errors.email && <p style={{ color: "red" }}>Street is Required</p>}
                    
                <Form.Group className="d-flex flex-column p-1">
                    <Form.Label className="fw-bolder">AddressLine2</Form.Label>
                    <Form.Control type="text" placeholder="Enter AddressLine2" 
                    className="p-2"
                        {...register("addressLine2",
                            {
                                required: true,
                                onChange:()=> setIsEmailRegistered(false)
                            })}
                    />
                </Form.Group>
                {errors.email && <p style={{ color: "red" }}>addressLine2 is Required</p>}
                <Form.Group>
                {/* countryStateCity     */}
                <div className="countryStateCity">
                    <div className="d-flex flex-column p-1">        
                        <Form.Label>Country::</Form.Label>
                        <select  onChange={(e)=>getState(e.target.value)}>
                            <option>Select Country</option>
                            {Country.getAllCountries().map((countryData) => (
                                <option value={countryData.isoCode}> {countryData.name} </option>
                            ))}
                        </select>
                        
                        <Form.Label>State::</Form.Label>
                        <select onChange={(e)=>getCity(e.target.value)}>
                            <option>Select State</option>
                            {state.map((data) => (<option value={data.isoCode}>{data.name}</option>))}
                        </select>
                    </div>
                    <div className="p-1">        
                        <Form.Label>City::</Form.Label>
                        <select onChange={(e)=>cityOfState(e.target.value)}>
                            <option>Select City</option>
                            {city.map((cityData) => (<option value={cityData.name}>{cityData.name}</option>))}
                        </select>
                    
                        <Form.Control type="text" placeholder="PIN code" className="m-1"
                            {...register('pin',{required:true})}    
                                ></Form.Control>
                    </div>
                </div>
                </Form.Group>           
                <Form.Group className="d-flex flex-column p-1">
                    <Form.Label className="fw-bolder">Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password"
                    className="p-2"
                    {...register("password",{required:true , minLength:8 })}
                    />
                </Form.Group>
                {errors.password?.type === 'required' && <p style={{ color: "red" }}>password is Required</p>}
                {errors.password?.type==='minLength' && <p style={{ color: "red" }}>minimum 8 charachters Required</p>}
                
                <Form.Group className="d-flex flex-column p-1">
                    <Form.Label className="fw-bolder">Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password"
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
                </Form.Group>
                {errors.Rpassword && <p style={{ color: "red" }}>Your passwords do no match</p>}
                
                <Button type="submit" className="m-1 p-2" style={{backgroundColor:"rgb(1, 1, 10)",color:"white"}}>Submit</Button>
            </Form>
            <NavLink style={{ textDecoration: 'none' }} to='/auth/login' >Already have an account? </NavLink>
        </div>
    </div>
    )
}