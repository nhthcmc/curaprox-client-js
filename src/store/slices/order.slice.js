import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        cart: null,
        orders: []
    },
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload
        },
        setOrder: (state, action) => {
            state.orders = action.payload
        },
        deleteItem: (state, action) => {
            state.cart = {
                ...state.cart,
                detail: state.cart.detail.filter(item => item.id != action.payload)
            }
        },
        updateItem: (state, action) => {
            state.cart = {
                ...state.cart,
                detail: state.cart.detail.map(item => {
                    if (item.id == action.payload.itemId) {
                        return {
                            ...item,
                            quantity: action.payload.quantity
                        }
                    }
                    return item
                })
            }
        },
        addOrder: (state, action) => {
            state.orders.unshift(action.payload)
        }
    }
})
export const orderReducer = orderSlice.reducer;
export const orderAction = orderSlice.actions;