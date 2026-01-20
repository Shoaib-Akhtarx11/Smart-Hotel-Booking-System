import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = ({ hotel, room, onSubmit }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
    const [guestDetails, setGuestDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    const calculateTotal = () => {
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return room.price * diffDays;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...guestDetails,
            checkIn: startDate,
            checkOut: endDate,
            totalPrice: calculateTotal()
        });
    };

    return (
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
            <h4 className="mb-4">Guest Details</h4>

            <div className="row mb-3">
                <div className="col-md-6">
                    <label className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        required
                        value={guestDetails.firstName}
                        onChange={(e) => setGuestDetails({ ...guestDetails, firstName: e.target.value })}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        required
                        value={guestDetails.lastName}
                        onChange={(e) => setGuestDetails({ ...guestDetails, lastName: e.target.value })}
                    />
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                    type="email"
                    className="form-control"
                    required
                    value={guestDetails.email}
                    onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                    type="tel"
                    className="form-control"
                    required
                    value={guestDetails.phone}
                    onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                />
            </div>

            <h4 className="mt-4 mb-3">Stay Dates</h4>
            <div className="row mb-4">
                <div className="col-md-6">
                    <label className="form-label">Check-in</label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="form-control"
                        minDate={new Date()}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Check-out</label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        className="form-control"
                        minDate={startDate}
                    />
                </div>
            </div>

            <div className="alert alert-info">
                <div className="d-flex justify-content-between">
                    <span>Total Price:</span>
                    <strong>₹{calculateTotal().toLocaleString()}</strong>
                </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
                Proceed to Payment
            </button>
        </form>
    );
};

export default BookingForm;
