import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "Explorer",
  userEmail: "haveagoodday@gmail.com",
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setUserDetails(state, action) {
      state.userName = action.payload.name;
      state.userEmail = action.payload.email;
      localStorage.setItem("userDetails", JSON.stringify(action.payload));
    },
    resetUserDetails(state) {
      state.userName = "Explorer";
      state.userEmail = "haveagoodday@gmail.com";
      localStorage.removeItem("userDetails");
    },
    setInitialState(state, action) {
      state.userName = action.payload.name;
      state.userEmail = action.payload.email;
    },
  },
});

export const { setUserDetails, resetUserDetails, setInitialState } =
  userDetailsSlice.actions;
export default userDetailsSlice.reducer;
