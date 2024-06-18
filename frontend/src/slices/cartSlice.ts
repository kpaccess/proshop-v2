import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart") || "")
  : { cartItems: [] };

const addDecimals = (num: number) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      console.log(" state ", state);
      const item = action.payload;

      console.log(" item ", item);

      const existItem = state.cartItems.find(
        (x: { _id: string }) => x._id === item._id
      );

      console.log(" existItem ", existItem);

      if (existItem) {
        state.cartItems = state?.cartItems.map((x: { _id: string }) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      console.log(" items price ", state.itemsPrice);

      // Calculate items price
      state.itemsPrice = addDecimals(
        state?.cartItem?.reduce(
          (acc: number, item: { price: number; qty: number }) =>
            acc + item?.price * item?.qty,
          0
        )
      );

      // Calculate shipping price (if order is over $100 free otherwise $10 shipping)
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

      // Calculate tax price
      state.taxPrice = addDecimals(
        Number((0.15 * state.itemsPrice).toFixed(2))
      );
      // Calculate total price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
