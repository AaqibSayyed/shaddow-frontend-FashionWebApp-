import { configureStore } from "@reduxjs/toolkit";
import productReducers from '../slices/productSlice/getProducts/getProductsSlice'
import productDetailReducers from '../slices/productSlice/productDetails/productDetailSlice'
import userReducer from '../slices/userSlice/userSlice'

const store = configureStore({
    reducer:{
        product: productReducers,
        productDetail: productDetailReducers,
        user: userReducer
    }
})

export default store; 