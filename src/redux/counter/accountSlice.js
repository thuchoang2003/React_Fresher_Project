import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    avatar: "",
    email: "",
    fullName: "",
    id: "",
    phone: "",
    role: "",
  },
  isAuthenticated: false,
  isLoading: false,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    doLogin: (state, action) => {
      state.user = action?.payload?.user;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    doLogout: (state) => {
      state.user.avatar = "";
      state.user.email = "";
      state.user.fullName = "";
      state.user.id = "";
      state.user.phone = "";
      state.user.role = "";
      state.isAuthenticated = false;
      state.isLoading = false;
      localStorage.removeItem("access_token");
    },
    doGetAccount: (state, action) => {
      state.user = action?.payload?.user;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    doUpdateInfomation: (state, action) => {
      state.user.avatar = action?.payload?.avatar;
      state.user.phone = action?.payload?.phone;
      state.user.fullName = action?.payload?.fullName;
    },
  },
  extraReducers: (builder) => {},
});

export const { doLogin, doGetAccount, doLogout, doUpdateInfomation } =
  accountSlice.actions;

export default accountSlice.reducer;
