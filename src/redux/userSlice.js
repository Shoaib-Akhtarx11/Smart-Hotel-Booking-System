import { createSlice } from '@reduxjs/toolkit';
import usersDataFromJson from '../data/users.json'; 

const getInitialLoyalty = () => {
    const saved = localStorage.getItem("userLoyalty");
    try {
        const parsed = saved ? JSON.parse(saved) : null;
        
        // If the saved data is an array (from your persist string), 
        // we convert it to the object format the app expects.
        if (Array.isArray(parsed)) {
            return {
                pointsBalance: parsed[0]?.PointsBalance || 0,
                history: [] // Start fresh history if it was an old array format
            };
        }
        
        return parsed || { pointsBalance: 0, history: [] };
    } catch (e) {
        return { pointsBalance: 0, history: [] };
    }
};

const userSlice = createSlice({
    name: 'users', // Matches your "users" key in persist data
    initialState: {
        allUsers: usersDataFromJson || [], 
        loyalty: getInitialLoyalty(), 
        recentVisits: [] 
    },
    reducers: {
        addLoyaltyPoints: (state, action) => {
            const { points, activity } = action.payload;
            
            // --- CRITICAL FIX ---
            // Force re-initialization if loyalty is an array or invalid
            if (!state.loyalty || Array.isArray(state.loyalty)) {
                state.loyalty = { pointsBalance: 0, history: [] };
            }

            if (!Array.isArray(state.loyalty.history)) {
                state.loyalty.history = [];
            }

            const numericPoints = Math.floor(Number(points) || 0);
            state.loyalty.pointsBalance += numericPoints;

            state.loyalty.history.unshift({
                id: Date.now(),
                activity: activity || "Hotel Stay",
                date: new Date().toLocaleDateString('en-GB', { 
                    day: '2-digit', month: 'short', year: 'numeric' 
                }),
                points: numericPoints
            });

            localStorage.setItem("userLoyalty", JSON.stringify(state.loyalty));
        },

        addToRecentVisits: (state, action) => {
            if (!Array.isArray(state.recentVisits)) state.recentVisits = [];
            const exists = state.recentVisits.find(h => h.id === action.payload.id);
            if (!exists) {
                state.recentVisits.unshift(action.payload);
                if (state.recentVisits.length > 5) state.recentVisits.pop();
            }
        },

        deleteUser: (state, action) => {
            state.allUsers = state.allUsers.filter(user => user.id !== action.payload);
        },

        updateUser: (state, action) => {
            const index = state.allUsers.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.allUsers[index] = { ...state.allUsers[index], ...action.payload };
            }
        },

        addUser: (state, action) => {
            state.allUsers.push(action.payload);
        }
    }
});

export const { 
    addLoyaltyPoints, 
    addToRecentVisits, 
    deleteUser, 
    updateUser, 
    addUser 
} = userSlice.actions;

export const selectLoyalty = (state) => state.users.loyalty;
export const selectAllUsers = (state) => state.users.allUsers;
export const selectRecentVisits = (state) => state.users.recentVisits;

export default userSlice.reducer;