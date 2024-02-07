import { createSlice } from "@reduxjs/toolkit";
import featuredProduct from "./featureProductThunk";

const initialState = {
    isLoading: false,
    featuredProduct: [],
    isError: false,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {}, 
    extraReducers: (builder) => {
        builder
            .addCase(featuredProduct.pending, (state) => {
                state.isLoading = true;
                state.isError = false; // Reset error flag on pending
            })
            .addCase(featuredProduct.fulfilled, (state, action) => {
                console.log('featured product fetched', action.payload)
                state.isLoading = false;
                state.featuredProduct = [...state.featuredProduct, ...action.payload];
                console.log('state.featuredProduct', state.featuredProduct)

            })
            .addCase(featuredProduct.rejected, (state, action) => {
                console.error('Error fetching featured product:', action.error.message);
                state.isLoading = false;
                state.isError = true;
            });
    },
});

export default productSlice.reducer;


