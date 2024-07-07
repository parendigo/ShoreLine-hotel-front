import React, {useEffect, useState} from "react"
import moment from "moment"
import {cancelBooking, getBookingByConfirmationCode} from "../utils/ApiFunctions"
import {useLocation} from "react-router-dom";

const FindBooking = () => {
    const [confirmationCode, setConfirmationCode] = useState(useLocation().state.currentBooking.bookingConfirmation)
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const emptyBookingInfo = {
        id: "",
        checkInDate: "",
        checkOutDate: "",
        guestFullName: "",
        guestEmail: "",
        numberOfAdults: 0,
        numberOfChildren: 0,
        totalNumberOfGuests: 0,
        bookingConfirmation: "",
        room: {id: "", roomType: ""},
    }
    const [bookingInfo, setBookingInfo] = useState(useLocation().state.currentBooking);
    const [isDeleted, setIsDeleted] = useState(false)

    const handleInputChange = (event) => {
        setConfirmationCode(event.target.value)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        try {
            const data = await getBookingByConfirmationCode(confirmationCode)
            setBookingInfo(data)
            setError(null)
        } catch (error) {
            setBookingInfo(emptyBookingInfo)
            setError(error.message)
        }

        setTimeout(() => setIsLoading(false), 2000)
    }

    const handleBookingCancellation = async (bookingId) => {
        try {
            await cancelBooking(bookingInfo.id)
            setIsDeleted(true)
            setSuccessMessage("Booking has been cancelled successfully!")
            setBookingInfo(emptyBookingInfo)
            setConfirmationCode("")
            setError(null)
        } catch (error) {
            setError(error.message)
        }
        setTimeout(() => {
            setSuccessMessage("")
            setIsDeleted(false)
        }, 2000)
    }

    return (
        <>
            <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
                <h2 className="text-center mb-4">My Booking</h2>
                <form onSubmit={handleFormSubmit} className="col-md-6">
                    <div className="input-group mb-3">
                        <input
                            className="form-control"
                            type="text"
                            id="confirmationCode"
                            name="confirmationCode"
                            defaultValue={confirmationCode}
                            onChange={handleInputChange}
                            placeholder="Enter the booking confirmation code"
                        />

                        <button type="submit" className="btn btn-hotel input-group-text">
                            Find booking
                        </button>
                    </div>
                </form>
                {isLoading ? (
                    <div>Finding your booking...</div>
                ) : error ? (
                    <div className="text-danger">Error: {error}</div>
                ) : confirmationCode ? (
                    <div className="col-md-6 mt-4 mb-5">
                        <h3>Booking Information</h3>
                        <p className="text-success">Confirmation Code: {bookingInfo.bookingConfirmation}</p>
                        <p>Room Number: {bookingInfo.room.id}</p>
                        <p>Room Type: {bookingInfo.room.roomType}</p>
                        <p>
                            Check-in Date:{" "}
                            {moment(bookingInfo.checkInDate).subtract(1, "month").format("MMM Do, YYYY")}
                        </p>
                        <p>
                            Check-out Date:{" "}
                            {moment(bookingInfo.checkOutDate).subtract(1, "month").format("MMM Do, YYYY")}
                        </p>
                        <p>Full Name: {bookingInfo.guestFullName}</p>
                        <p>Email Address: {bookingInfo.guestEmail}</p>
                        <p>Adults: {bookingInfo.numberOfAdults}</p>
                        <p>Children: {bookingInfo.numberOfChildren}</p>
                        <p>Total Guest: {bookingInfo.totalNumberOfGuests}</p>

                        {!isDeleted && (
                            <button
                                onClick={() => handleBookingCancellation(bookingInfo.id)}
                                className="btn btn-danger">
                                Cancel Booking
                            </button>
                        )}
                    </div>
                ) : (
                    <div>Still loading</div>
                )}

                {isDeleted && <div className="alert alert-success mt-3 fade show">{successMessage}</div>}
            </div>
        </>
    )
}

export default FindBooking