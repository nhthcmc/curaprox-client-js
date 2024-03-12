import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        data: null,
        addModal: false
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload
        },
        loadModal: (state) => {
            state.addModal = !state.addModal
        },
        addData: (state, action) => {
            state.data.push(action.payload)
        }
    }
})
export const productReducer = productSlice.reducer;
export const productAction = productSlice.actions;