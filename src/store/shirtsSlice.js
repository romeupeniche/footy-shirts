import { createSlice } from "@reduxjs/toolkit";
import { ref, set } from "firebase/database";
import { db } from "../firebase-config";

const initialShirtsState = {
  shirts: {},
};

// const updateDatabase = async (gender, shirts) => {
//   await set(ref(db, "carts/" + gender), {
//     cart,
//   });
// };

const shirtsSlice = createSlice({
  name: "shirts",
  initialState: initialShirtsState,
  reducers: {
    setShirts(state, action) {
      state.shirts = action.payload;
    },
    setNewShirt(state, action) {
      const gender = action.payload.gender;
      const newItem = action.payload.newItem;
      const lastItem =
        state.shirts[gender][
          Object.keys(state.shirts[gender])[
            Object.keys(state.shirts[gender]).length - 1
          ]
        ];
      const id = lastItem.id + 1;
      state.shirts = {
        ...state.shirts,
        gender: {
          ...state.shirts[gender],
          name: {
            id,
            imgs: newItem.imgs,
            price: newItem.price,
            sizes: newItem.sizes,
            name: newItem.name,
            commonTypos: newItem.commonTypos,
          },
        },
      };
    },
  },
});

export default shirtsSlice.reducer;
export const { setShirts, setNewShirt } = shirtsSlice.actions;
