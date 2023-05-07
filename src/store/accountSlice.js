import { createSlice } from "@reduxjs/toolkit";

const initialAccountState = {
  user: {},
  cart: {},
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialAccountState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.cart = action.payload.cart;
    },
    logoutUser(state) {
      state.user = initialAccountState.user;
      state.cart = initialAccountState.cart;
    },
  },
});

export default accountSlice.reducer;
export const { setUser, logoutUser } = accountSlice.actions;
