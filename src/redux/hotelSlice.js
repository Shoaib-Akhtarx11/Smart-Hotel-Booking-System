import { createSlice, createSelector } from '@reduxjs/toolkit';
import hotelsData from "../data/hotels.json";
import roomsData from "../data/rooms.json";

const hotelSlice = createSlice({
  name: 'hotels',
  initialState: {
    allHotels: hotelsData, 
    filters: {
      location: "Any region",
      priceMin: 500,
      priceMax: 100000,
      sortBy: "Featured stays",
      advancedFeatures: []
    }
  },
  reducers: {
    // Merges new filter values into state
    setGlobalFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    
    // Resets filters to initial values
    resetFilters: (state) => {
      state.filters = {
        location: "Any region",
        priceMin: 500,
        priceMax: 100000,
        sortBy: "Featured stays",
        advancedFeatures: []
      };
    },

    // Manager actions for dynamic updates
    addHotel: (state, action) => {
      state.allHotels.push(action.payload);
    },
    
    deleteHotel: (state, action) => {
      state.allHotels = state.allHotels.filter(
        (hotel) => hotel.id !== action.payload
      );
    }
  }
});

// ACTIONS & BASE SELECTORS
export const { 
  setGlobalFilters, 
  resetFilters, 
  addHotel, 
  deleteHotel 
} = hotelSlice.actions;

export const selectAllHotels = (state) => state.hotels.allHotels;
export const selectFilters = (state) => state.hotels.filters;

/**
 * COMPUTED SELECTOR
 * Merges Hotel data with Room pricing and applies filtering/sorting.
 */
export const selectFilteredHotels = createSelector(
  [selectAllHotels, selectFilters],
  (allHotels, filters) => {
    try {
      // 1. Data Merging: Attach minPrice from roomsData to each hotel
      const hotelsWithPrice = allHotels.map(hotel => {
        const hotelRooms = roomsData.filter(
          room => String(room.hotelId).toUpperCase() === String(hotel.id).toUpperCase()
        );
        
        // Find cheapest room or set a high fallback if no rooms exist
        const minPrice = hotelRooms.length > 0 
          ? Math.min(...hotelRooms.map(r => r.price)) 
          : 0; 

        // Consolidate features/amenities for advanced filtering
        const allAttributes = [
          ...(hotel.features || []), 
          ...(hotel.amenities || [])
        ].map(attr => attr.toLowerCase());
        
        return { ...hotel, minPrice, allAttributes };
      });

      // 2. Apply Filters
      let filtered = hotelsWithPrice.filter(hotel => {
        const matchesLocation = filters.location === "Any region" || 
          hotel.location.toLowerCase().includes(filters.location.toLowerCase());
        
        const matchesPrice = hotel.minPrice >= filters.priceMin && hotel.minPrice <= filters.priceMax;
        
        // Advanced features check (converts filter list to lowercase for matching)
        const matchesFeatures = filters.advancedFeatures.length === 0 || 
          filters.advancedFeatures.every(feat => 
            hotel.allAttributes.includes(feat.toLowerCase())
          );

        return matchesLocation && matchesPrice && matchesFeatures;
      });

      // 3. Apply Sorting
      return [...filtered].sort((a, b) => {
        switch (filters.sortBy) {
          case "Price ascending": 
            return a.minPrice - b.minPrice;
          case "Price descending": 
            return b.minPrice - a.minPrice;
          case "Rating & Recommended": 
            return (b.rating || 0) - (a.rating || 0);
          default: 
            return 0;
        }
      });
    } catch (error) {
      console.error("Critical error in selectFilteredHotels:", error);
      return []; // Return empty array to prevent UI crash
    }
  }
);

export default hotelSlice.reducer;