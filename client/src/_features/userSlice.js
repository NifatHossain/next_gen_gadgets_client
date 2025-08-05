import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    name: "",
    email: "",
  },
  reducers: {
    setUser: (state, action) => {
      console.log(action);
      state.isLoggedIn = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    updateUser: (state, action) => {
      console.log(action);
      state.name = action.payload.name;
    },
    logOutUser: (state) => {
      state.isLoggedIn = false;
      state.name = "";
      state.email = "";
    },
  },
});

export const { setUser, logOutUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
