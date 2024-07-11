import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name:'colormode',
    initialState:'light',
    reducers: {
        updateColormode:(colormode, action) => {
           return action.payload
        }
    }
})
export const {updateColormode} = slice.actions

export const colormode = (state) => state.colormode


export default slice.reducer