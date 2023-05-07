import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import accountSlice from "./accountSlice";

const store = configureStore({
  reducer: {
    account: accountSlice,
    cart: cartSlice,
  },
});

export default store;
