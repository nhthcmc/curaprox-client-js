import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
    name: "category",
    initialState: {
        data: null,
        addModal: false
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload
        },
    }
});
export const categoryReducer = categorySlice.reducer;
export const categoryAction = categorySlice.actions;