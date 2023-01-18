import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cart.slice";
import { menuSlice } from "./menu.slice";


export const store = configureStore({
    reducer:{
        menu: menuSlice.reducer,
        cart: cartSlice.reducer
    }
})