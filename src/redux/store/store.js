import { configureStore } from "@reduxjs/toolkit";
import productReducers from '../slices/productSlice/getProducts/getProductsSlice'

import productDetailReducers from '../slices/productSlice/productDetails/productDetailSlice'

const store = configureStore({
    reducer:{
        product: productReducers,
        productDetail: productDetailReducers,
    }
})

export default store; 