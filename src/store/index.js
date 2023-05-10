import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import accountSlice from "./accountSlice";
import shirtsSlice from "./shirtsSlice";

const store = configureStore({
  reducer: {
    account: accountSlice,
    cart: cartSlice,
    shirts: shirtsSlice,
  },
});

export default store;
