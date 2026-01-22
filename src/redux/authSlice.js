import { createSlice } from "@reduxjs/toolkit";

// Helper to safely get users
const getStoredUsers = () => {
  try {
    const users = localStorage.getItem("allUsers");
    const parsed = users ? JSON.parse(users) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
};

const initialState = {
  user: JSON.parse(localStorage.getItem("activeUser")) || null,
  isAuthenticated: !!localStorage.getItem("activeUser"),
  role: localStorage.getItem("activeRole") || null,
  // Ensure this is ALWAYS an array
  registeredUsers: getStoredUsers(), 
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      // Defensive check: if for some reason state.registeredUsers is not an array, reset it
      const currentUsers = Array.isArray(state.registeredUsers) ? state.registeredUsers : [];
      
      // Update state
      state.registeredUsers = [...currentUsers, action.payload];
      
      // Sync with localStorage
      localStorage.setItem("allUsers", JSON.stringify(state.registeredUsers));
      state.error = null;
    },

    login: (state, action) => {
      const { user, role } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      state.role = role;
      state.error = null;
      localStorage.setItem("activeUser", JSON.stringify(user));
      localStorage.setItem("activeRole", role);
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.role = null;
      localStorage.removeItem("activeUser");
      localStorage.removeItem("activeRole");
    },

    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { login, logout, registerUser, setError } = authSlice.actions;
export default authSlice.reducer;