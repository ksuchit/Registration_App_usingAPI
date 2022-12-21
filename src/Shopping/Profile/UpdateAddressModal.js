import { useState } from "react"
import { AiFillDelete } from "react-icons/ai"
import { Country, State, City } from 'country-state-city'
import { useForm } from "react-hook-form";
import { Put } from "../Services/HttpService";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-hot-toast";

export default function UpdateAddressModal(props) {

    const {
        register,
        handleSubmit,
        resetField,
        formState: { errors },
    } = useForm(
        {
            defaultValues:{
                street: props.updateAdd.street,
                addressLine2: props.updateAdd.addressLine2,
                pin: props.updateAdd.pin
            }
        }
    );

    const [state, setState] = useState([]);
    const [countryCode, setCountryCode] = useState("")
    const [city, setCity] = useState([])
    const [currentState, setCurrentState] = useState('')
    const [currentCity, setCurrentCity] = useState('')

    function getState(countryCode) {
        setState(State.getStatesOfCountry(countryCode));
        setCountryCode(countryCode)

    }

    function getCity(stateCode) {
        setCity(City.getCitiesOfState(countryCode, stateCode))
        setCurrentState(state.find((item) => item.isoCode === stateCode))
    }
    function cityOfState(city) {
        setCurrentCity(city)

    }

    const onSubmit = (data) => {
        console.log('onsubmit')
        console.log(data)

        const address = {
            street: data.street,
            addressLine2: data.addressLine2,
            city: currentCity || props.updateAdd.city,
            state: currentState.name || props.updateAdd.state,
            pin: data.pin
        }
        console.log(address)
        Put(`/customers/address/${props.updateAdd._id}`,address)
            .then((response) => {
            console.log(response)
                props.setShow(false)
                props.setAddress((prev) => prev.map((item) =>
                    {if(item._id === props.updateAdd._id) {
                        item=address
                    }
                    return item}
                ))
            toast.success('Address Successfully Updated') 
            })
            .catch((error) => {
            console.log(error)
        })
    }

    const onExitModal=()=>{
        console.log('onExitModal')
        resetField('street');
        resetField('addressLine2');
        resetField('pin')
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
                <Modal.Title>Update Address</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="d-flex flex-column p-1">
                        <Form.Label className="fw-bolder">Street</Form.Label>
                        <Form.Control type="text" 
                            className="p-2" defaultValue={props.updateAdd.street}
                            {...register("street",
                                {
                                    required: true
                                })}
                        />
                    </Form.Group>
                    {errors.email && <p style={{ color: "red" }}>Street is Required</p>}

                    <Form.Group className="d-flex flex-column p-1">
                        <Form.Label className="fw-bolder">AddressLine2</Form.Label>
                        <Form.Control type="text"
                            className="p-2" defaultValue={props.updateAdd.addressLine2}
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
                                <select onChange={(e) => getState(e.target.value)}>
                                    <option>Select Country</option>
                                    {Country.getAllCountries().map((countryData) => (
                                        <option value={countryData.isoCode}> {countryData.name} </option>
                                    ))}
                                </select>

                                <Form.Label>State::</Form.Label>
                                <select onChange={(e) => getCity(e.target.value)}>
                                    <option>Select State</option>
                                    {state.map((data) => (<option value={data.isoCode}>{data.name}</option>))}
                                </select>
                            </div>
                            <div className="p-1">
                                <Form.Label>City::</Form.Label>
                                <select onChange={(e) => cityOfState(e.target.value)}>
                                    <option>Select City</option>
                                    {city.map((cityData) => (<option value={cityData.name}>{cityData.name}</option>))}
                                </select>

                                <Form.Control type="text" className="m-1"
                                    defaultValue={props.updateAdd.pin}
                                    {...register('pin', { required: true })}
                                ></Form.Control>
                            </div>
                        </div>
                    </Form.Group>
                    <Button className="btn btn-secondary" type="submit">Submit</Button>
                </Form>
            </div>
            </Modal.Body>
            </Modal>
        </div>
    )
}