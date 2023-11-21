import { createSlice } from "@reduxjs/toolkit";

const initialBagState = {
  items: [],
  totalAmount: 0,
  bagNotification: [false, {}], // isBagShown, item
  checkoutInputs: [],
};

const bagSlice = createSlice({
  name: "bag",
  initialState: initialBagState,
  reducers: {
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
    addCheckoutInputValidity: (state, action) => {
      const [isValid, itemLabel] = action.payload;
      const newItem = { label: itemLabel, isValid };
      const itemIdx = state.checkoutInputs.findIndex((item) => {
        return item.label === itemLabel;
      });
      const itemExists = itemIdx !== -1 ? true : false;
      let newArray;
      if (itemExists) {
        newArray = state.checkoutInputs.map((item) => {
          if (item.label !== itemLabel) {
            return item;
          } else {
            return newItem;
          }
        });
      } else {
        newArray = [...state.checkoutInputs, newItem];
      }

      state.checkoutInputs = newArray;
    },
  },
});

export default bagSlice.reducer;
export const {
  triggerBagNotification,
  hideBagNotification,
  clearBagNotificationMessage,
  addCheckoutInputValidity,
} = bagSlice.actions;
