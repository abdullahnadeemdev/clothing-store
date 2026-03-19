import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import uiReducer from './slices/uiSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    ui: uiReducer,
    auth: authReducer,
  },
});

export default store;
