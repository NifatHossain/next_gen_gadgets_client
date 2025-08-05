// store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage
import userReducer from "@/_features/userSlice"
import { authApi } from "@/_features/apiSlice/authApi"
import { productsApi } from "@/_features/apiSlice/productsApi"
import { usersApi } from "@/_features/apiSlice/usersApi"

const rootReducer = combineReducers({
  user: userReducer,
  [authApi.reducerPath]: authApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
})

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // only persist the user slice
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
      }).concat(authApi.middleware, productsApi.middleware, usersApi.middleware),
  })
}
