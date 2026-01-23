import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { deleteHotel } from '../redux/hotelSlice';
import ConfirmDialog from '../components/common/ConfirmDialog';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
import HotelTable from '../components/features/dashboard/HotelTable';
import { FaBuilding, FaBed, FaCalendarCheck, FaChartBar, FaStar } from 'react-icons/fa';

const ManagerDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('hotels');
    const [searchRoom, setSearchRoom] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [hotelToDelete, setHotelToDelete] = useState(null);
    
    // Get current manager from auth state
    const auth = useSelector((state) => state.auth);
    const currentManager = auth.user;
    const managerId = currentManager?.id;
    
    // Get data from Redux
    const allHotels = useSelector((state) => state.hotels?.allHotels || []);
    const allRooms = useSelector((state) => state.rooms?.allRooms || []);
    const allBookings = useSelector((state) => state.bookings?.allBookings || []);
    const allReviews = useSelector((state) => state.reviews?.allReviews || []);
    
    // Filter hotels to only show those managed by current manager
    const managerHotels = allHotels.filter(hotel => hotel.managerId === managerId);
    
    // Get rooms for manager's hotels
    const managerHotelIds = managerHotels.map(h => h.id);
    const managerRooms = allRooms.filter(room => managerHotelIds.includes(room.hotelId));
    
    // Get bookings for manager's rooms
    const managerBookings = allBookings.filter(booking => 
        managerHotelIds.includes(booking.hotelId)
    );

    // Get reviews for manager's hotels
    const managerReviews = allReviews.filter(review => 
        managerHotelIds.includes(review.hotelId) && !review.isDeleted
    );
    
    // Calculate average rating from reviews
    const avgRating = managerReviews.length > 0 
        ? (managerReviews.reduce((sum, r) => sum + r.rating, 0) / managerReviews.length).toFixed(1)
        : 0;

    const handleDeleteHotel = (id) => {
        setHotelToDelete(id);
        setShowDeleteConfirm(true);
    };

    const confirmDeleteHotel = () => {
        try {
            if (hotelToDelete) {
                dispatch(deleteHotel(hotelToDelete));
                setShowDeleteConfirm(false);
                setHotelToDelete(null);
            }
        } catch (error) {
            console.error("Delete Hotel Error:", error);
            navigate("/error", { 
                state: { message: "Failed to delete the hotel. Please refresh and try again." } 
            });
        }
    };

    // Statistics
    const totalHotels = managerHotels.length;
    const totalRooms = managerRooms.length;
    const totalBookings = managerBookings.length;
    const confirmedBookings = managerBookings.filter(b => b.status === 'Confirmed').length;

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
            <NavBar />
            <div className="container-fluid mt-4 mb-5 flex-grow-1" style={{ maxWidth: '1400px' }}>
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="fw-bold">🏨 Manager Dashboard</h2>
                        <p className="text-muted">Manage hotels, rooms, and monitor bookings</p>
                    </div>
                    <Link 
                        to="/add-hotel"
                        className="btn btn-success px-4 py-2 fw-bold shadow-sm rounded-pill" 
                    >
                        <i className="bi bi-plus-lg me-2"></i>Add New Hotel
                    </Link>
                </div>

                {/* Statistics Cards */}
                <div className="row mb-4 g-3">
                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm rounded-4 p-4 bg-primary text-white">
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <p className="mb-1 opacity-75">Total Hotels</p>
                                    <h3 className="fw-bold mb-0">{totalHotels}</h3>
                                </div>
                                <FaBuilding className="fs-1 opacity-50" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm rounded-4 p-4 bg-info text-white">
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <p className="mb-1 opacity-75">Total Rooms</p>
                                    <h3 className="fw-bold mb-0">{totalRooms}</h3>
                                </div>
                                <FaBed className="fs-1 opacity-50" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm rounded-4 p-4 bg-success text-white">
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <p className="mb-1 opacity-75">Total Bookings</p>
                                    <h3 className="fw-bold mb-0">{totalBookings}</h3>
                                </div>
                                <FaCalendarCheck className="fs-1 opacity-50" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card border-0 shadow-sm rounded-4 p-4 bg-warning text-white">
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <p className="mb-1 opacity-75">Confirmed</p>
                                    <h3 className="fw-bold mb-0">{confirmedBookings}</h3>
                                </div>
                                <FaChartBar className="fs-1 opacity-50" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <ul className="nav nav-tabs mb-4 border-bottom-0" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button 
                            className={`nav-link fw-bold rounded-top ${activeTab === 'hotels' ? 'active bg-white' : 'bg-light'}`}
                            onClick={() => setActiveTab('hotels')}
                        >
                            <FaBuilding className="me-2" />Hotels
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button 
                            className={`nav-link fw-bold rounded-top ${activeTab === 'rooms' ? 'active bg-white' : 'bg-light'}`}
                            onClick={() => setActiveTab('rooms')}
                        >
                            <FaBed className="me-2" />Rooms
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button 
                            className={`nav-link fw-bold rounded-top ${activeTab === 'bookings' ? 'active bg-white' : 'bg-light'}`}
                            onClick={() => setActiveTab('bookings')}
                        >
                            <FaCalendarCheck className="me-2" />Bookings
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button 
                            className={`nav-link fw-bold rounded-top ${activeTab === 'reviews' ? 'active bg-white' : 'bg-light'}`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            <FaStar className="me-2" />Reviews
                        </button>
                    </li>
                </ul>

                {/* Hotels Tab */}
                {activeTab === 'hotels' && (
                    <div className="card shadow-sm border-0 rounded-bottom-4">
                        <div className="card-body p-4">
                            {managerHotels.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="table table-hover mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Hotel Name</th>
                                                <th>Location</th>
                                                <th>Rating</th>
                                                <th>Reviews</th>
                                                <th>Rooms</th>
                                                <th>Bookings</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {managerHotels.map(hotel => {
                                                const hotelRooms = managerRooms.filter(r => r.hotelId === hotel.id);
                                                const hotelBookings = managerBookings.filter(b => b.hotelId === hotel.id);
                                                return (
                                                    <tr key={hotel.id}>
                                                        <td className="fw-bold">{hotel.name}</td>
                                                        <td>{hotel.location}</td>
                                                        <td><span className="badge bg-warning">{hotel.rating} ⭐</span></td>
                                                        <td>{hotel.reviewsCount}</td>
                                                        <td><span className="badge bg-info">{hotelRooms.length}</span></td>
                                                        <td><span className="badge bg-success">{hotelBookings.length}</span></td>
                                                        <td>
                                                            <button 
                                                                className="btn btn-sm btn-outline-danger"
                                                                onClick={() => handleDeleteHotel(hotel.id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-5">
                                    <p className="text-muted mb-3">You haven't added any hotels yet.</p>
                                    <Link to="/add-hotel" className="btn btn-primary rounded-pill">Add Your First Hotel</Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Rooms Tab */}
                {activeTab === 'rooms' && (
                    <div className="card shadow-sm border-0 rounded-bottom-4">
                        <div className="card-body p-4">
                            <div className="mb-3">
                                <input 
                                    type="text" 
                                    className="form-control rounded-3" 
                                    placeholder="Search by room type or hotel..."
                                    value={searchRoom}
                                    onChange={(e) => setSearchRoom(e.target.value)}
                                />
                            </div>
                            {managerRooms.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="table table-hover mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Hotel</th>
                                                <th>Room Type</th>
                                                <th>Capacity</th>
                                                <th>Price</th>
                                                <th>Availability</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {managerRooms.filter(room => 
                                                room.roomType?.toLowerCase().includes(searchRoom.toLowerCase()) ||
                                                allHotels.find(h => h.id === room.hotelId)?.name.toLowerCase().includes(searchRoom.toLowerCase())
                                            ).map(room => {
                                                const hotel = allHotels.find(h => h.id === room.hotelId);
                                                return (
                                                    <tr key={room.id}>
                                                        <td className="fw-bold">{hotel?.name}</td>
                                                        <td>{room.roomType}</td>
                                                        <td>{room.capacity} guests</td>
                                                        <td>₹{room.price}</td>
                                                        <td>{room.availability} rooms</td>
                                                        <td>
                                                            <span className={`badge ${room.availability > 0 ? 'bg-success' : 'bg-danger'}`}>
                                                                {room.availability > 0 ? 'Available' : 'Full'}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-5">
                                    <p className="text-muted">No rooms available yet. Add hotels to get started.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Bookings Tab */}
                {activeTab === 'bookings' && (
                    <div className="card shadow-sm border-0 rounded-bottom-4">
                        <div className="card-body p-4">
                            {managerBookings.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="table table-hover mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Hotel</th>
                                                <th>Guest Name</th>
                                                <th>Email</th>
                                                <th>Check-in</th>
                                                <th>Check-out</th>
                                                <th>Rooms</th>
                                                <th>Total Price</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {managerBookings.map(booking => {
                                                const hotel = allHotels.find(h => h.id === booking.hotelId);
                                                const statusClass = booking.status === 'Confirmed' ? 'bg-success' : 
                                                                   booking.status === 'Cancelled' ? 'bg-danger' : 'bg-warning';
                                                return (
                                                    <tr key={booking.id}>
                                                        <td className="fw-bold">{hotel?.name}</td>
                                                        <td>{booking.guestName}</td>
                                                        <td>{booking.email}</td>
                                                        <td>{new Date(booking.checkInDate).toLocaleDateString()}</td>
                                                        <td>{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                                                        <td>{booking.rooms} room(s)</td>
                                                        <td className="fw-bold">₹{booking.totalPrice}</td>
                                                        <td><span className={`badge ${statusClass}`}>{booking.status}</span></td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-5 bg-light rounded-4 border">
                                    <div className="fs-1 mb-3">📅</div>
                                    <h5 className="fw-bold">No Bookings Yet</h5>
                                    <p className="text-muted mb-3">Once guests book your hotels, their bookings will appear here.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                    <div className="card shadow-sm border-0 rounded-bottom-4">
                        <div className="card-body p-4">
                            {managerReviews.length > 0 ? (
                                <div>
                                    <div className="mb-4 p-4 bg-light rounded-4">
                                        <div className="row text-center">
                                            <div className="col-md-6">
                                                <p className="text-muted small mb-1">Average Rating</p>
                                                <div className="d-flex align-items-center justify-content-center gap-2">
                                                    <h3 className="fw-bold mb-0">{avgRating}</h3>
                                                    <span className="text-warning fs-4">★</span>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <p className="text-muted small mb-1">Total Reviews</p>
                                                <h3 className="fw-bold mb-0">{managerReviews.length}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="table-responsive">
                                        <table className="table table-hover mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Hotel</th>
                                                    <th>Guest</th>
                                                    <th>Rating</th>
                                                    <th>Review</th>
                                                    <th>Date</th>
                                                    <th>Manager Response</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {managerReviews.map((review, idx) => {
                                                    const hotel = allHotels.find(h => h.id === review.hotelId);
                                                    return (
                                                        <tr key={review.id || idx}>
                                                            <td className="fw-bold">{hotel?.name}</td>
                                                            <td>{review.guestName}</td>
                                                            <td>
                                                                <div className="text-warning">
                                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                                        <span key={i} style={{ color: i < review.rating ? '#FFC107' : '#E0E0E0' }}>
                                                                            ★
                                                                        </span>
                                                                    ))}
                                                                </div>
                                            </td>
                                                            <td><small>{review.comment.substring(0, 50)}...</small></td>
                                                            <td>{new Date(review.reviewDate).toLocaleDateString()}</td>
                                                            <td>
                                                                {review.managerReply ? (
                                                                    <span className="badge bg-success">Replied</span>
                                                                ) : (
                                                                    <span className="badge bg-warning text-dark">Pending</span>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    
                                    <div className="mt-4 text-center">
                                        <Link to="/reviews" className="btn btn-primary rounded-pill">
                                            Manage Reviews & Respond
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-5">
                                    <p className="text-muted mb-3">No reviews yet. Guest reviews will appear here once they start booking your hotels.</p>
                                    <p className="text-muted small">Star ratings from reviews will help improve your hotel's visibility!</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            
            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                show={showDeleteConfirm}
                title="Delete Property"
                message="Are you sure you want to delete this property? This action cannot be undone. All associated rooms and bookings will also be affected."
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
                onConfirm={confirmDeleteHotel}
                onCancel={() => setShowDeleteConfirm(false)}
            />
            
            <Footer />
        </div>
    );
};

export default ManagerDashboard;