import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addHotel, deleteHotel } from '../redux/hotelSlice';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
import HotelTable from '../components/features/dashboard/HotelTable';

const ManagerDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // Safety: Fallback to empty array if Redux state is not yet initialized
    const allHotels = useSelector((state) => state.hotels?.allHotels || []);

    const handleDelete = (id) => {
        try {
            if (window.confirm("Are you sure you want to delete this property? This action cannot be undone.")) {
                dispatch(deleteHotel(id));
            }
        } catch (error) {
            console.error("Delete Hotel Error:", error);
            navigate("/error", { 
                state: { message: "Failed to delete the hotel. Please refresh and try again." } 
            });
        }
    };

    const handleAddHotel = (e) => {
        e.preventDefault();
        try {
            const newHotel = {
                id: Date.now().toString(),
                name: "New Luxury Resort",
                location: "Goa, India",
                rating: 5.0,
                reviewsCount: 0,
                tag: "New",
                image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=500&q=60",
                provider: "Direct",
                features: ["Free WiFi", "Breakfast included"]
            };

            // Attempt to add to Redux store
            dispatch(addHotel(newHotel));
            
        } catch (error) {
            console.error("Add Hotel Error:", error);
            navigate("/error", { 
                state: { message: "An error occurred while adding the new property." } 
            });
        }
    };

    return (
        <div className="bg-light min-vh-100">
            <NavBar />
            <div className="container mt-4 mb-5" style={{ minHeight: '60vh' }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="fw-bold">Manager Dashboard</h2>
                        <p className="text-muted">Manage your listed properties and monitor performance.</p>
                    </div>
                    <button 
                        className="btn btn-success px-4 py-2 fw-bold shadow-sm" 
                        onClick={handleAddHotel}
                    >
                        <i className="bi bi-plus-lg me-2"></i>Add New Hotel
                    </button>
                </div>

                <div className="card shadow-sm border-0 rounded-4 overflow-hidden">
                    <div className="card-body p-0">
                        {/* Passing a fallback empty array to HotelTable 
                            to prevent map() errors if data is missing 
                        */}
                        <HotelTable hotels={allHotels} onDelete={handleDelete} />
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-md-4">
                        <div className="card bg-primary text-white p-4 border-0 shadow-sm rounded-4">
                            <h3 className="fw-bold mb-1">{allHotels.length}</h3>
                            <p className="mb-0 opacity-75">Active Listings</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ManagerDashboard;