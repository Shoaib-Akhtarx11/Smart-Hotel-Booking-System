import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectHotelPendingReviews, selectHotelReviews, addManagerResponse, approveReview } from '../redux/reviewSlice';
import { selectAllHotels } from '../redux/hotelSlice';
import ConfirmDialog from '../components/common/ConfirmDialog';
import NavBar from '../components/layout/NavBar';
import Footer from '../components/layout/Footer';
import { FaStar, FaReply, FaCheck, FaCalendarAlt, FaUser } from 'react-icons/fa';

const ReviewManagement = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchHotel, setSearchHotel] = useState('');
    const [filterRating, setFilterRating] = useState('all');
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [activeTab, setActiveTab] = useState('pending');
    
    // Get current manager
    const auth = useSelector((state) => state.auth);
    const currentManager = auth.user;
    const managerId = currentManager?.id;
    
    // Get all hotels
    const allHotels = useSelector(selectAllHotels);
    
    // Filter manager's hotels
    const managerHotels = allHotels.filter(hotel => hotel.managerId === managerId);
    
    // Get reviews for manager's hotels
    let pendingReviews = [];
    let approvedReviews = [];
    
    managerHotels.forEach(hotel => {
      const pending = useSelector(selectHotelPendingReviews(hotel.id));
      const approved = useSelector(selectHotelReviews(hotel.id));
      pendingReviews = [...pendingReviews, ...pending];
      approvedReviews = [...approvedReviews, ...approved];
    });
    
    // Apply search filter
    const filterReviews = (reviews) => {
      let filtered = reviews;
      
      if (searchHotel) {
        filtered = filtered.filter(review => {
          const hotel = allHotels.find(h => h.id === review.hotelId);
          return hotel?.name.toLowerCase().includes(searchHotel.toLowerCase());
        });
      }
      
      if (filterRating !== 'all') {
        filtered = filtered.filter(review => review.rating === parseInt(filterRating));
      }
      
      return filtered;
    };
    
    const filteredPending = filterReviews(pendingReviews);
    const filteredApproved = filterReviews(approvedReviews);
    
    const handleReply = (review) => {
        if (!replyText.trim()) {
            alert('Please write a reply');
            return;
        }
        
        dispatch(addManagerResponse({
            reviewId: review.id,
            response: replyText.trim(),
            managerId: managerId
        }));
        
        setReplyingTo(null);
        setReplyText('');
    };
    
    const handleApproveReview = (review) => {
        dispatch(approveReview(review.id));
        setReplyingTo(null);
        setReplyText('');
    };
    
    // Calculate average rating for each hotel
    const getHotelStats = (hotelId) => {
        const allHotelReviews = [...approvedReviews, ...pendingReviews].filter(r => r.hotelId === hotelId);
        if (allHotelReviews.length === 0) return { avgRating: 0, count: 0 };
        
        const avgRating = (allHotelReviews.reduce((sum, r) => sum + r.rating, 0) / allHotelReviews.length).toFixed(1);
        return { avgRating, count: allHotelReviews.length };
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
                    
                    {/* Tabs */}
                    <ul className="nav nav-tabs mb-4">
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'pending' ? 'active' : ''}`}
                                onClick={() => setActiveTab('pending')}
                            >
                                Pending Approval ({filteredPending.length})
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'approved' ? 'active' : ''}`}
                                onClick={() => setActiveTab('approved')}
                            >
                                Approved Reviews ({filteredApproved.length})
                            </button>
                        </li>
                    </ul>
                    
                    {/* Reviews List */}
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                        <div className="card-body p-0">
                            {activeTab === 'pending' && filteredPending.length > 0 ? (
                                <div>
                                    {filteredPending.map((review) => {
                                        const hotel = allHotels.find(h => h.id === review.hotelId);
                                        return (
                                            <div key={review.id} className="p-4 border-bottom">
                                                {/* Review Header */}
                                                <div className="d-flex justify-content-between align-items-start mb-3">
                                                    <div className="flex-grow-1">
                                                        <div className="d-flex align-items-center gap-2 mb-2">
                                                            <h6 className="fw-bold mb-0">{hotel?.name}</h6>
                                                            <span className="badge bg-light text-dark">{hotel?.location}</span>
                                                        </div>
                                                        <div className="d-flex align-items-center gap-2 mb-2">
                                                            <FaUser size={14} className="text-primary" />
                                                            <strong>{review.guestName}</strong>
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
                                                            <FaCalendarAlt size={14} className="text-muted" />
                                                            <small className="text-muted">
                                                                {new Date(review.reviewDate).toLocaleDateString()}
                                                            </small>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Review Content */}
                                                <div className="mb-3">
                                                    <p className="mb-0 text-dark">{review.comment}</p>
                                                </div>
                                                
                                                {/* Reply Form */}
                                                {replyingTo === review.id ? (
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
                                                                <FaReply className="me-1" />Send Reply
                                                            </button>
                                                            <button 
                                                                className="btn btn-sm btn-success rounded-pill"
                                                                onClick={() => handleApproveReview(review)}
                                                            >
                                                                <FaCheck className="me-1" />Approve Review
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
                                                        onClick={() => setReplyingTo(review.id)}
                                                    >
                                                        <FaReply className="me-1" />Respond to Review
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : activeTab === 'pending' ? (
                                <div className="text-center py-5">
                                    <p className="text-muted">No pending reviews.</p>
                                </div>
                            ) : null}
                            
                            {activeTab === 'approved' && filteredApproved.length > 0 ? (
                                <div>
                                    {filteredApproved.map((review) => {
                                        const hotel = allHotels.find(h => h.id === review.hotelId);
                                        return (
                                            <div key={review.id} className="p-4 border-bottom">
                                                {/* Review Header */}
                                                <div className="d-flex justify-content-between align-items-start mb-3">
                                                    <div className="flex-grow-1">
                                                        <div className="d-flex align-items-center gap-2 mb-2">
                                                            <h6 className="fw-bold mb-0">{hotel?.name}</h6>
                                                            <span className="badge bg-light text-dark">{hotel?.location}</span>
                                                            <span className="badge bg-success">Approved</span>
                                                        </div>
                                                        <div className="d-flex align-items-center gap-2 mb-2">
                                                            <FaUser size={14} className="text-success" />
                                                            <strong>{review.guestName}</strong>
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
                                                            <FaCalendarAlt size={14} className="text-muted" />
                                                            <small className="text-muted">
                                                                {new Date(review.reviewDate).toLocaleDateString()}
                                                            </small>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                {/* Review Content */}
                                                <div className="mb-3">
                                                    <p className="mb-0 text-dark">{review.comment}</p>
                                                </div>
                                                
                                                {/* Manager Reply */}
                                                {review.managerReply ? (
                                                    <div className="bg-light rounded-3 p-3">
                                                        <p className="fw-bold small mb-2">
                                                            <FaReply className="me-1" />Your Response
                                                        </p>
                                                        <p className="mb-0 text-dark">{review.managerReply}</p>
                                                        <small className="text-muted d-block mt-2">
                                                            Replied on {new Date(review.repliedAt).toLocaleDateString()}
                                                        </small>
                                                    </div>
                                                ) : (
                                                    <div className="alert alert-info small mb-0">
                                                        No response yet
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : activeTab === 'approved' ? (
                                <div className="text-center py-5">
                                    <p className="text-muted">No approved reviews yet.</p>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default ReviewManagement;
