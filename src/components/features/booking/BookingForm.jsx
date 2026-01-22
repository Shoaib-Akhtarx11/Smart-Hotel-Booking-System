import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = ({ hotel, room, initialEmail, onSubmit }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
    const [guestDetails, setGuestDetails] = useState({
        firstName: '',
        lastName: '',
        email: initialEmail || '',
        phone: ''
    });

    const calculateNights = () => {
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 1;
    };

    const nights = calculateNights();

    // LIVE UPDATE EFFECT: Updates the sidebar but does NOT open the modal
    useEffect(() => {
        const timer = setTimeout(() => {
            onSubmit({
                ...guestDetails,
                checkIn: startDate,
                checkOut: endDate,
                nights: nights,
                isDraft: true // Key: Tells parent NOT to show the modal
            });
        }, 500); 
        return () => clearTimeout(timer);
    }, [startDate, endDate, guestDetails]);

    // FINAL SUBMIT: Triggered ONLY by the button click
    const handleFinalSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...guestDetails,
            checkIn: startDate,
            checkOut: endDate,
            nights: nights,
            isDraft: false // Key: Tells parent TO show the modal
        });
    };

    return (
        <form onSubmit={handleFinalSubmit} className="border-0 p-2">
            <div className="row g-3 mb-4">
                <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">First Name</label>
                    <input type="text" className="form-control rounded-3" required value={guestDetails.firstName}
                        onChange={(e) => setGuestDetails({ ...guestDetails, firstName: e.target.value })} />
                </div>
                <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Last Name</label>
                    <input type="text" className="form-control rounded-3" required value={guestDetails.lastName}
                        onChange={(e) => setGuestDetails({ ...guestDetails, lastName: e.target.value })} />
                </div>
                <div className="col-md-12">
                    <label className="form-label small fw-bold text-muted">Email Address</label>
                    <input type="email" className="form-control rounded-3" required value={guestDetails.email}
                        onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })} />
                </div>
                <div className="col-md-12">
                    <label className="form-label small fw-bold text-muted">Phone Number</label>
                    <input type="tel" className="form-control rounded-3" required value={guestDetails.phone}
                        onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })} />
                </div>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Check-in</label>
                    <DatePicker selected={startDate} className="form-control w-100" minDate={new Date()}
                        onChange={(date) => { setStartDate(date); if (date >= endDate) setEndDate(new Date(date.getTime() + 86400000)); }} />
                </div>
                <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Check-out</label>
                    <DatePicker selected={endDate} className="form-control w-100" minDate={new Date(startDate.getTime() + 86400000)}
                        onChange={(date) => setEndDate(date)} />
                </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100 py-3 fw-bold rounded-pill">
                Continue to Payment <i className="bi bi-arrow-right ms-2"></i>
            </button>
        </form>
    );
};

export default BookingForm;