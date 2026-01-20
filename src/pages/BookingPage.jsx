import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
import BookingForm from '../components/features/booking/BookingForm';
import PaymentModal from '../components/features/booking/PaymentModal';
import hotelDataRaw from '../data/hotels.json';

const BookingPage = () => {
    const { hotelId, roomId } = useParams();
    const navigate = useNavigate();

    const [hotel, setHotel] = useState(null);
    const [room, setRoom] = useState(null);
    const [showPayment, setShowPayment] = useState(false);
    const [bookingDetails, setBookingDetails] = useState(null);

    useEffect(() => {
        const foundHotel = hotelDataRaw.find((h) => h.id === parseInt(hotelId));
        if (foundHotel) {
            setHotel(foundHotel);
            const foundRoom = foundHotel.rooms.find((r) => r.id === parseInt(roomId));
            setRoom(foundRoom);
        }
    }, [hotelId, roomId]);

    const handleFormSubmit = (details) => {
        setBookingDetails(details);
        setShowPayment(true);
    };

    const handlePaymentSuccess = () => {
        setShowPayment(false);
        // Here we would effectively save the booking to a persistent store or backend
        // For now, we simulate success and redirect
        alert("Booking Confirmed! You have earned 500 Loyalty Points.");
        navigate('/');
    };

    if (!hotel || !room) return <div className="text-center mt-5">Loading booking details...</div>;

    return (
        <div>
            <NavBar />
            <div className="container mt-5 mb-5" style={{ maxWidth: '900px' }}>
                <h2 className="mb-4 text-center fw-bold">Complete Your Booking</h2>

                <div className="row">
                    <div className="col-md-5 order-md-2 mb-4">
                        <div className="card shadow-sm border-0 bg-light">
                            <div className="card-body">
                                <h5 className="card-title fw-bold">{hotel.name}</h5>
                                <p className="text-muted small mb-2">{hotel.location}</p>
                                <hr />
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Room Type:</span>
                                    <span className="fw-bold">{room.type}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Base Price:</span>
                                    <span>₹{room.price.toLocaleString()} / night</span>
                                </div>
                                <div className="mt-3 text-success small">
                                    <i className="bi bi-check-circle-fill me-1"></i> Free Cancellation
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-7 order-md-1">
                        <BookingForm hotel={hotel} room={room} onSubmit={handleFormSubmit} />
                    </div>
                </div>
            </div>

            <PaymentModal
                show={showPayment}
                onHide={() => setShowPayment(false)}
                bookingDetails={bookingDetails}
                onConfirm={handlePaymentSuccess}
            />

            <Footer />
        </div>
    );
};

export default BookingPage;
