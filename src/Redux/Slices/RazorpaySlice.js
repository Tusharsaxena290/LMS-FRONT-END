// inital state for razorpay slice

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"



const initialState={
    key:"",
    subscription_Id:"",
    isPaymentVerified:false,
    allPayments:{},
    finalMonths:{},
    monthlySalesRecord:[]

}

export const getRazorPayId = createAsyncThunk("/razorpay/getId",async()=>{
    try {
        const response=await axiosInstance.get("/payments/razorpay-key")
        return response.data;
    } catch (error) {
        toast.error("Failed to load the data")
    }
})

export const purchaseCourseBundle = createAsyncThunk("/purchasecourse",async()=>{
    try {
        const response=await axiosInstance.post("/payments/subscribe")
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const verifyUserPayment = createAsyncThunk("/payments/verify",async(data)=>{
    try {
        const response=await axiosInstance.post("/payments/verify",{
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_subscription_id:data.razorpay_subscription_id,
            razorpay_signature:data.razorpay_signature
        })
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const getPaymentRecord = createAsyncThunk("/payments/record",async()=>{
    try {
        const response= axiosInstance.get("/payments?count=100");
        toast.promise(response,{
            loading:"Getting the payment records",
            success :(data)=>{
                return data?.data?.message
            },
            error: "Failed to load the payment records"
        })
        return (await response).data;
    } catch (error) {
        toast.error("Operation Failed");
    }
})

export const cancelSubscription = createAsyncThunk("/payments/cancel",async()=>{
    try {
        const response= axiosInstance.post("/payments/unsubscribe");
        toast.promise(response,{
            loading:"Unsubscribing",
            success :(data)=>{
                return data?.data?.message
            },
            error: "Failed to unsubscribe"
        })
        return (await response).data;
    } catch (error) {
        toast.error("Operation Failed");
    }
})

const razorPaySlice= createSlice({
    name:"razorpay",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getRazorPayId.fulfilled ,(state,action)=>{
            state.key=action?.payload?.key
        })
        .addCase(purchaseCourseBundle.fulfilled ,(state,action)=>{
            state.subscription_Id=action?.payload?.subscription_Id
        })
        .addCase(verifyUserPayment.fulfilled ,(state,action)=>{
            toast.success(action?.payload?.message);
            state.isPaymentVerified=action?.payload?.success
        })
        .addCase(verifyUserPayment.rejected ,(state,action)=>{
            toast.success(action?.payload?.message);
            state.isPaymentVerified=action?.payload?.success
        })
        .addCase(getPaymentRecord.rejected ,(state,action)=>{
           state.allPayments= action?.payload?.allPayments;
           state.finalMonths=action?.payload?.finalMonths;
           state.monthlySalesRecord=action?.payload?.monthlySalesRecord;
        })
    }
})
export default razorPaySlice.reducer;