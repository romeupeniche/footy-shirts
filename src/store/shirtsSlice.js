import { createSlice } from "@reduxjs/toolkit";
import { child, push, ref, set } from "firebase/database";
import { db } from "../firebase-config";

const initialShirtsState = {
  shirts: {},
};

const updateDatabase = async (gender, shirt, id) => {
  await set(ref(db, `shirts/${gender}/${id}`), {
    ...shirt,
    id,
  });
};

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

      let id;
      if (newItem?.id) {
        id = newItem.id;
      } else {
        const newShirtKey = push(child(ref(db), "shirts/" + gender)).key;
        const newShirtId =
          newItem.name.replace(/[^A-Z0-9]/gi, "_").toLowerCase() +
          "_" +
          newShirtKey;
        // const lastItem =
        //   state.shirts[gender][
        //     Object.keys(state.shirts[gender])[
        //       Object.keys(state.shirts[gender]).length - 1
        //     ]
        //   ];
        id = newShirtId;
      }
      state.shirts = {
        ...state.shirts,
        [gender]: {
          ...state.shirts[gender],
          [id]: {
            id,
            imgs: newItem.imgs,
            price: newItem.price,
            sizes: newItem.sizes,
            name: newItem.name,
            commonTypos: newItem.commonTypos,
          },
        },
      };
      updateDatabase(gender, newItem, id);
    },
  },
});

export default shirtsSlice.reducer;
export const { setShirts, setNewShirt } = shirtsSlice.actions;
