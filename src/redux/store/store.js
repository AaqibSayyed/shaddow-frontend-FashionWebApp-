import { configureStore } from "@reduxjs/toolkit";
import productReducers from '../slices/productSlice/productSlice'


const store = configureStore({
    reducer:{
        product: productReducers
    }
})

export default store; 