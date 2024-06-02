import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userDetailsSlice from "./userDetailsSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    userDetails: userDetailsSlice,
  },
});

export default store;
