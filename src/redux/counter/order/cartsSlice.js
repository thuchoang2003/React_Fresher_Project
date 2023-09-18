import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

export const cartsSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    doAddBookToCart: (state, action) => {
      const index = state.orders.findIndex(
        (item) =>
          item.detail.dataBookDetail._id ===
          action?.payload?.detail.dataBookDetail._id
      );
      if (index === -1) {
        state.orders.push(action?.payload);
      } else {
        const result = state.orders[index].quantity + action?.payload?.quantity;
        if (result > action?.payload?.detail?.dataBookDetail.quantity)
          state.orders[index].quantity =
            action?.payload?.detail?.dataBookDetail.quantity;
        else state.orders[index].quantity = result;
      }
    },
    doUpdateCart: (state, action) => {
      const index = state.orders.findIndex(
        (item) => item.detail.dataBookDetail._id === action?.payload?._id
      );
      if (index !== -1) {
        if (
          action?.payload?.quantity >= 0 &&
          action?.payload?.quantity <=
            state.orders[index].detail.dataBookDetail.quantity
        ) {
          state.orders[index].quantity = action?.payload?.quantity;
        } else if (
          action?.payload?.quantity >
          state.orders[index].detail.dataBookDetail.quantity
        ) {
          state.orders[index].quantity =
            state.orders[index].detail.dataBookDetail.quantity;
        }
      }
    },
    doDeleteBook: (state, action) => {
      const indexDelete = state.orders.findIndex(
        (item) => item.detail.dataBookDetail._id === action?.payload?._id
      );
      if (indexDelete >= 0 && indexDelete < state.orders.length) {
        const newArray = state.orders.filter(
          (element, index) => index !== indexDelete
        );
        state.orders = newArray;
      }
    },
    doFinishOrder: (state, action) => {
      state.orders = [];
    },
  },

  extraReducers: (builder) => {},
});

export const { doAddBookToCart, doUpdateCart, doDeleteBook, doFinishOrder } =
  cartsSlice.actions;

export default cartsSlice.reducer;
