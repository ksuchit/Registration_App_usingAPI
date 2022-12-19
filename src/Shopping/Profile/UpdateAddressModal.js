import { useState } from "react"
import { AiFillDelete } from "react-icons/ai"
import { Button, Form } from "semantic-ui-react";
import { Country, State, City } from 'country-state-city'
import { useForm } from "react-hook-form";
import { Post, Put } from "../Services/HttpService";
import { Modal } from "react-bootstrap";
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
                street: props.updateAdd?.street,
                addressLine2: props.updateAdd?.addressLine2,
                city: props.updateAdd?.city,
                state: props.updateAdd?.state,
                pin: props.updateAdd?.pin
            }
        }
    );


    const [additionalInfo, setAdditionalInfo] = useState([])
    console.log(additionalInfo)

    const deleteAdditionalInfo = (index) => {
        console.log('delete')
        setAdditionalInfo((prev) => prev.filter((item, i) => i !== index))
        const id = additionalInfo.find((item, i) => i === index)
        console.log(id)
    }
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
            toast.success('Address Successfully Updated') 
            })
            .catch((error) => {
            console.log(error)
        })
    }

    const onExitModal=()=>{
        console.log('onExitModal')
        resetField('street')
        resetField('addressLine2')
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
                    <Form.Field className="d-flex flex-column p-1">
                        <label className="fw-bolder">Street</label>
                        <input type="text" placeholder="Enter Street"
                            className="p-2" defaultValue={props.updateAdd.street}
                            {...register("street",
                                {
                                    required: true
                                })}
                        />
                    </Form.Field>
                    {errors.email && <p style={{ color: "red" }}>Street is Required</p>}

                    <Form.Field className="d-flex flex-column p-1">
                        <label className="fw-bolder">AddressLine2</label>
                        <input type="text" placeholder="Enter AddressLine2"
                            className="p-2" defaultValue={props.updateAdd.addressLine2}
                            {...register("addressLine2",
                                {
                                    required: true,
                                })}
                        />
                    </Form.Field>
                    {errors.email && <p style={{ color: "red" }}>addressLine2 is Required</p>}
                    <Form.Field>
                        {/* countryStateCity     */}
                        <div className="countryStateCity">
                            <div className="d-flex flex-column p-1">
                                <label>Country::</label>
                                <select onChange={(e) => getState(e.target.value)}>
                                    <option>Select Country</option>
                                    {Country.getAllCountries().map((countryData) => (
                                        <option value={countryData.isoCode}> {countryData.name} </option>
                                    ))}
                                </select>

                                <label>State::</label>
                                <select onChange={(e) => getCity(e.target.value)}>
                                    <option>Select State</option>
                                    {state.map((data) => (<option value={data.isoCode}>{data.name}</option>))}
                                </select>
                            </div>
                            <div className="p-1">
                                <label>City::</label>
                                <select onChange={(e) => cityOfState(e.target.value)}>
                                    <option>Select City</option>
                                    {city.map((cityData) => (<option value={cityData.name}>{cityData.name}</option>))}
                                </select>

                                <input type="text" placeholder="PIN code" className="m-1"
                                    defaultValue={props.updateAdd.pin}
                                    {...register('pin', { required: true })}
                                ></input>
                            </div>
                        </div>
                    </Form.Field>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
            </Modal.Body>
            </Modal>
        </div>
    )
}