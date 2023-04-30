import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  items: [
    {
      name: "Vasco",
      totalPrice: 22,
      price: 22,
      size: "S",
      quantity: 1,
      img: "https://static.netshoes.com.br/produtos/camisa-vasco-ii-2021-sn-torcedor-kappa-masculina/28/D24-2436-028/D24-2436-028_zoom1.jpg?ts=1596557480&ims=544x",
    },
  ],
  totalAmount: 22,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (!existingItem || newItem.size !== existingItem.size) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          totalPrice: newItem.price,
          price: newItem.price,
          size: newItem.size,
          quantity: 1,
          img: newItem.img,
        });
        state.totalAmount += newItem.price;
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + existingItem.price;
        state.totalAmount += existingItem.price;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
    deleteAllItems(state) {
      state.items = initialCartState.items;
      state.totalAmount = initialCartState.totalAmount;
    },
  },
});

export default cartSlice.reducer;
export const { addItem, removeItem, deleteAllItems } = cartSlice.actions;
