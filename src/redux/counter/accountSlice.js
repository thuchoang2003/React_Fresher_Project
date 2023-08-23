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
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    doLogin: (state, action) => {
      state.user = action?.payload?.user;
      state.isAuthenticated = true;
    },
    doLogout: (state) => {
      state = initialState;
    },
    doGetAccount: (state, action) => {
      state.user = action?.payload?.user;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {},
});

export const { doLogin, doGetAccount, doLogout } = accountSlice.actions;

export default accountSlice.reducer;
