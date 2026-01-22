import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { 
    persistStore, 
    persistReducer,
    FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './authSlice';
import hotelReducer from './hotelSlice';
import userReducer from './userSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  hotels: hotelReducer,
  users: userReducer,
});

const persistConfig = {
  key: 'smart-hotel-v1',
  storage,
  whitelist: ['auth', 'users'] // Don't persist hotels to keep prices fresh
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);