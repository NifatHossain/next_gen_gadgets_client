import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    name: "",
    email: "",
    role: "",
    token: null,
    id: null,
  },
  reducers: {
    setUser: (state, action) => {
      console.log("Setting user:", action.payload)
      state.isLoggedIn = true
      state.name = action.payload.name
      state.email = action.payload.email
      state.role = action.payload.role || "" 
      state.id = action.payload.id
      if (action.payload.token) {
        state.token = action.payload.token
      }
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    updateUser: (state, action) => {
      console.log("Updating user:", action.payload)
      if (action.payload.name) state.name = action.payload.name
      if (action.payload.email) state.email = action.payload.email
      if (action.payload.role) state.role = action.payload.role
    },
    logOutUser: (state) => {
      state.isLoggedIn = false
      state.name = ""
      state.email = ""
      state.role = ""
      state.token = null
      state.id = null
    },
  },
})

export const { setUser, setToken, logOutUser, updateUser } = userSlice.actions

export default userSlice.reducer
