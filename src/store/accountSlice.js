import { createSlice } from "@reduxjs/toolkit";

const initialAccountState = {
  user: {},
  isAdmin: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState: initialAccountState,
  reducers: {
    setUser(state, action) {
      if (action.payload === null) {
        state.user = initialAccountState.user;
        state.isAdmin = initialAccountState.isAdmin;
      } else {
        state.user = action.payload.user;
        state.isAdmin = action.payload.isAdmin;
      }
    },
    logoutUser(state) {
      state.user = initialAccountState.user;
    },
  },
});

export default accountSlice.reducer;
export const { setUser, logoutUser } = accountSlice.actions;
