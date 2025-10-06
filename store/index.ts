import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import guestCartReducer from "./guestCartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    guestCart: guestCartReducer,
  },
});

// 🔹 Infer and export types normally
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
