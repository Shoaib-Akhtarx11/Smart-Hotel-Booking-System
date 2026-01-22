import { createSlice } from '@reduxjs/toolkit';
import usersDataFromJson from '../data/users.json';
import loyaltyDataFromJson from '../data/loyalty.json';

// Helper: Get loyalty data from LocalStorage or fallback to JSON
const getInitialLoyalty = () => {
    const savedLoyalty = localStorage.getItem("userLoyalty");
    return savedLoyalty ? JSON.parse(savedLoyalty) : loyaltyDataFromJson;
};

const userSlice = createSlice({
    name: 'users',
    initialState: {
        allUsers: usersDataFromJson, 
        loyalty: getInitialLoyalty(), // Loads saved points on refresh
        recentVisits: [] 
    },
    reducers: {
        deleteUser: (state, action) => {
            state.allUsers = state.allUsers.filter(user => user.id !== action.payload);
        },
        updateUserRole: (state, action) => {
            const { id, newRole } = action.payload;
            const user = state.allUsers.find(u => u.id === id);
            if (user) user.role = newRole;
        },
        addLoyaltyPoints: (state, action) => {
            const { points, activity } = action.payload;
            
            // 1. Update State
            state.loyalty.pointsBalance += points;
            state.loyalty.history.unshift({
                id: Date.now(),
                activity: activity,
                date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                points: points
            });

            // 2. Sync with LocalStorage so points don't disappear on refresh
            localStorage.setItem("userLoyalty", JSON.stringify(state.loyalty));
        },
        addToRecentVisits: (state, action) => {
            const hotel = action.payload;
            const filtered = state.recentVisits.filter(h => h.id !== hotel.id);
            state.recentVisits = [hotel, ...filtered].slice(0, 10);
        },
        clearHistory: (state) => {
            state.recentVisits = [];
            state.loyalty.history = []; // Clear loyalty history too if needed
            localStorage.removeItem("userLoyalty");
        }
    }
});

export const { 
    deleteUser, 
    updateUserRole, 
    addLoyaltyPoints, 
    addToRecentVisits, 
    clearHistory 
} = userSlice.actions;

export default userSlice.reducer;