import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const featuredProduct = createAsyncThunk('featuredProduct', async () => {
    try {
        const response = await axios('/api/v1/products');
        return response.data.data;
    } catch (error) {
        throw error
    }
});


export default featuredProduct