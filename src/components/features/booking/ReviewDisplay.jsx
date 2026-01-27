import React, { useState } from 'react';
import { FaStar, FaReply, FaCheck, FaClock } from 'react-icons/fa';
import './ReviewDisplay.css';

const ReviewDisplay = ({ reviews = [], currentUser, isManager = false }) => {
  const [expandedReviewId, setExpandedReviewId] = useState(null);

  if (!reviews || reviews.length === 0) {
    return (
      <div className="alert alert-info border-0 text-center py-4 rounded-3">
        <p className="mb-0">No reviews yet. Be the first to share your experience!</p>
      </div>
    );
  }

  const handleToggleExpand = (reviewId) => {
    setExpandedReviewId(expandedReviewId === reviewId ? null : reviewId);
  };

  return (
    <div className="reviews-container">
      <div className="reviews-header mb-4">
        <h5 className="fw-bold mb-2">Guest Reviews ({reviews.length})</h5>
        <div className="avg-rating d-flex align-items-center gap-2">
          <div className="rating-stars-inline">
            {Array(5).fill(0).map((_, i) => (
              <FaStar
                key={i}
                size={16}
                className={i < Math.round(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length) ? 'text-warning' : 'text-light'}
              />
            ))}
          </div>
          <span className="text-muted">
            {(reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)} average rating
          </span>
        </div>
      </div>

      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-card card border-0 mb-3 shadow-sm">
            <div className="card-body">
              {/* Review Header */}
              <div className="review-header d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h6 className="mb-1 fw-bold">{review.guestName}</h6>
                  <small className="text-muted">
                    {new Date(review.reviewDate).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </small>
                </div>
                <div className="review-rating">
                  {Array(5).fill(0).map((_, i) => (
                    <FaStar
                      key={i}
                      size={16}
                      className={i < review.rating ? 'text-warning' : 'text-light'}
                    />
                  ))}
                </div>
              </div>

              {/* Review Status Badge */}
              {!review.isApproved && (
                <div className="alert alert-warning alert-sm mb-3 py-2" role="alert">
                  <FaClock className="me-2" size={14} />
                  <small>Pending approval from moderator</small>
                </div>
              )}

              {/* Review Comment */}
              <p className="review-comment mb-3">
                {review.comment}
              </p>

              {/* Manager Reply Section */}
              {review.managerReply && (
                <div className="manager-reply-section bg-light p-3 rounded-3 mb-3">
                  <div className="d-flex gap-2 mb-2">
                    <FaReply size={16} className="text-primary mt-1" />
                    <strong className="text-primary">Manager Response</strong>
                  </div>
                  <p className="mb-2 ms-4">{review.managerReply}</p>
                  <small className="text-muted ms-4">
                    Replied on {new Date(review.repliedAt).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </small>
                </div>
              )}

              {/* Additional Responses */}
              {review.responses && review.responses.length > 0 && (
                <div className="additional-responses">
                  {review.responses.map((response) => (
                    <div key={response.id} className="response-item bg-primary bg-opacity-10 p-3 rounded-2 mb-2 border-start border-primary border-3">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <strong className="text-primary">Manager Feedback</strong>
                        {response.isApproved && (
                          <FaCheck size={14} className="text-success" />
                        )}
                      </div>
                      <p className="mb-1">{response.response}</p>
                      <small className="text-muted">
                        {new Date(response.respondedAt).toLocaleDateString('en-IN')}
                      </small>
                    </div>
                  ))}
                </div>
              )}

              {/* Expand Button for More Details */}
              {(review.responses && review.responses.length > 1) && (
                <button
                  className="btn btn-sm btn-outline-primary mt-2"
                  onClick={() => handleToggleExpand(review.id)}
                >
                  {expandedReviewId === review.id ? 'Hide Details' : 'Show All Responses'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewDisplay;
