import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateReview } from '../redux/reviewSlice';
import { getUserReviews, saveUserReviews } from '../utils/userDataManager';
import ConfirmDialog from '../components/common/ConfirmDialog';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
import { FaStar, FaReply, FaTrash } from 'react-icons/fa';

const ReviewManagement = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchHotel, setSearchHotel] = useState('');
    const [filterRating, setFilterRating] = useState('all');
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [allReviews, setAllReviews] = useState([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [reviewToDelete, setReviewToDelete] = useState(null);
    
    // Get current manager
    const auth = useSelector((state) => state.auth);
    const currentManager = auth.user;
    const managerId = currentManager?.id;
    
    // Get data
    const allHotels = useSelector((state) => state.hotels?.allHotels || []);
    
    // Load all user reviews from localStorage
    useEffect(() => {
        // Since reviews are guest-specific, we need to load from all users
        // For now, we'll assume reviews are stored per user
        // Get all registered users
        const registeredUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");
        let combinedReviews = [];
        
        registeredUsers.forEach(user => {
            const userReviews = getUserReviews(user.id) || [];
            combinedReviews = [...combinedReviews, ...userReviews];
        });
        
        setAllReviews(combinedReviews);
    }, []);
    
    // Filter manager's hotels
    const managerHotels = allHotels.filter(hotel => hotel.managerId === managerId);
    const managerHotelIds = managerHotels.map(h => h.id);
    
    // Filter reviews for manager's hotels
    let filteredReviews = allReviews.filter(review => 
        managerHotelIds.includes(review.hotelId)
    );
    
    // Apply search filter
    if (searchHotel) {
        filteredReviews = filteredReviews.filter(review => {
            const hotel = allHotels.find(h => h.id === review.hotelId);
            return hotel?.name.toLowerCase().includes(searchHotel.toLowerCase());
        });
    }
    
    // Apply rating filter
    if (filterRating !== 'all') {
        filteredReviews = filteredReviews.filter(review => 
            review.rating === parseInt(filterRating)
        );
    }
    
    const handleReply = (review) => {
        if (!replyText.trim()) {
            alert('Please write a reply');
            return;
        }
        
        const updatedReview = {
            ...review,
            managerReply: replyText,
            repliedAt: new Date().toISOString()
        };
        
        // Update in state
        const updatedReviews = allReviews.map(r => r.id === review.id ? updatedReview : r);
        setAllReviews(updatedReviews);
        
        // Save back to user-specific localStorage
        if (review.userId) {
            saveUserReviews(review.userId, updatedReviews.filter(r => r.userId === review.userId));
        }
        
        setReplyingTo(null);
        setReplyText('');
    };
    
    const handleDeleteReview = (review) => {
        setReviewToDelete(review);
        setShowDeleteConfirm(true);
    };

    const confirmDeleteReview = () => {
        if (!reviewToDelete) return;
        
        const deletedReview = {
            ...reviewToDelete,
            isDeleted: true
        };
        
        const updatedReviews = allReviews.map(r => r.id === reviewToDelete.id ? deletedReview : r);
        setAllReviews(updatedReviews);
        
        // Save back to user-specific localStorage
        if (reviewToDelete.userId) {
            saveUserReviews(reviewToDelete.userId, updatedReviews.filter(r => r.userId === reviewToDelete.userId));
        }
        
        setShowDeleteConfirm(false);
        setReviewToDelete(null);
    };
    
    // Calculate average rating for each hotel
    const getHotelStats = (hotelId) => {
        const hotelReviews = filteredReviews.filter(r => r.hotelId === hotelId && !r.isDeleted);
        if (hotelReviews.length === 0) return { avgRating: 0, count: 0 };
        
        const avgRating = (hotelReviews.reduce((sum, r) => sum + r.rating, 0) / hotelReviews.length).toFixed(1);
        return { avgRating, count: hotelReviews.length };
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <NavBar />
            
            <div className="flex-grow-1" style={{ backgroundColor: '#f8f9fa', paddingTop: '40px', paddingBottom: '40px' }}>
                <div className="container" style={{ maxWidth: '1200px' }}>
                    {/* Header */}
                    <div className="mb-5">
                        <button 
                            onClick={() => navigate('/manager')}
                            className="btn btn-outline-secondary rounded-pill mb-3"
                        >
                            ← Back to Dashboard
                        </button>
                        <h2 className="fw-bold">⭐ Review Management</h2>
                        <p className="text-muted">View, respond to, and manage guest reviews</p>
                    </div>
                    
                    {/* Summary Cards */}
                    <div className="row mb-4 g-3">
                        {managerHotels.map(hotel => {
                            const stats = getHotelStats(hotel.id);
                            return (
                                <div key={hotel.id} className="col-md-6 col-lg-4">
                                    <div className="card border-0 shadow-sm rounded-4 p-4">
                                        <h6 className="fw-bold mb-3">{hotel.name}</h6>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                <p className="text-muted small mb-1">Rating</p>
                                                <div className="d-flex align-items-center gap-1">
                                                    {stats.avgRating > 0 ? (
                                                        <>
                                                            <span className="fs-5 fw-bold">{stats.avgRating}</span>
                                                            <span className="text-warning">★</span>
                                                        </>
                                                    ) : (
                                                        <span className="text-muted">No ratings yet</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-end">
                                                <p className="text-muted small mb-1">Total Reviews</p>
                                                <p className="fs-5 fw-bold mb-0">{stats.count}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    {/* Filters */}
                    <div className="row mb-4 g-3">
                        <div className="col-md-6">
                            <input 
                                type="text" 
                                className="form-control rounded-3" 
                                placeholder="Search by hotel name..."
                                value={searchHotel}
                                onChange={(e) => setSearchHotel(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <select 
                                className="form-select rounded-3"
                                value={filterRating}
                                onChange={(e) => setFilterRating(e.target.value)}
                            >
                                <option value="all">All Ratings</option>
                                <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                                <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                                <option value="3">⭐⭐⭐ (3 Stars)</option>
                                <option value="2">⭐⭐ (2 Stars)</option>
                                <option value="1">⭐ (1 Star)</option>
                            </select>
                        </div>
                    </div>
                    
                    {/* Reviews List */}
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                        <div className="card-body p-0">
                            {filteredReviews.length > 0 ? (
                                <div className="divide-y">
                                    {filteredReviews.map((review, idx) => {
                                        if (review.isDeleted) return null;
                                        const hotel = allHotels.find(h => h.id === review.hotelId);
                                        return (
                                            <div key={review.id || idx} className="p-4 border-bottom">
                                                {/* Review Header */}
                                                <div className="d-flex justify-content-between align-items-start mb-3">
                                                    <div className="flex-grow-1">
                                                        <div className="d-flex align-items-center gap-2 mb-2">
                                                            <h6 className="fw-bold mb-0">{hotel?.name}</h6>
                                                            <span className="badge bg-light text-dark">{hotel?.location}</span>
                                                        </div>
                                                        <div className="d-flex align-items-center gap-2">
                                                            <div className="text-warning">
                                                                {Array.from({ length: 5 }).map((_, i) => (
                                                                    <FaStar 
                                                                        key={i} 
                                                                        size={16}
                                                                        color={i < review.rating ? '#FFC107' : '#E0E0E0'}
                                                                    />
                                                                ))}
                                                            </div>
                                                            <small className="text-muted">
                                                                {new Date(review.reviewDate).toLocaleDateString()}
                                                            </small>
                                                        </div>
                                                    </div>
                                                    <button 
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => handleDeleteReview(review)}
                                                    >
                                                        <FaTrash /> Delete
                                                    </button>
                                                </div>
                                                
                                                {/* Review Content */}
                                                <div className="mb-3">
                                                    <p className="fw-bold mb-1">{review.guestName}</p>
                                                    <p className="mb-0 text-muted">{review.comment}</p>
                                                </div>
                                                
                                                {/* Manager Reply */}
                                                {review.managerReply ? (
                                                    <div className="bg-light rounded-3 p-3 mb-3">
                                                        <p className="fw-bold small mb-2">
                                                            <FaReply className="me-1" />Manager Response
                                                        </p>
                                                        <p className="mb-0 text-dark">{review.managerReply}</p>
                                                        <small className="text-muted d-block mt-2">
                                                            Replied on {new Date(review.repliedAt).toLocaleDateString()}
                                                        </small>
                                                    </div>
                                                ) : (
                                                    <>
                                                        {replyingTo === (review.id || idx) ? (
                                                            <div className="bg-light rounded-3 p-3">
                                                                <textarea 
                                                                    className="form-control rounded-2 mb-2" 
                                                                    rows="3"
                                                                    placeholder="Write your response..."
                                                                    value={replyText}
                                                                    onChange={(e) => setReplyText(e.target.value)}
                                                                />
                                                                <div className="d-flex gap-2">
                                                                    <button 
                                                                        className="btn btn-sm btn-primary rounded-pill"
                                                                        onClick={() => handleReply(review)}
                                                                    >
                                                                        Send Reply
                                                                    </button>
                                                                    <button 
                                                                        className="btn btn-sm btn-outline-secondary rounded-pill"
                                                                        onClick={() => {
                                                                            setReplyingTo(null);
                                                                            setReplyText('');
                                                                        }}
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <button 
                                                                className="btn btn-sm btn-outline-primary rounded-pill"
                                                                onClick={() => setReplyingTo(review.id || idx)}
                                                            >
                                                                <FaReply className="me-1" />Reply to Review
                                                            </button>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-5">
                                    <p className="text-muted">No reviews yet. Guest reviews will appear here once they start booking and reviewing your hotels.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                show={showDeleteConfirm}
                title="Delete Review"
                message="Are you sure you want to delete this review? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
                onConfirm={confirmDeleteReview}
                onCancel={() => setShowDeleteConfirm(false)}
            />
            
            <Footer />
        </div>
    );
};

export default ReviewManagement;
