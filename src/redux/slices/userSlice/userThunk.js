import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const userLogin = createAsyncThunk('userLogin', async (userCredentials,{ rejectWithValue } ) => {
    
    const data= {
        email: userCredentials.email,
        password: userCredentials.password
    }

    const config = { headers: { "Content-Type": "application/json" } };

    try{
        const response = await axios.post('/api/v1/login', data, config)
        return response.data.user
    }

    catch(error){
        if(error.response.status === 500){
            return rejectWithValue((error?.response?.data)? error.response.data: 'Internal Server Error')
        }
        return rejectWithValue(error.response.data);             
    }

});

export const userRegister = createAsyncThunk('userRegister', async (userCredentials,{ rejectWithValue } ) => {
    
    const data= {
        name: userCredentials.name,
        email: userCredentials.email,
        password: userCredentials.password
    }

    const config = { headers: { "Content-Type": "application/json" } };

    try{
        const response = await axios.post('/api/v1/register', data, config)
        return response.data.user
    }

    catch(error){
        if(error.response.status === 500){
            return rejectWithValue((error?.response?.data)? error.response.data: 'Internal Server Error')
        }
        return rejectWithValue(error.response.data);       }
});


export const updateUserState = createAsyncThunk('updateUserState', async (_,{ rejectWithValue } ) => {
    
    try{
        const response = await axios('/api/v1/me')
        return response.data.user
    }
    

    catch(error){
        if(error.response.status === 500){
            return rejectWithValue((error?.response?.data)? error.response.data: 'Internal Server Error')
        }
        return rejectWithValue(error.response.data);       }
});


export const userLogout = createAsyncThunk('userLogout', async (_,{ rejectWithValue } ) => {
    
    try{
        const response = await axios('/api/v1/logout')
        return response.data
    }
    
    catch(error){
        if(error.response.status === 500){
            return rejectWithValue((error?.response?.data)? error.response.data: 'Internal Server Error')
        }
        return rejectWithValue(error.response.data);       
    }
});


export const userPasswordForget = createAsyncThunk('userPasswordForget', async (email,{ rejectWithValue } ) => {
    
    const config = { headers: { "Content-Type": "application/json" } };
    const data = {
        email
        }
    try{
        const response = await axios.post('/api/v1/forgetPassword', data, config)
        return response.data.message
    }
    
    catch(error){
        if(error.response.status === 500){
            return rejectWithValue((error?.response?.data)? error.response.data: 'Internal Server Error')
        }
        return rejectWithValue(error.response.data);       
    }
});


export const userPasswordReset = createAsyncThunk('userPasswordReset', async (userData,{ rejectWithValue } ) => {
    
    const config = { headers: { "Content-Type": "application/json" } };
    const url = `/api/v1/password/reset/${userData.resetToken}`

    const data = {
        password: userData.password,
        confirmPassword : userData.confirmPassword
    }

    console.log('url',url)

    try{
        const response = await axios.put(url, data, config)
        console.log('response',response.data.message)
        return response.data.message
    }
    
    catch(error){
        if(error.response.status === 500){
            return rejectWithValue((error?.response?.data)? error.response.data: 'Internal Server Error')
        }
        return rejectWithValue(error.response.data);       
    }
});