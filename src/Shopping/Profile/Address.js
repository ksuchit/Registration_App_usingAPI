import { useState } from "react"
import {Country,State,City} from 'country-state-city'
import { useForm } from "react-hook-form";
import { Post } from "../services/Http-Service";
import { Button, Form, Modal } from "react-bootstrap";

export default function Address(props) {
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    
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

    const onSubmit = (data) => {
        console.log('onsubmit')

        const address = {
            street: data.street,
            addressLine2: data.addressLine2,
            city: currentCity,
            state: currentState.name,
            pin: data.pin
        }
        console.log(address)

        Post('/customers/address', address)
            .then((response) => {
                console.log(response)
                props.setAddress((prev) => [...prev, address])
                props.setShow(false)
            })
            .catch((error) => {
            console.log(error)
            })
    }

    const onExitModal = () => {
        console.log('on exit modal')
        reset();
    }
    return (
        <div>
            <Modal
                show={props.show}
                onHide={()=>props.setShow(false)}
                backdrop="static"
                keyboard={false}
                onExit={()=>onExitModal()}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        
                        <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="d-flex flex-column p-1">
                    <Form.Label className="fw-bolder">Street</Form.Label>
                    <Form.Control type="text" placeholder="Enter Street" 
                    className="p-2"
                        {...register("street",
                            {
                                required: true,
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
                <Button type="submit" className="btn btn-secondary my2">Submit</Button>            
                </Form>
                    </div>
                    </Modal.Body>
        </Modal>
        </div>
    )
}