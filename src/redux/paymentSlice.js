import { createSlice } from '@reduxjs/toolkit';
import paymentData from "../data/payment.json";
import { saveUserPayments } from '../utils/userDataManager';

const normalizePayment = (payment) => ({
  id: payment.PaymentID || payment.id,
  bookingId: payment.BookingID || payment.bookingId,
  userId: payment.UserID || payment.userId,
  amount: payment.Amount || payment.amount,
  status: payment.Status || payment.status,
  paymentMethod: payment.PaymentMethod || payment.paymentMethod,
  timestamp: payment.Timestamp || payment.timestamp || new Date().toISOString()
});

const paymentSlice = createSlice({
  name: 'payments',
  initialState: {
    allPayments: [],
    loading: false,
    error: null
  },
  reducers: {
    recordPayment: (state, action) => {
      const newPayment = {
        id: `PAY-${Date.now()}`,
        ...action.payload,
        status: 'Success',
        timestamp: new Date().toISOString()
      };
      state.allPayments.push(newPayment);
      
      // Save to user-specific localStorage
      if (newPayment.userId) {
        const userPayments = state.allPayments.filter(p => p.userId === newPayment.userId);
        saveUserPayments(newPayment.userId, userPayments);
      }
    },

    updatePaymentStatus: (state, action) => {
      const payment = state.allPayments.find(p => p.id === action.payload.paymentId);
      if (payment) {
        payment.status = action.payload.status;
        
        // Save to user-specific localStorage
        if (payment.userId) {
          const userPayments = state.allPayments.filter(p => p.userId === payment.userId);
          saveUserPayments(payment.userId, userPayments);
        }
      }
    },

    refundPayment: (state, action) => {
      const payment = state.allPayments.find(p => p.id === action.payload);
      if (payment) {
        payment.status = 'Refunded';
        
        // Save to user-specific localStorage
        if (payment.userId) {
          const userPayments = state.allPayments.filter(p => p.userId === payment.userId);
          saveUserPayments(payment.userId, userPayments);
        }
      }
    }
  }
});

export const { recordPayment, updatePaymentStatus, refundPayment } = paymentSlice.actions;
export const selectAllPayments = (state) => state.payments?.allPayments || [];
export const selectPaymentByBooking = (state, bookingId) =>
  (state.payments?.allPayments || []).find(p => p.bookingId === bookingId);
export default paymentSlice.reducer;