import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getProductDetail = createAsyncThunk('productDetail', async (url,  { rejectWithValue } ) => {
    try {
        const response = await axios(url);
        return response.data.data;
    } catch (error) {
        if(error.response.status === 500){
            return rejectWithValue((error?.response?.data)? error.response.data: 'Internal Server Error')
        }
        return rejectWithValue(error.response.data);            
    }

});


export default getProductDetail