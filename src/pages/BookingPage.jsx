import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addLoyaltyPoints } from "../redux/userSlice";
import { selectAllHotels } from "../redux/hotelSlice";
import roomsData from "../data/rooms.json";
import BookingForm from "../components/features/booking/BookingForm";
import PaymentModal from "../components/features/booking/PaymentModal";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";

const BookingPage = () => {
  const { hotelId, roomId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allHotels = useSelector(selectAllHotels);
  const auth = useSelector((state) => state.auth || {});
  const currentUser = auth.user;

  const [hotel, setHotel] = useState(null);
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [bookingSummary, setBookingSummary] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      const foundHotel = allHotels.find((h) => String(h.id) === String(hotelId));
      const foundRoom = roomsData.find((r) => String(r.id) === String(roomId));

      if (!foundHotel || !foundRoom) {
        return navigate("/error", {
          state: { message: "The room or hotel you are trying to book is no longer available." },
        });
      }

      setHotel(foundHotel);
      setRoom(foundRoom);
      setLoading(false);
    } catch (err) {
      console.error("Booking initialization error:", err);
      navigate("/error", { state: { message: "Unable to initialize the secure booking environment." } });
    }
  }, [hotelId, roomId, allHotels, navigate]);

  const priceCalculation = useMemo(() => {
    if (!room) return { base: 0, tax: 0, total: 0 };
    const nights = bookingSummary?.nights || 1;
    const base = room.price * nights;
    const tax = base * 0.12;
    return { base, tax, total: base + tax };
  }, [room, bookingSummary]);

  const handleFormSubmit = (formData) => {
    // 1. Update summary for the sidebar
    setBookingSummary(formData);

    // 2. ONLY show payment modal if it's the FINAL click (not typing)
    if (formData.isDraft === false) {
      setShowPayment(true);
    }
  };

  const handlePaymentConfirm = () => {
    try {
      setShowPayment(false);
      const pointsToEarn = Math.floor(priceCalculation.total / 10);

      dispatch(addLoyaltyPoints({
        points: pointsToEarn,
        activity: `Stay at ${hotel?.name}`,
        hotelName: hotel?.name,
        bookingId: `BK-${Math.floor(Math.random() * 1000000)}`,
      }));

      navigate("/loyalty", {
        replace: true,
        state: { successMessage: `Booking Successful! You've earned ${pointsToEarn.toLocaleString()} points.` },
      });
    } catch (error) {
      console.error("Post-payment processing failed:", error);
      navigate("/error", { state: { message: "Payment processed, but we couldn't update your loyalty points." } });
    }
  };

  if (loading) return <div className="text-center py-5 mt-5"><div className="spinner-border text-primary"></div></div>;

  return (
    <div className="bg-light min-vh-100">
      <NavBar />
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
              <div className="bg-primary p-3 text-white">
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
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden sticky-top" style={{ top: "2rem" }}>
              <img src={hotel?.image} className="w-100" style={{ height: "180px", objectFit: "cover" }} alt={hotel?.name} />
              <div className="card-body p-4 bg-white">
                <h6 className="fw-bold mb-3 border-bottom pb-2">Booking Summary</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">Nights</span>
                  <span className="fw-bold small">{bookingSummary?.nights || 1}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="fw-bold fs-5">Total Amount</span>
                  <h4 className="fw-bold text-primary mb-0">₹{priceCalculation.total.toLocaleString()}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PaymentModal 
        show={showPayment} 
        onHide={() => setShowPayment(false)} 
        bookingDetails={{ ...bookingSummary, total: priceCalculation.total }} 
        onConfirm={handlePaymentConfirm} 
      />
      <Footer />
    </div>
  );
};

export default BookingPage;