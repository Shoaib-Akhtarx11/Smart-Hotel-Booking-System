import { createSlice, createSelector } from '@reduxjs/toolkit';
import roomsData from "../data/rooms.json";

const roomSlice = createSlice({
  name: 'rooms',
  initialState: {
    allRooms: roomsData,
    loading: false,
    error: null
  },
  reducers: {
    updateRoomAvailability: (state, action) => {
      const { roomId, availability } = action.payload;
      const room = state.allRooms.find(r => r.id === roomId);
      if (room) {
        room.availability = availability;
      }
    },

    addRoom: (state, action) => {
      state.allRooms.push(action.payload);
    },

    deleteRoom: (state, action) => {
      state.allRooms = state.allRooms.filter(r => r.id !== action.payload);
    },

    updateRoom: (state, action) => {
      const index = state.allRooms.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.allRooms[index] = { ...state.allRooms[index], ...action.payload };
      }
    }
  }
});

export const { updateRoomAvailability, addRoom, deleteRoom, updateRoom } = roomSlice.actions;

// Base selectors
const selectAllRoomsBase = (state) => state.rooms?.allRooms || [];

// Memoized selectors to prevent unnecessary rerenders
export const selectAllRooms = selectAllRoomsBase;

// Memoized selector factory - returns same reference if data hasn't changed
export const selectRoomsByHotel = (hotelId) =>
  createSelector(
    [selectAllRoomsBase],
    (rooms) =>
      rooms.filter(
        room => String(room.hotelId).toLowerCase() === String(hotelId).toLowerCase()
      )
  );
export default roomSlice.reducer;