import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";
import LoginReducer from "./slice/LoginSlice";
import ProductReducer from "./slice/ProductSlice"
import SearchReducer from "./slice/searchSlice";
import ChatReducer from "./slice/ChatSlice"
const store = configureStore({
  reducer: {
    login:LoginReducer,
    cart: cartReducer,
    products:ProductReducer,
    search:SearchReducer,
    chat:ChatReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;