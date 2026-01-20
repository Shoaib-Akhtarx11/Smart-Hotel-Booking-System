import React, { useState, useEffect } from 'react';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
import HotelTable from '../components/features/dashboard/HotelTable';
import hotelDataRaw from '../data/hotels.json';

const ManagerDashboard = () => {
    const [hotels, setHotels] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        // Load data initially
        setHotels(hotelDataRaw);
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to remove this hotel?")) {
            setHotels(hotels.filter(h => h.id !== id));
        }
    };

    const handleAddHotel = (e) => {
        e.preventDefault();
        // In a real app we'd gather form data here. Adding a stub for now.
        const newHotel = {
            id: hotels.length + 1,
            name: "New Hotel Property",
            location: "New Location",
            image: "https://via.placeholder.com/150",
            rooms: []
        };
        setHotels([...hotels, newHotel]);
        alert("Dummy Hotel Added!");
    };

    return (
        <div>
            <NavBar />
            <div className="container mt-4 mb-5" style={{ minHeight: '60vh' }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="fw-bold">Manager Dashboard</h2>
                        <p className="text-muted">Manage your listed properties and rooms.</p>
                    </div>
                    <button className="btn btn-success" onClick={handleAddHotel}>+ Add New Hotel</button>
                </div>

                <div className="card shadow-sm border-0">
                    <div className="card-body p-0">
                        <HotelTable hotels={hotels} onDelete={handleDelete} />
                    </div>
                </div>

                {/* Stats Section */}
                <div className="row mt-4">
                    <div className="col-md-4">
                        <div className="card bg-primary text-white p-3 shadow-sm">
                            <h3>{hotels.length}</h3>
                            <p className="mb-0">Active Listings</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card bg-warning p-3 shadow-sm">
                            <h3>12</h3>
                            <p className="mb-0">Pending Bookings</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card bg-info text-white p-3 shadow-sm">
                            <h3>₹45k</h3>
                            <p className="mb-0">Total Revenue</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ManagerDashboard;
