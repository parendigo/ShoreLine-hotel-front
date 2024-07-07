import React, {useEffect, useState} from 'react';
import {bookRoom, getRoomById} from "../utils/ApiFunctions.js";
import {useNavigate, useParams} from "react-router-dom";
import moment from "moment";
import {Form, FormControl} from "react-bootstrap";
import BookingSummary from "./BookingSummary.jsx";

const BookingForm = () => {
    const [isValidated, setIsValidated] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [roomPrice, setRoomPrice] = useState(0);
    const email = localStorage.getItem("userEmail");
    const currentDate = new Date().toISOString().split('T')[0]

    const [booking, setBooking] = useState({
        guestFullName: "",
        guestEmail: email,
        checkInDate: currentDate,
        checkOutDate: "",
        numberOfAdults: "",
        numberOfChildren: ""
    });



    const {roomId} = useParams()
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        console.log(email)
        console.log(currentDate)
        const {name, value} = e.target;
        setBooking({...booking, [name]: value})
        setErrorMessage("")
    }

    const getRoomPriceById = async (roomId) => {
        try {
            const response = await getRoomById(roomId)
            setRoomPrice(response.roomPrice)
        } catch (e) {
            throw new Error(e)
        }
    }

    useEffect(() => {
        getRoomPriceById(roomId);
    }, [roomId]);

    const calculatePayment = () => {
        const checkInDate = moment(booking.checkInDate)
        const checkOutDate = moment(booking.checkOutDate)
        const diffInDays = checkOutDate.diff(checkInDate, "days")
        const paymentPerDay = roomPrice ? roomPrice : 0
        return diffInDays * paymentPerDay
    }

    const isGuestCountValid = () => {
        const adultCount = parseInt(booking.numberOfAdults)
        const childrenCount = parseInt(booking.numberOfChildren)
        const total = adultCount + childrenCount
        return total > 0 && adultCount > 0
    }

    const isCheckOutDateValid = () => {
        if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
            setErrorMessage("Check-out date must come after check-in date")
            return false;
        } else {
            setErrorMessage("")
            return true;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.currentTarget;
        if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
            e.stopPropagation()
        } else {
            setIsSubmitted(true)
            setIsValidated(true)
        }
    }

    const handleBooking = async () => {
        try {
            const confirmationCode = await bookRoom(roomId, booking)
            setIsSubmitted(true)
            navigate("/booking-success", {state: {message: confirmationCode}})
        } catch (e) {
            setErrorMessage(e.message)
            navigate("/booking-success", {state: {error: errorMessage}})
        }
    }

    return (
        <>
            <div className='container mb-5'>
                <div className="row">
                    <div className="col-md-7">
                        <div className='card card-body mt-5'>
                            <h4 className='card card-title'> Book room </h4>
                            <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label htmlFor="guestFullName">Full name: </Form.Label>
                                    <FormControl
                                        required
                                        type="text"
                                        id="guestFullName"
                                        name="guestFullName"
                                        value={booking.guestFullName}
                                        placeholder="Enter your full name"
                                        onChange={handleInputChange}/>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your full name.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="guestEmail">Email: </Form.Label>
                                    <FormControl
                                        required
                                        type="email"
                                        id="guestEmail"
                                        name="guestEmail"
                                        value={booking.guestEmail}
                                        placeholder="Enter your email"
                                        onChange={handleInputChange}/>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your email.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <fieldset style={{border: "2px"}}>
                                    <legend>Login period</legend>
                                    <div className="row">
                                        <div className="col-6">
                                            <Form.Group>
                                                <Form.Label htmlFor="checkInDate">Check-in date: </Form.Label>
                                                <FormControl
                                                    required
                                                    type="date"
                                                    id="checkInDate"
                                                    name="checkInDate"
                                                    value={booking.checkInDate}
                                                    placeholder="Check-in date"
                                                    min={currentDate}
                                                    onChange={handleInputChange}/>
                                                <Form.Control.Feedback type="invalid">
                                                    Please select check-in date.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                        <div className="col-6">
                                            <Form.Group>
                                                <Form.Label htmlFor="checkOutDate">Check-out date: </Form.Label>
                                                <FormControl
                                                    required
                                                    type="date"
                                                    id="checkOutDate"
                                                    name="checkOutDate"
                                                    value={booking.checkOutDate}
                                                    placeholder="Check-out date"
                                                    min={moment().format("dd.mm.yyyy")}
                                                    onChange={handleInputChange}/>
                                                <Form.Control.Feedback type="invalid">
                                                    Please select check-out date.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                        {errorMessage && <p className='text-danger'>{errorMessage}</p>}
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <legend>Number of Guests</legend>
                                    <div className='row'>
                                        <div className="col-6">
                                            <Form.Group>
                                                <Form.Label htmlFor="numberOfAdults">Adults: </Form.Label>
                                                <FormControl
                                                    required
                                                    type="number"
                                                    id="numberOfAdults"
                                                    name="numberOfAdults"
                                                    value={booking.numberOfAdults}
                                                    placeholder="0"
                                                    min={1}
                                                    onChange={handleInputChange}/>
                                                <Form.Control.Feedback type="invalid">
                                                    Please select at least one adult.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                        <div className="col-6">
                                            <Form.Group>
                                                <Form.Label htmlFor="numberOfChildren">Children: </Form.Label>
                                                <FormControl
                                                    required
                                                    type="number"
                                                    id="numberOfChildren"
                                                    name="numberOfChildren"
                                                    value={booking.numberOfChildren}
                                                    placeholder="0"
                                                    onChange={handleInputChange}/>
                                            </Form.Group>
                                        </div>
                                    </div>
                                </fieldset>
                                <div className='form-group mt-2 mb-2'>
                                    <button type='submit' className='btn btn-hotel'>Continue</button>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        {isSubmitted && (
                            <BookingSummary
                                booking={booking}
                                payment={calculatePayment()}
                                isFormValid={isValidated}
                                onConfirm={handleBooking}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingForm;