import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "Explorer",
  userEmail: "haveagoodday@gmail.com",
  fileId: "665cfb3f00312139e5ee",
  hasProfile: false,
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    setUserDetails(state, action) {
      state.userName = action.payload.name;
      state.userEmail = action.payload.email;
      state.fileId = action.payload.fileId;
      state.hasProfile = action.payload?.hasProfile;
      // localStorage.setItem(
      //   state.userEmail + "userDetails",
      //   JSON.stringify(action.payload),
      // );
    },
    resetUserDetails(state) {
      state.userName = "Explorer!";
      state.userEmail = "haveagoodday@gmail.com";
      state.fileId = "665cfb3f00312139e5ee";
      state.hasProfile = false;
    },
    setInitialState(state, action) {
      state.userName = action.payload.name;
      state.userEmail = action.payload.email;
      state.fileId = action.payload.fileId;
      state.hasProfile = action.payload.hasProfile;
    },

    setLocalStorage(state, action) {
      localStorage.setItem(
        state.userEmail + "userDetails",
        JSON.stringify(action.payload),
      );
    },
  },
});

export const { setUserDetails, resetUserDetails, setInitialState } =
  userDetailsSlice.actions;
export default userDetailsSlice.reducer;
