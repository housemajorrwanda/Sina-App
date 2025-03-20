import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";
import LoginReducer from "./slice/LoginSlice";
import ProductReducer from "./slice/ProductSlice"
import SearchReducer from "./slice/searchSlice"
const store = configureStore({
  reducer: {
    login:LoginReducer,
    cart: cartReducer,
    products:ProductReducer,
    search:SearchReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;