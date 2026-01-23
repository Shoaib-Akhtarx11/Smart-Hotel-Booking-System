import { createSlice } from '@reduxjs/toolkit';
import redemptionsData from "../data/redemptions.json";
import { saveUserRedemptions } from '../utils/userDataManager';

const normalizeRedemption = (redemption) => ({
  id: redemption.RedemptionID || redemption.id,
  userId: redemption.UserID || redemption.userId,
  bookingId: redemption.BookingID || redemption.bookingId,
  pointsUsed: redemption.PointsUsed || redemption.pointsUsed,
  discountAmount: redemption.DiscountAmount || redemption.discountAmount,
  timestamp: redemption.Timestamp || redemption.timestamp || new Date().toISOString()
});

const redemptionSlice = createSlice({
  name: 'redemptions',
  initialState: {
    allRedemptions: [],
    pointsPerRupee: 10, // 10 points = ₹1
    loading: false,
    error: null
  },
  reducers: {
    redeemPoints: (state, action) => {
      const { userId, bookingId, pointsUsed } = action.payload;
      const discountAmount = Math.floor(pointsUsed / state.pointsPerRupee);
      
      const newRedemption = {
        id: `RED-${Date.now()}`,
        userId,
        bookingId,
        pointsUsed,
        discountAmount,
        timestamp: new Date().toISOString()
      };
      state.allRedemptions.push(newRedemption);
      
      // Save to user-specific localStorage
      if (userId) {
        const userRedemptions = state.allRedemptions.filter(r => r.userId === userId);
        saveUserRedemptions(userId, userRedemptions);
      }
    },

    updateRedemption: (state, action) => {
      const index = state.allRedemptions.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        const updated = { ...state.allRedemptions[index], ...action.payload };
        state.allRedemptions[index] = updated;
        
        // Save to user-specific localStorage
        const userId = updated.userId;
        if (userId) {
          const userRedemptions = state.allRedemptions.filter(r => r.userId === userId);
          saveUserRedemptions(userId, userRedemptions);
        }
      }
    }
  }
});

export const { redeemPoints, updateRedemption } = redemptionSlice.actions;
export const selectAllRedemptions = (state) => state.redemptions?.allRedemptions || [];
export const selectUserRedemptions = (userId) => (state) =>
  (state.redemptions?.allRedemptions || []).filter(r => r.userId === userId);
export default redemptionSlice.reducer;