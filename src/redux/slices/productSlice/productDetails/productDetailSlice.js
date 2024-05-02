import { createSlice } from "@reduxjs/toolkit";
import getProductDetail from "./productDetailsThunk";

const initialState = {
    isLoading: false,
    productDetail: {},
    isError: false,
    errorMessage:'',
};

const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState,
    reducers: {}, 
    extraReducers: (builder) => {
        builder
        .addCase(getProductDetail.pending, (state) => {
            state.isLoading = true;
            state.isError = false; 
            state.errorMessage = ''
        })
        .addCase(getProductDetail.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.productDetail = {...action.payload}
            state.isError = false; 
            state.errorMessage = '';

        })
        .addCase(getProductDetail.rejected, (state, action)=>{
            state.isLoading = false;
            state.isError = true; 
            state.errorMessage = action.payload.message? action.payload.message: action.payload;
        })
    
    },
});

export default productDetailSlice.reducer;


