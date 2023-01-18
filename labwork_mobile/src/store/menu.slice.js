import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { menuApi } from "../api/menuApi"


const namespace = 'menu'

export const getMenu = createAsyncThunk(
    `${namespace}/getMenu`,
    async () => {
        return await menuApi.getMenu()
    }
)

export const menuSlice = createSlice({
    name: namespace,
    initialState:{
        dishes:{}, 
        loading: false
    },
    reducers:{

    },
    extraReducers: builder =>{
        builder
        .addCase(getMenu.pending, (state) => {
            state.loading = true
        })
        .addCase(getMenu.rejected, (state) => {
            state.loading = false
        })
        .addCase(getMenu.fulfilled, (state, action) => {
            state.loading = false
            state.dishes = action.payload
        })
    }
})