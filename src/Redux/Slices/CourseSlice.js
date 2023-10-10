import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";


//initial state for course slice
const initialState={
    CourseData:[]

}


// Async thunk for fetching all courses

export const getAllCourses=createAsyncThunk('/course/get', async ()=>{
try{
    const res=axiosInstance.get("/courses");
    toast.promise(res,{
        loading:"Loading course data!",
        success:"courses loaded successfully!",
        error: "Failed to get the courses data!"
    });
    return (await res).data.courses;
}
catch(error){
    toast.error(error?.response?.data?.message)
}
});

// Async thunk for create new course

export const createNewCourse=createAsyncThunk("course/create",async (data)=>{
    try {
        let formData=new FormData();
        formData.append("title",data?.title);
        formData.append("description",data?.description);
        formData.append("category",data?.category);
        formData.append("createdBy",data?.createdBy);
        formData.append("thumbnail",data?.thumbnail);
        const response=axiosInstance.post("/courses");
        toast.promise(response,{
            loading:"Creating new course",
            success:"Course created successfully",
            error:"Failed to create course"
        })
        return (await response).data;


    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

//course slice
const courseSlice=createSlice({
    name:"courses",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllCourses.fulfilled,(state,action)=>{
            if(action.payload){
                state.CourseData=[...action.payload];
            }
        })

    }
});



export default courseSlice.reducer;
