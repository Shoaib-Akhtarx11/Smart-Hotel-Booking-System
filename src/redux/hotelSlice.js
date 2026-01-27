import { createSlice, createSelector } from '@reduxjs/toolkit';
import hotelsData from "../data/hotels.json";

const hotelSlice = createSlice({
  name: 'hotels',
  initialState: {
    allHotels: hotelsData || [], // Always load from JSON on app start
    filters: {
      location: "Any region",
      priceMin: 500,
      priceMax: 100000,
      sortBy: "Featured stays",
      advancedFeatures: [],
      searchQuery: ""
    }
  },
  reducers: {
    setGlobalFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    
    resetFilters: (state) => {
      state.filters = {
        location: "Any region",
        priceMin: 500,
        priceMax: 100000,
        sortBy: "Featured stays",
        advancedFeatures: [],
        searchQuery: ""
      };
    },

    addHotel: (state, action) => {
      state.allHotels.push(action.payload);
    },

    updateHotel: (state, action) => {
      const index = state.allHotels.findIndex(h => h.id === action.payload.id);
      if (index !== -1) {
        state.allHotels[index] = { ...state.allHotels[index], ...action.payload };
      }
    },
    
    deleteHotel: (state, action) => {
      state.allHotels = state.allHotels.filter(
        (hotel) => hotel.id !== action.payload
      );
    }
  }
});

export const { 
  setGlobalFilters, 
  resetFilters, 
  addHotel,
  updateHotel, 
  deleteHotel 
} = hotelSlice.actions;

export const selectAllHotels = (state) => state.hotels.allHotels;
export const selectFilters = (state) => state.hotels.filters;

/**
 * COMPUTED SELECTOR - Now uses roomsSlice data
 */
export const selectFilteredHotels = createSelector(
  [selectAllHotels, selectFilters, (state) => state.rooms?.allRooms || []],
  (allHotels, filters, roomsData) => {
    try {
      // console.log('[selectFilteredHotels] allHotels count:', allHotels?.length || 0);
      // console.log('[selectFilteredHotels] roomsData count:', roomsData?.length || 0);
      // console.log('[selectFilteredHotels] filters:', filters);
      
      const hotelsWithPrice = allHotels.map(hotel => {
        const hotelRooms = roomsData.filter(
          room => String(room.hotelId).toLowerCase() === String(hotel.id).toLowerCase()
        );
        
        const minPrice = hotelRooms.length > 0 
          ? Math.min(...hotelRooms.map(r => r.price)) 
          : 0;

        const allAttributes = [
          ...(hotel.features || []), 
          ...(hotel.amenities || [])
        ].map(attr => attr.toLowerCase());
        
        return { ...hotel, minPrice, allAttributes };
      });

      let filtered = hotelsWithPrice.filter(hotel => {
        const matchesLocation = filters.location === "Any region" || 
          hotel.location.toLowerCase().includes(filters.location.toLowerCase());
        
        const matchesPrice = hotel.minPrice >= filters.priceMin && hotel.minPrice <= filters.priceMax;
        
        const matchesFeatures = filters.advancedFeatures.length === 0 || 
          filters.advancedFeatures.every(feat => 
            hotel.allAttributes.includes(feat.toLowerCase())
          );

        // Search query - matches both hotel name and location
        const matchesSearch = !filters.searchQuery || 
          hotel.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          hotel.location.toLowerCase().includes(filters.searchQuery.toLowerCase());

        return matchesLocation && matchesPrice && matchesFeatures && matchesSearch;
      });

      // console.log('[selectFilteredHotels] filtered count:', filtered.length);

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
      return [];
    }
  }
);

export default hotelSlice.reducer;