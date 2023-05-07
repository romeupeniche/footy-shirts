import { createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../firebase-config";
import { ref, set } from "firebase/database";

const initialCartState = {
  items: [
    {
      name: "Vasco",
      id: "macaco",
      totalPrice: 22,
      price: 22,
      size: "S",
      quantity: 1,
      gender: "macaco",
      img: "https://static.netshoes.com.br/produtos/camisa-vasco-ii-2021-sn-torcedor-kappa-masculina/28/D24-2436-028/D24-2436-028_zoom1.jpg?ts=1596557480&ims=544x",
    },
  ],
  totalAmount: 22,
};

const updateDatabase = async (cart) => {
  await set(ref(db, "carts/" + auth.currentUser.uid), {
    cart,
  });
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
          gender: newItem.gender,
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

      updateDatabase(state);
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalAmount = state.totalAmount - existingItem.price;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }

      updateDatabase(state);
    },
    deleteAllItems(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalAmount =
        state.totalAmount - existingItem.price * existingItem.quantity;
      state.items = state.items.filter((item) => item.id !== id);

      updateDatabase(state);
    },
    setItems(state, action) {
      const newCart = action.payload;
      state.items = newCart.items;
      state.totalAmount = newCart.totalAmount;
    },
  },
});

export default cartSlice.reducer;
export const { addItem, removeItem, deleteAllItems, setItems } =
  cartSlice.actions;
