import { createSlice } from '@reduxjs/toolkit';
import reviewsData from "../data/reviews.json";

const normalizeReview = (review) => ({
  id: review.ReviewID || review.id || `REV-${Math.random()}`,
  userId: review.UserID || review.userId,
  guestName: review.GuestName || review.guestName || 'Anonymous',
  hotelId: review.HotelID || review.hotelId,
  rating: review.Rating || review.rating || 0,
  comment: review.Comment || review.comment || '',
  reviewDate: review.ReviewDate || review.reviewDate || review.Timestamp || review.timestamp || new Date().toISOString(),
  managerReply: review.ManagerReply || review.managerReply || null,
  repliedAt: review.RepliedAt || review.repliedAt || null,
  isDeleted: review.isDeleted || false
});

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    allReviews: (reviewsData || []).map(normalizeReview),
    loading: false,
    error: null
  },
  reducers: {
    addReview: (state, action) => {
      const newReview = {
        id: `REV-${Date.now()}`,
        ...action.payload,
        reviewDate: new Date().toISOString(),
        managerReply: null,
        repliedAt: null,
        isDeleted: false
      };
      state.allReviews.push(newReview);
    },

    updateReview: (state, action) => {
      const index = state.allReviews.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.allReviews[index] = { ...state.allReviews[index], ...action.payload };
      }
    },

    addManagerResponse: (state, action) => {
      const review = state.allReviews.find(r => r.id === action.payload.reviewId);
      if (review) {
        review.managerReply = action.payload.response;
        review.repliedAt = new Date().toISOString();
      }
    },

    deleteReview: (state, action) => {
      state.allReviews = state.allReviews.filter(r => r.id !== action.payload);
    }
  }
});

export const { addReview, updateReview, addManagerResponse, deleteReview } = reviewSlice.actions;
export const selectAllReviews = (state) => state.reviews?.allReviews || [];
export const selectHotelReviews = (hotelId) => (state) =>
  (state.reviews?.allReviews || []).filter(r => r.hotelId === hotelId && !r.isDeleted);
export const selectUserReviews = (userId) => (state) =>
  (state.reviews?.allReviews || []).filter(r => r.userId === userId && !r.isDeleted);
export default reviewSlice.reducer;