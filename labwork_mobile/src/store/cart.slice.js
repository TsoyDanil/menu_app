import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { cartApi } from "../api/cartApi"

const namespace = 'cart'

export const postOrder = createAsyncThunk(
    `${namespace}/postOrder`,
    async (order) => {
        return await cartApi.postOrder(order)
    }
)

export const cartSlice = createSlice({
    name: namespace,
    initialState: {
        currentCart:{},
        loading: false,
        deliveryCost: 150
    },
    reducers:{
        addToCart(state, action){
            try{
                state.currentCart = {
                    ...state.currentCart,
                    [action.payload]: state.currentCart[action.payload] + 1 || 1
                }
            } catch(error){
                console.log(error)
            }
        },
        removeFromCart(state, action){
            try{
                state.currentCart = {
                    ...state.currentCart,
                    [action.payload]: state.currentCart[action.payload] > 0 ?
                    state.currentCart[action.payload] - 1:
                    delete(state.currentCart[action.payload])
                }

            } catch(error){
                console.log(error)
            }
        }
    },
    extraReducers: builder =>{
        builder
        .addCase(postOrder.pending, (state) => {
            state.loading = true
        })
        .addCase(postOrder.rejected, (state) => {
            state.loading = false
        })
        .addCase(postOrder.fulfilled, (state) => {
            state.loading = false
            state.currentCart = {}
        })
    }
})

export const {
    addToCart,
    removeFromCart
} = cartSlice.actions