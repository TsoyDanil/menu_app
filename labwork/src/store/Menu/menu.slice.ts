import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import IDishResponse from '../../interfaces/IDishResponse'
import IMenuState from './IMenuState'


const namespace: string = 'menu'

export const menuSlice = createSlice({
    name: namespace,
    initialState:{
        dishes: {} as IDishResponse,
        loading: false
    } as IMenuState,
    reducers: {

    }, 
    extraReducers: builder => {
        
    }
})