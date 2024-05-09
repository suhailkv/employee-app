import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth", //name of the slice
  initialState: {
    token: null,
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload; // Store the JWT token when user signup
    },
    clearToken(state) {
      state.token = null; // Clear the JWT token when user log out
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
