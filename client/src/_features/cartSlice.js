import { createSlice } from "@reduxjs/toolkit";

/**
 * Cart slice improvements:
 * - store subtotal separately
 * - provide selectors for subtotal, itemCount, and grandTotal
 * - guard quantity updates with stock bounds
 * - consistent timestamp when adding items
 */

const initialState = {
  items: [],
  subtotal: 0,
  total: 0,
  itemCount: 0,
  shippingCost: 0,
  tax: 0,
  discount: 0,
};

const calculateTotals = (items) => {
  const itemCount = items.reduce((total, item) => total + (item.quantity || 0), 0);
  const subtotal = items.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);
  return { itemCount, subtotal };
};

const recalc = (state) => {
  const totals = calculateTotals(state.items);
  state.itemCount = totals.itemCount;
  state.subtotal = totals.subtotal;
  state.total = Number((state.subtotal + state.shippingCost + state.tax - state.discount).toFixed(2));
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const payload = action.payload || {};
      const {
        id,
        name = "Unknown",
        price = 0,
        image = "",
        quantity = 1,
        stock = 99999,
        category = "",
        brand = "",
      } = payload;

      const existingItem = state.items.find((it) => it.id === id);
      if (existingItem) {
        existingItem.quantity = Math.min(existingItem.quantity + quantity, existingItem.stock || stock);
      } else {
        state.items.push({
          id,
          name,
          price,
          image,
          quantity: Math.min(quantity, stock),
          stock,
          category,
          brand,
          addedAt: new Date().toISOString(),
        });
      }

      recalc(state);
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      recalc(state);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((it) => it.id === id);
      if (item) {
        const q = Number.isFinite(Number(quantity)) ? Number(quantity) : item.quantity;
        item.quantity = Math.min(Math.max(q, 1), item.stock || 99999);
      }
      recalc(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
      state.total = 0;
      state.itemCount = 0;
      state.shippingCost = 0;
      state.tax = 0;
      state.discount = 0;
    },

    updateShipping: (state, action) => {
      state.shippingCost = Number(action.payload) || 0;
      recalc(state);
    },

    updateTax: (state, action) => {
      state.tax = Number(action.payload) || 0;
      recalc(state);
    },

    applyDiscount: (state, action) => {
      state.discount = Number(action.payload) || 0;
      recalc(state);
    },

    updateCart: (state, action) => {
      // Replace full cart items array (e.g. restore from server)
      state.items = Array.isArray(action.payload) ? action.payload : [];
      recalc(state);
    },
  },
});

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartItemCount = (state) => state.cart.itemCount;
export const selectCartSubtotal = (state) => state.cart.subtotal;
export const selectCartTotal = (state) => state.cart.total;
export const selectCartShipping = (state) => state.cart.shippingCost;
export const selectCartTax = (state) => state.cart.tax;
export const selectCartDiscount = (state) => state.cart.discount;

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  updateShipping,
  updateTax,
  applyDiscount,
  updateCart,
} = cartSlice.actions;

export default cartSlice.reducer;
