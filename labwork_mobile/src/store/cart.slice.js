import { createSlice } from "@reduxjs/toolkit"



const namespace = 'cart'

export const cartSlice = createSlice({
    name: namespace,
    initialState: {
        currentCart:{},
        loading: false
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
    extraReducers: builder => {

    }
})

export const {
    addToCart,
    removeFromCart
} = cartSlice.actions