import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
    loading: true,
    products: [],
    carts: []
};

//fetch all products
export const fetchAllProducts = createAsyncThunk(
    'fetchproducts',
    async () => {
        const result = await axios.get('https://fakestoreapi.com/products')
        return result.data
    }
)
const ProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        AddtoCart: (state, action) => {
            const cartItem = state.products.find((items) => {
                return items.id === action.payload
            });
            state.carts = [...state.carts, cartItem];
        },
        RemoveFromCart: (state, action) => {
            const remaining = state.carts.filter((items) => {
                return items.id !== action.payload
            })
            state.carts = remaining
        },
    },

    extraReducers: {
        [fetchAllProducts.fulfilled]: (state, action) => {
            state.loading = false
            state.products = action.payload
        },
    }
});

export const { AddtoCart, RemoveFromCart } = ProductSlice.actions
export default ProductSlice.reducer