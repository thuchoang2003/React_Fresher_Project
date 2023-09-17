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
    //     doLogout: (state) => {
    //       state.user.avatar = "";
    //       state.user.email = "";
    //       state.user.fullName = "";
    //       state.user.id = "";
    //       state.user.phone = "";
    //       state.user.role = "";
    //       state.isAuthenticated = false;
    //       state.isLoading = false;
    //       localStorage.removeItem("access_token");
    //     },
    //     doGetAccount: (state, action) => {
    //       state.user = action?.payload?.user;
    //       state.isAuthenticated = true;
    //       state.isLoading = false;
    //     },
  },
  extraReducers: (builder) => {},
});

export const { doAddBookToCart } = cartsSlice.actions;

export default cartsSlice.reducer;
