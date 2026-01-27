import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReview } from '../../../redux/reviewSlice';
import { FaStar } from 'react-icons/fa';
import './ReviewForm.css';

const ReviewForm = ({ bookingId, hotelId, hotelName, userId, userName, onReviewSubmitted }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setSubmitMessage('Please select a rating');
      return;
    }

    if (comment.trim().length < 10) {
      setSubmitMessage('Review must be at least 10 characters long');
      return;
    }

    setIsSubmitting(true);

    try {
      const newReview = {
        userId: userId,
        bookingId: bookingId,
        guestName: userName,
        hotelId: hotelId,
        hotelName: hotelName,
        rating: rating,
        comment: comment.trim(),
        reviewDate: new Date().toISOString(),
        managerReply: null,
        repliedAt: null,
        managerId: null,
        isApproved: false,
        responses: []
      };

      dispatch(addReview(newReview));
      
      setRating(0);
      setComment('');
      setSubmitMessage('✓ Review submitted successfully! Waiting for approval.');
      
      // Clear message after 3 seconds
      setTimeout(() => setSubmitMessage(''), 3000);
      
      if (onReviewSubmitted) {
        onReviewSubmitted(newReview);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmitMessage('Error submitting review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="review-form-container">
      <div className="card border-0 shadow-sm rounded-3">
        <div className="card-header bg-primary text-white rounded-top">
          <h5 className="mb-0">Share Your Experience</h5>
          <p className="small mb-0 mt-1 opacity-75">Help other guests make informed decisions</p>
        </div>
        
        <form onSubmit={handleSubmit} className="card-body p-4">
          {/* Rating Section */}
          <div className="mb-4">
            <label className="form-label fw-bold">Rate Your Stay</label>
            <div className="rating-stars d-flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star-btn ${star <= (hoverRating || rating) ? 'active' : ''}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <FaStar size={28} />
                </button>
              ))}
              {rating > 0 && (
                <span className="ms-3 align-self-center fw-bold text-primary">
                  {rating === 1 && 'Poor'}
                  {rating === 2 && 'Fair'}
                  {rating === 3 && 'Good'}
                  {rating === 4 && 'Very Good'}
                  {rating === 5 && 'Excellent'}
                </span>
              )}
            </div>
          </div>

          {/* Comment Section */}
          <div className="mb-4">
            <label htmlFor="reviewComment" className="form-label fw-bold">
              Your Review
            </label>
            <textarea
              id="reviewComment"
              className="form-control form-control-lg"
              placeholder="Tell us about your experience... (minimum 10 characters)"
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={1000}
              disabled={isSubmitting}
            />
            <small className="text-muted d-block mt-2">
              {comment.length}/1000 characters
            </small>
          </div>

          {/* Info Box */}
          <div className="alert alert-info border-0 mb-4" role="alert">
            <strong>Your feedback matters!</strong> The manager of {hotelName} will be able to see and respond to your review.
          </div>

          {/* Submit Message */}
          {submitMessage && (
            <div className={`alert mb-3 border-0 ${submitMessage.includes('✓') ? 'alert-success' : 'alert-warning'}`}>
              {submitMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary btn-lg w-100 fw-bold"
            disabled={isSubmitting || rating === 0 || comment.trim().length < 10}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Submitting...
              </>
            ) : (
              'Submit Review'
            )}
          </button>

          <small className="text-muted d-block text-center mt-3">
            All reviews are subject to moderation and approval
          </small>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
