import { createSlice } from "@reduxjs/toolkit";

const initialShirtsState = {
  shirts: {},
};

const shirtsSlice = createSlice({
  name: "shirts",
  initialState: initialShirtsState,
  reducers: {
    setShirts(state, action) {
      state.shirts = action.payload;
      console.log(state.shirts);
    },
  },
});

export default shirtsSlice.reducer;
export const { setShirts } = shirtsSlice.actions;
