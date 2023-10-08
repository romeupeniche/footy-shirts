import { configureStore } from "@reduxjs/toolkit";
import bagSlice from "./bagSlice";
import accountSlice from "./accountSlice";
import shirtsSlice from "./shirtsSlice";

const store = configureStore({
  reducer: {
    account: accountSlice,
    bag: bagSlice,
    shirts: shirtsSlice,
  },
});

export default store;
