import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/store/features/auth/authSlice";
import cartReducer from "@/store/features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
