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
    allBookings: bookingsData.map(normalizeBooking) || [],
    userBookings: [],
    loading: false,
    error: null
  },
  reducers: {
    createBooking: (state, action) => {
      // Ensure all dates are ISO strings, not Date objects
      const payload = { ...action.payload };
      if (payload.checkInDate instanceof Date) {
        payload.checkInDate = payload.checkInDate.toISOString();
      }
      if (payload.checkOutDate instanceof Date) {
        payload.checkOutDate = payload.checkOutDate.toISOString();
      }
      
      // Calculate loyalty points: 1 point per rupee
      const totalPrice = payload.totalPrice || 0;
      const loyaltyPointsEarned = totalPrice;
      
      const newBooking = {
        id: `BK-${Date.now()}`,
        ...payload,
        status: 'Confirmed',
        loyaltyPointsEarned: loyaltyPointsEarned,
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
  (state.bookings?.allBookings || []).filter(b => b.userId === userId);
export const selectBookingById = (state, bookingId) =>
  (state.bookings?.allBookings || []).find(b => b.id === bookingId);
export default bookingSlice.reducer;