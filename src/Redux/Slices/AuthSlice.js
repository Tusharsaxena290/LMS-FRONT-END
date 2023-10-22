import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";

const initialState={
    isLoggedIn: localStorage.getItem('isLoggedIn')||false,
    role: localStorage.getItem('role')||"",
    data: JSON.parse(localStorage.getItem("data") )|| {}

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


//Async Thunk for Logout
export const logout=createAsyncThunk('/auth/logout',async ()=>{
    try{
        const res=axiosInstance.post('user/logout');
        toast.promise(res,{
            loading:"Wait! Logout in progress...",
            success:(data)=>{
                return data?.data?.message;
            },
            error:"Failed to logout"
        })
        return (await res).data
    }
    catch(error){
        toast.error(error?.response?.data?.message);

    }
})


//Async thunk for user's profile update

export const updateProfile=createAsyncThunk('/auth/update/profile',async (data)=>{
    try{
        const res=axiosInstance.put(`user/update/${data[0]}`, data[1]);
        toast.promise(res,{
            loading:"Wait! Profile update in progress...",
            success:(data)=>{
                return data?.data?.message;
            },
            error:"Failed to update profile"
        })
        return (await res).data
    }
    catch(error){
        toast.error(error?.response?.data?.message);

    }
})

//Async thunk to getUserData
export const getUserData=createAsyncThunk('/auth/details',async ()=>{
    try{
        const res=axiosInstance.get('user/me', data);
        return (await res).data
    }
    catch(error){
        toast.error(error?.message);

    }
})


const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(login.fulfilled,(state,action)=>{
            localStorage.setItem("data",JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn",true);
            localStorage.setItem("role",action?.payload?.role);

            // Set state varaibles;
            state.isLoggedIn=true;
            state.data=action?.payload?.user;
            state.role=action?.payload?.role;


        })
        // .addCase(login.rejected,(state,action)=>{
        //     localStorage.isLoggedIn=false;
        //     state.isLoggedIn=false;
        // })
        .addCase(logout.fulfilled,(state)=>{
           //clear localstorage
           localStorage.clear();

            //set state variables
            state.isLoggedIn=false;
            state.data={};
            state.role="";

        })

        .addCase(getUserData.fulfilled,(state,action)=>{
            //state updation on profileUpdat

            localStorage.setItem("data",JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn",true);
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