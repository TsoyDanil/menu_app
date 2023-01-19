import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { menuSlice } from "./Menu/menu.slice"
import { ordersSlice } from "./Order/order.slice"



const makeStore = () => {
    return configureStore({
        reducer:{
            menu: menuSlice.reducer,
            orders: ordersSlice.reducer
        },
        devTools: true
    })
}

const store = makeStore()

export type AppDispatch = typeof store.dispatch
export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore["getState"]>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>

export const useAppDispatch: () => AppDispatch = useDispatch

export default store