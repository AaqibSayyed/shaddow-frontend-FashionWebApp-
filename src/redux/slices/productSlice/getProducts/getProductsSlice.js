import { createSlice } from "@reduxjs/toolkit";
import getProducts from "./getProductsThunk";

const initialState = {
    isLoading: false,
    products: [],
    isError: false,
    errorMessage:'',
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
                state.isError = false; 
                state.errorMessage = ''
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                // console.log('featured product fetched', action.payload)
                state.isLoading = false;
                state.isError = false; 
                state.products = [...action.payload];
                state.errorMessage = ''
                // console.log('state.getProducts', state.getProducts)

            })
            .addCase(getProducts.rejected, (state, action) => {
                // console.error('Error fetching featured product:', action.error.message);
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload.message? action.payload.message: action.payload;
            });
    },
});

export default productSlice.reducer;


