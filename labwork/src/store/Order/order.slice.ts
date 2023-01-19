import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ordersApi } from "../../api/ordersApi"
import IOrderResponse from "../../interfaces/IOrderResponse"
import { createAppAsyncThunk } from "../createAppAsyncThunk"
import IOrderState from "./IOrderState"

const namespace:string = 'orders'

export const getOrders = createAppAsyncThunk(
    `${namespace}/getOrders`,
    async (): Promise<IOrderResponse | void> => {
        return await ordersApi.getOrders()
    }
)

export const completeOrder = createAppAsyncThunk(
    `${namespace}/completeOrder`,
    async (id: string | undefined): Promise<void> => {
        return await ordersApi.completeOrder(id)
    }
)

export const ordersSlice = createSlice({
    name: namespace,
    initialState: {
        orders: {} as IOrderResponse,
        loading: false
    } as IOrderState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(getOrders.pending, (state: IOrderState) => {
            state.loading = true
        })
        .addCase(getOrders.rejected, (state: IOrderState) => {
            state.loading = false
        })
        .addCase(getOrders.fulfilled, (state: IOrderState, action: PayloadAction<IOrderResponse | void>) => {
            state.loading = false
            if (action.payload){
                state.orders = action.payload
            }
        })
        .addCase(completeOrder.pending, (state: IOrderState) => {
            state.loading = true
        })
        .addCase(completeOrder.rejected, (state: IOrderState) => {
            state.loading = false
        })
        .addCase(completeOrder.fulfilled, (state: IOrderState) => {
            state.loading = false
        })
    }
})