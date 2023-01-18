import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { menuApi } from '../../api/menuApi'
import IDish from '../../interfaces/IDish'
import IDishResponse from '../../interfaces/IDishResponse'
import IMenuCombinedData from '../../interfaces/IMenuCombinedData'
import { createAppAsyncThunk } from '../createAppAsyncThunk'
import IMenuState from './IMenuState'


const namespace: string = 'menu'

export const getMenu = createAppAsyncThunk(
    `${namespace}/getMenu`,
    async (): Promise<IDishResponse | void> => {
        return await menuApi.getMenu()
    }
)

export const postNewDish = createAppAsyncThunk(
    `${namespace}/postNewDish`,
    async (dish: IDish): Promise<void> => {
        return await menuApi.postNewDish(dish)
    }
)

export const changeDishData = createAppAsyncThunk(
    `${namespace}/changeDishData`,
    async (dataObject: IMenuCombinedData): Promise<void> => {
        return await menuApi.changeDishData(dataObject.id, dataObject.dishData)
    }
)

export const deleteDishFromMenu = createAppAsyncThunk(
    `${namespace}/deleteDishFromMenu`,
    async (id: string | undefined): Promise<void> => {
        return await menuApi.deleteDishFromMenu(id)
    }
)

export const menuSlice = createSlice({
    name: namespace,
    initialState:{
        dishes: {} as IDishResponse,
        loading: false
    } as IMenuState,
    reducers: {

    }, 
    extraReducers: builder => {
        builder
        .addCase(getMenu.pending, (state: IMenuState) => {
            state.loading = true
        })
        .addCase(getMenu.rejected, (state: IMenuState) => {
            state.loading = false
        })
        .addCase(getMenu.fulfilled, (state: IMenuState, action: PayloadAction<IDishResponse | void> ) => {
            state.loading = false
            if (action.payload){
                state.dishes = action.payload
            }
        })
        .addCase(postNewDish.pending, (state: IMenuState) => {
            state.loading = true
        })
        .addCase(postNewDish.rejected, (state: IMenuState) => {
            state.loading = false
        })
        .addCase(postNewDish.fulfilled, (state: IMenuState) => {
            state.loading = false
        })
        .addCase(changeDishData.pending, (state: IMenuState) => {
            state.loading = true
        })
        .addCase(changeDishData.rejected, (state: IMenuState) => {
            state.loading = false
        })
        .addCase(changeDishData.fulfilled, (state: IMenuState) => {
            state.loading = false
        })
        .addCase(deleteDishFromMenu.pending, (state: IMenuState) => {
            state.loading = true
        })
        .addCase(deleteDishFromMenu.rejected, (state: IMenuState) => {
            state.loading = false
        })
        .addCase(deleteDishFromMenu.fulfilled, (state: IMenuState) => {
            state.loading = false
        })
    }
})

export const {

} = menuSlice.actions