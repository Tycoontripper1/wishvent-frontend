import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GuestCartItem {
  productId: string;
  vendorId: string;
  price: string;
  quantity: number;
  subTotal: number;
  overweightCategory?: string;
  additionalDeliveryFee?: number;
}

interface GuestCartDetails {
  id: string;
  sessionId: string;
  isGuest: boolean;
  totalAmount: number;
  deliveryFee: number;
  email: string;
  address: string;
  items: GuestCartItem[];
}

interface GuestCartState {
  details: GuestCartDetails | null;
}

const initialState: GuestCartState = {
  details: null,
};

const guestCartSlice = createSlice({
  name: "guestCart",
  initialState,
  reducers: {
    setGuestCart(state, action: PayloadAction<GuestCartDetails>) {
      state.details = action.payload;
    },
    clearGuestCart(state) {
      state.details = null;
    },
  },
});

export const { setGuestCart, clearGuestCart } = guestCartSlice.actions;
export default guestCartSlice.reducer;
