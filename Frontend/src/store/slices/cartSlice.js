import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // { productId, size, quantity, name, price, image }
  },
  reducers: {
    addToCart: (state, action) => {
      const { productId, size, name, price, image } = action.payload;
      const existing = state.items.find(
        (item) => item.productId === productId && item.size === size
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ productId, size, quantity: 1, name, price, image });
      }
    },
    removeFromCart: (state, action) => {
      const { productId, size } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.productId === productId && item.size === size)
      );
    },
    updateQuantity: (state, action) => {
      const { productId, size, quantity } = action.payload;
      const item = state.items.find(
        (i) => i.productId === productId && i.size === size
      );
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
