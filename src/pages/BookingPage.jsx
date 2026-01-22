import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addLoyaltyPoints } from '../redux/userSlice';
import { selectAllHotels } from '../redux/hotelSlice';
import roomsData from '../data/rooms.json'; 
import BookingForm from '../components/features/booking/BookingForm';
import PaymentModal from '../components/features/booking/PaymentModal';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';

const BookingPage = () => {
    const { hotelId, roomId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 1. Redux Selectors
    const allHotels = useSelector(selectAllHotels);
    const auth = useSelector((state) => state.auth || {});
    const currentUser = auth.user;

    // 2. Local State
    const [hotel, setHotel] = useState(null);
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPayment, setShowPayment] = useState(false);
    const [bookingSummary, setBookingSummary] = useState(null);

    // 3. Initialization Logic
    useEffect(() => {
        window.scrollTo(0, 0);
        try {
            // Find Hotel from Redux (ensuring string comparison)
            const foundHotel = allHotels.find(h => String(h.id) === String(hotelId));
            
            // Find Room from JSON
            const foundRoom = roomsData.find(r => String(r.id) === String(roomId));

            if (!foundHotel || !foundRoom) {
                return navigate('/error', { 
                    state: { message: "The room or hotel you are trying to book is no longer available." } 
                });
            }

            setHotel(foundHotel);
            setRoom(foundRoom);
            setLoading(false);
        } catch (err) {
            console.error("Booking initialization error:", err);
            navigate('/error', { state: { message: "Unable to initialize the secure booking environment." } });
        }
    }, [hotelId, roomId, allHotels, navigate]);

    // 4. Price Calculation (Memoized)
    const priceCalculation = useMemo(() => {
        if (!room) return { base: 0, tax: 0, total: 0 };
        const nights = bookingSummary?.nights || 1;
        const base = room.price * nights;
        const tax = base * 0.12; // 12% GST
        return { base, tax, total: base + tax };
    }, [room, bookingSummary]);

    // 5. Handlers
    const handleFormSubmit = (formData) => {
        // formData from BookingForm should include { firstName, lastName, email, nights, etc. }
        setBookingSummary(formData);
        setShowPayment(true);
    };

    const handlePaymentConfirm = () => {
        try {
            // Calculate points: ₹10 spent = 1 point
            const pointsToEarn = Math.floor(priceCalculation.total / 10);
            
            // Dispatch to userSlice (Matches the property names: points, activity)
            dispatch(addLoyaltyPoints({
                points: pointsToEarn,
                activity: `Stay at ${hotel?.name}`, 
                hotelName: hotel?.name, // Extra meta-data for safety
                bookingId: `BK-${Math.floor(Math.random() * 1000000)}`
            }));

            setShowPayment(false);
            
            // Navigate to Success (Loyalty) Page with a state message
            navigate('/loyalty', { 
                state: { successMessage: `Booking Successful! You've earned ${pointsToEarn.toLocaleString()} points.` } 
            });
        } catch (error) {
            console.error("Post-payment processing failed:", error);
            navigate('/error', { 
                state: { message: "Payment processed, but we couldn't update your loyalty points. Please contact support." } 
            });
        }
    };

    if (loading) return (
        <div className="container py-5 text-center min-vh-100 d-flex flex-column align-items-center justify-content-center">
            <div className="spinner-border text-primary mb-3" role="status"></div>
            <p className="fw-bold text-muted">Securing your booking environment...</p>
        </div>
    );

    return (
        <div className="bg-light min-vh-100">
            <NavBar />
            
            <div className="container py-5">
                <div className="row g-4">
                    {/* Left Column: Form */}
                    <div className="col-lg-8">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-4 small">
                                <li className="breadcrumb-item"><a href="/" className="text-decoration-none text-muted">Home</a></li>
                                <li className="breadcrumb-item"><a href={`/hotel/${hotelId}`} className="text-decoration-none text-muted">{hotel?.name}</a></li>
                                <li className="breadcrumb-item active fw-bold text-primary">Secure Checkout</li>
                            </ol>
                        </nav>
                        
                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
                            <div className="bg-primary p-3 text-white d-flex align-items-center">
                                <i className="bi bi-shield-lock-fill me-2 fs-5"></i>
                                <h5 className="mb-0">Guest Information</h5>
                            </div>
                            <div className="p-4 bg-white">
                                <BookingForm 
                                    hotel={hotel} 
                                    room={room} 
                                    initialEmail={currentUser?.email} 
                                    onSubmit={handleFormSubmit} 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sidebar Summary */}
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden sticky-top" style={{ top: '2rem' }}>
                            <img 
                                src={hotel?.image} 
                                className="w-100" 
                                style={{ height: '180px', objectFit: 'cover' }} 
                                alt={hotel?.name} 
                            />
                            <div className="card-body p-4 bg-white">
                                <h6 className="fw-bold mb-3 border-bottom pb-2">Booking Summary</h6>
                                
                                <div className="mb-4">
                                    <p className="fw-bold mb-0 text-dark">{hotel?.name}</p>
                                    <p className="text-muted small mb-0">
                                        <i className="bi bi-geo-alt me-1"></i>{hotel?.location}
                                    </p>
                                    <span className="badge bg-info-subtle text-info rounded-pill mt-2">
                                        {room?.type}
                                    </span>
                                </div>

                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted small">Nights</span>
                                    <span className="fw-bold small">{bookingSummary?.nights || 1}</span>
                                </div>

                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted small">Base Price</span>
                                    <span className="fw-bold small">₹{priceCalculation.base.toLocaleString()}</span>
                                </div>
                                
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-muted small">Taxes & Fees (12%)</span>
                                    <span className="text-muted small">₹{priceCalculation.tax.toLocaleString()}</span>
                                </div>

                                <hr className="my-3" />
                                
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="fw-bold fs-5">Total Amount</span>
                                    <h4 className="fw-bold text-primary mb-0">₹{priceCalculation.total.toLocaleString()}</h4>
                                </div>
                                
                                <div className="mt-4 p-3 bg-success bg-opacity-10 rounded-3 border border-success border-opacity-10">
                                    <div className="d-flex align-items-center text-success small fw-bold">
                                        <i className="bi bi-gift-fill me-2"></i>
                                        Loyalty Reward: ~{Math.floor(priceCalculation.total / 10)} pts
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <PaymentModal 
                show={showPayment}
                onHide={() => setShowPayment(false)}
                bookingDetails={{
                    ...bookingSummary, 
                    total: priceCalculation.total,
                    hotelName: hotel?.name,
                    roomType: room?.type
                }}
                onConfirm={handlePaymentConfirm}
            />

            <Footer />
        </div>
    );
};

export default BookingPage;