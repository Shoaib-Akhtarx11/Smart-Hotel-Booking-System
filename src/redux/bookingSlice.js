import { createSlice } from '@reduxjs/toolkit';
import bookingsData from "../data/bookings.json";

// Helper to convert booking data format - ALWAYS convert dates to ISO strings
const normalizeBooking = (booking) => ({
  id: booking.BookingID || booking.id,
  userId: booking.UserID || booking.userId,
  hotelId: booking.HotelID || booking.hotelId,
  roomId: booking.RoomID || booking.roomId,
  checkInDate: booking.CheckInDate instanceof Date 
    ? booking.CheckInDate.toISOString() 
    : String(booking.CheckInDate || booking.checkInDate),
  checkOutDate: booking.CheckOutDate instanceof Date 
    ? booking.CheckOutDate.toISOString() 
    : String(booking.CheckOutDate || booking.checkOutDate),
  status: booking.Status || booking.status,
  paymentId: booking.PaymentID || booking.paymentId,
  totalPrice: booking.TotalPrice || booking.totalPrice || 0,
  loyaltyPointsEarned: booking.LoyaltyPointsEarned || booking.loyaltyPointsEarned || 0,
  createdAt: typeof booking.CreatedAt === 'string' 
    ? booking.CreatedAt 
    : booking.CreatedAt?.toISOString?.() || booking.createdAt || new Date().toISOString(),
  guestDetails: booking.guestDetails || {}
});

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    allBookings: bookingsData || [],
    userBookings: [],
    loading: false,
    error: null
  },
  reducers: {
    createBooking: (state, action) => {
      // Convert incoming booking to match JSON format (uppercase keys)
      const payload = action.payload;
      
      const newBooking = {
        BookingID: payload.id || `BK-${Date.now()}`,
        UserID: payload.userId || payload.id,
        HotelID: payload.hotelId,
        RoomID: payload.roomId,
        CheckInDate: payload.checkInDate || payload.checkIn,
        CheckOutDate: payload.checkOutDate || payload.checkOut,
        Status: payload.status || 'Confirmed',
        PaymentID: payload.paymentId,
        TotalPrice: payload.totalPrice || 0,
        LoyaltyPointsEarned: payload.loyaltyPointsEarned || Math.floor(payload.totalPrice || 0),
        // Store original lowercase fields as well for compatibility
        id: payload.id || `BK-${Date.now()}`,
        userId: payload.userId || payload.id,
        hotelId: payload.hotelId,
        roomId: payload.roomId,
        checkInDate: payload.checkInDate || payload.checkIn,
        checkOutDate: payload.checkOutDate || payload.checkOut,
        status: payload.status || 'Confirmed',
        paymentId: payload.paymentId,
        totalPrice: payload.totalPrice || 0,
        loyaltyPointsEarned: payload.loyaltyPointsEarned || Math.floor(payload.totalPrice || 0),
        createdAt: new Date().toISOString()
      };
      state.allBookings.push(newBooking);
      return state;
    },

    updateBooking: (state, action) => {
      const index = state.allBookings.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.allBookings[index] = { ...state.allBookings[index], ...action.payload };
      }
    },

    cancelBooking: (state, action) => {
      const booking = state.allBookings.find(b => b.id === action.payload);
      if (booking) {
        booking.status = 'Cancelled';
      }
    },

    fetchUserBookings: (state, action) => {
      state.userBookings = state.allBookings.filter(b => b.userId === action.payload);
    },

    deleteBooking: (state, action) => {
      state.allBookings = state.allBookings.filter(b => b.id !== action.payload);
    }
  }
});

export const { createBooking, updateBooking, cancelBooking, fetchUserBookings, deleteBooking } = bookingSlice.actions;
export const selectAllBookings = (state) => state.bookings?.allBookings || [];
export const selectUserBookings = (state, userId) => 
  (state.bookings?.allBookings || []).filter(b => (b.userId || b.UserID) === userId);
export const selectBookingById = (state, bookingId) =>
  (state.bookings?.allBookings || []).find(b => (b.id || b.BookingID) === bookingId);
export default bookingSlice.reducer;