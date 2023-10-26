import { configureStore } from "@reduxjs/toolkit";
import bagSlice from "./bagSlice";
import accountSlice from "./accountSlice";

const store = configureStore({
  reducer: {
    account: accountSlice,
    bag: bagSlice,
  },
});

export default store;
