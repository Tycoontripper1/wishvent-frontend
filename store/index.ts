import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
// import purchaseReducer from './purchaseSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    // purchase: purchaseReducer,
  },
});

// 🔹 Infer and export types normally
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
