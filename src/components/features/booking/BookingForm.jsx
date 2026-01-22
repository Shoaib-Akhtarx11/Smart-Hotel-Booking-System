import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = ({ hotel, room, initialEmail, onSubmit }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
    const [guestDetails, setGuestDetails] = useState({
        firstName: '',
        lastName: '',
        email: initialEmail || '', // Pre-fill from Redux auth if available
        phone: ''
    });

    const calculateNights = () => {
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 1;
    };

    const nights = calculateNights();
    const totalAmount = (room?.price || 0) * nights;
    // Dynamic points: 1 point per 10 rupees spent
    const potentialPoints = Math.floor(totalAmount / 10);

    // Auto-update the parent summary whenever nights or details change
    // This makes the right-hand sidebar on the BookingPage update in real-time
    useEffect(() => {
        const timer = setTimeout(() => {
            onSubmit({
                ...guestDetails,
                checkIn: startDate,
                checkOut: endDate,
                totalPrice: totalAmount,
                nights: nights,
                earnedPoints: potentialPoints,
                isDraft: true // Flag to tell parent this isn't the final submission yet
            });
        }, 500); 
        return () => clearTimeout(timer);
    }, [startDate, endDate, guestDetails]);

    const handleFinalSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...guestDetails,
            checkIn: startDate,
            checkOut: endDate,
            totalPrice: totalAmount,
            nights: nights,
            earnedPoints: potentialPoints,
            isDraft: false
        });
    };

    return (
        <form onSubmit={handleFinalSubmit} className="border-0 p-2">
            {/* Section: Guest Details */}
            <div className="d-flex align-items-center mb-4">
                <div className="bg-primary bg-opacity-10 p-2 rounded-3 me-3">
                    <i className="bi bi-person-badge text-primary fs-4"></i>
                </div>
                <h4 className="mb-0 fw-bold">Guest Details</h4>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">First Name</label>
                    <input
                        type="text"
                        className="form-control form-control-lg fs-6 rounded-3 shadow-sm border-light-subtle"
                        placeholder="John"
                        required
                        value={guestDetails.firstName}
                        onChange={(e) => setGuestDetails({ ...guestDetails, firstName: e.target.value })}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Last Name</label>
                    <input
                        type="text"
                        className="form-control form-control-lg fs-6 rounded-3 shadow-sm border-light-subtle"
                        placeholder="Doe"
                        required
                        value={guestDetails.lastName}
                        onChange={(e) => setGuestDetails({ ...guestDetails, lastName: e.target.value })}
                    />
                </div>
                <div className="col-md-12">
                    <label className="form-label small fw-bold text-muted">Email Address</label>
                    <input
                        type="email"
                        className="form-control form-control-lg fs-6 rounded-3 shadow-sm border-light-subtle"
                        placeholder="john.doe@example.com"
                        required
                        value={guestDetails.email}
                        onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                    />
                </div>
                <div className="col-md-12">
                    <label className="form-label small fw-bold text-muted">Phone Number</label>
                    <input
                        type="tel"
                        className="form-control form-control-lg fs-6 rounded-3 shadow-sm border-light-subtle"
                        placeholder="+91 98765 43210"
                        required
                        value={guestDetails.phone}
                        onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                    />
                </div>
            </div>

            {/* Section: Stay Dates */}
            <div className="d-flex align-items-center mb-4 mt-2">
                <div className="bg-primary bg-opacity-10 p-2 rounded-3 me-3">
                    <i className="bi bi-calendar-check text-primary fs-4"></i>
                </div>
                <h4 className="mb-0 fw-bold">Stay Dates</h4>
            </div>

            <div className="row g-3 mb-4">
                <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Check-in</label>
                    <div className="input-group">
                        <span className="input-group-text bg-white border-light-subtle rounded-start-3">
                            <i className="bi bi-calendar3 text-primary"></i>
                        </span>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => {
                                setStartDate(date);
                                if (date >= endDate) {
                                    const nextDay = new Date(date);
                                    nextDay.setDate(date.getDate() + 1);
                                    setEndDate(nextDay);
                                }
                            }}
                            className="form-control form-control-lg fs-6 border-light-subtle rounded-end-3 w-100"
                            minDate={new Date()}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Check-out</label>
                    <div className="input-group">
                        <span className="input-group-text bg-white border-light-subtle rounded-start-3">
                            <i className="bi bi-calendar3 text-primary"></i>
                        </span>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            className="form-control form-control-lg fs-6 border-light-subtle rounded-end-3 w-100"
                            minDate={new Date(new Date(startDate).setDate(startDate.getDate() + 1))}
                        />
                    </div>
                </div>
            </div>

            {/* Section: Rewards & CTA */}
            <div className="bg-primary bg-opacity-10 rounded-4 p-3 mb-4 d-flex align-items-center justify-content-between border border-primary border-opacity-25">
                <div className="d-flex align-items-center">
                    <i className="bi bi-gift-fill text-primary fs-4 me-3"></i>
                    <div>
                        <p className="mb-0 fw-bold text-primary">Loyalty Rewards</p>
                        <small className="text-muted">You'll earn {potentialPoints} points with this stay</small>
                    </div>
                </div>
                <i className="bi bi-info-circle text-muted" title="1 point per ₹10 spent"></i>
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-100 py-3 fw-bold rounded-pill shadow">
                Continue to Payment <i className="bi bi-arrow-right ms-2"></i>
            </button>
        </form>
    );
};

export default BookingForm;