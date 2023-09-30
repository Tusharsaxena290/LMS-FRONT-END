import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance"
import { json } from "react-router-dom";

const initialState={
    isLoggedIn: localStorage.getItem('isLoggedIn')||false,
    role: localStorage.getItem('role')||"",
    data: localStorage.getItem("data") || {}

}

// Async Thunk for creating new Account
export const createAccount=createAsyncThunk('/auth/signup', async (data)=>{
    try{
        const res=axiosInstance.post("user/register",data);
        toast.promise(res,{
            loading:"Wait! Creating your account",
            success: (data)=>{
                return data?.data?.message;
            },
            error: "Failed to create account"
        });
        return (await res).data

    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})


// Async Thunk for Login
export const login=createAsyncThunk('/auth/login', async (data)=>{
    try{
        const res=axiosInstance.post("user/login",data);
        toast.promise(res,{
            loading:"Wait! Authentication in progress...",
            success: (data)=>{
                return data?.data?.message;
            },
            error: "Failed to Login"
        });
        return (await res).data

    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
})
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(login.fulfilled,(state,action)=>{
            localStorage.setItem("data",JSON.stringify(action?.payload?.user));
            localStorage.setItem("isloggedIn",true);
            localStorage.setItem("role",action?.payload?.role);

            // Set state varaibles;
            state.isLoggedIn=true;
            state.data=action?.payload?.user;
            state.role=action?.payload?.role;


        })
    }

})

//export const { } = authSlice.actions;
export default authSlice.reducer;