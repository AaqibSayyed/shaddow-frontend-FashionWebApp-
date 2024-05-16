import { createSlice } from "@reduxjs/toolkit";
import getProducts from "./getProductsThunk";

const initialState = {
    isLoading: false,
    products: [],
    isError: false,
    errorMessage:'',
    productCategory:'',
    productSearchKeyword:'',
    pageRequested : 1,
    filteredSearchCount: 0,
    productPrice: [0,3000],
    productSubCategory: [],
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
         updateCategory (state, action){
             state.productCategory = action.payload
        },
        updateSearchKeyword(state, action){
            state.productSearchKeyword = action.payload
        },
        updatePageRequested(state, action){
            state.pageRequested = action.payload
        },
        updateProductPrice(state, action){
            state.productPrice = action.payload
        },
        updateproductSubCategory(state, action){
            if(typeof action.payload !== 'object'){
            state.productSubCategory = [...state.productSubCategory, action.payload]
        }

            else{
                state.productSubCategory = action.payload
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
                state.isError = false; 
                state.products = [];
                state.filteredSearchCount = 0
                state.errorMessage = ''
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false; 
                state.products = [...action.payload.data];
                state.filteredSearchCount = action.payload.filteredSearchCount
                state.errorMessage = ''
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.products = [];
                state.filteredSearchCount = 0
                state.errorMessage = action.payload.message? action.payload.message: action.payload;
            });
    },
});

export const {updateCategory,updateSearchKeyword, updatePageRequested, updateProductPrice,updateproductSubCategory} = productSlice.actions
export default productSlice.reducer;


