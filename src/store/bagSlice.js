import { createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../firebase-config";
import { ref, set } from "firebase/database";

const initialBagState = {
  items: [],
  totalAmount: 0,
  bagNotification: [false, {}], // isBagShown, item
};

const updateDatabase = async (bag) => {
  if (auth.currentUser) {
    await set(ref(db, "carts/" + auth.currentUser.uid), {
      bag,
    });
  }
};

const bagSlice = createSlice({
  name: "bag",
  initialState: initialBagState,
  reducers: {
    changeItemQuantity(state, action) {
      const { id, size, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === id && item.size === size
      );
      const existingItem = state.items[existingItemIndex];
      const valueToBeAdded =
        existingItem.price * (quantity - existingItem.quantity);
      state.totalAmount += valueToBeAdded;
      state.items[existingItemIndex].quantity = quantity;

      updateDatabase(state);
    },
    addItem(state, action) {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === newItem.id && item.size === newItem.size
      );

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity++;
        newItem.price = state.items[existingItemIndex].price;
      } else {
        state.items.push({
          gender: newItem.gender,
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          size: newItem.size,
          quantity: 1,
          img: newItem.img,
        });
      }

      state.totalAmount += newItem.price;

      updateDatabase(state);
    },
    deleteAllItems(state, action) {
      const { id, size } = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === id && item.size === size
      );
      const itemTotal = existingItem.price * existingItem.quantity;
      state.totalAmount -= itemTotal;

      state.items = state.items.filter(
        (item) => !(item.id === id && item.size === size)
      );

      updateDatabase(state);
    },
    setItems(state, action) {
      const newBag = action.payload;
      state.items = newBag.items ?? initialBagState.items;
      state.totalAmount = newBag.totalAmount;
    },
    triggerBagNotification(state, action) {
      state.bagNotification[0] = true;
      state.bagNotification[1] = action.payload;
    },
    hideBagNotification: (state) => {
      state.bagNotification[0] = false;
    },
    clearBagNotificationMessage: (state) => {
      state.bagNotification[1] = {};
    },
  },
});

export default bagSlice.reducer;
export const {
  changeItemQuantity,
  addItem,
  deleteAllItems,
  setItems,
  triggerBagNotification,
  hideBagNotification,
  clearBagNotificationMessage,
} = bagSlice.actions;
