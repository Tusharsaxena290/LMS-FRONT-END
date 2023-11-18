import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";


function EditProfile(){
const dispatch=useDispatch();
const navigate=useNavigate();
const [data,setData]=useState({
    previewImage:"",
    fullName:"",
    avatar:undefined,
    userId: useSelector((state)=>state?.auth?.data?._id)


});

function handleImageUpload(evt){
    evt.preventDefault();
    //uploaded image
    const uploadedImage=evt.target.files[0];
    if(uploadedImage){
        //converting to data URL
        const fileReader=new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.addEventListener("load",()=>{
            setData({
                ...data,
                previewImage: this.result,
                avatar: uploadedImage
            })
        })
    }
}

function handleInputChange(e){
    const {name,value}=e.target;
    setData({
        ...data,
        [name]:value
    })

}

async function onFormSubmit(e){
    e.preventDefault();
    if(!data.fullName || !data.avatar){
        toast.error("All fields are mandatory");
        return;
    }
    if(data.fullName.length<5){
        toast.error("Name can not be of length less than five")
    }

    const formData=new FormData();
    formData.append("fullName",data.fullName);
    formData.append("avatar",data.avatar);

    await dispatch(updateProfile([data.userId,formData]));

    //updating the state-so that it is updated everywhere over the application
    await dispatch(getUserData())
    navigate("/");





}
return(
    <HomeLayout>
        <div className="flex items-center justify-center h-[100vh]">
            <form onSubmit={onFormSubmit}
                className=" flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black"
                
            >
                <h1 className="text-center text-2xl font-semibold">
                    Edit Profile
                </h1>

                <label className="cursor-pointer"
                htmlFor="image_uploads"
                >
                    {data?.previewImage?(
                        <img src={data?.previewImage} 
                        className="w-28 h-28 rounded-full m-auto" />
                    ):
                    (
                        <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
                    )
                    }

                </label>

                <input
                onChange={handleImageUpload}
                className="hidden"
                type="file"
                id="image_uploads"
                name="image_uploads"
                accept=".jpg, .png, .svg, .jpeg"
                />

                <div className="flex flex-col gap-1">
                    <label htmlFor="fullName"
                    className="text-lg font-semibold"
                    >Full Name</label>

                    <input
                        required
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Enter your name"
                        className="bg-transparent px-2 py-1 border"
                        value={data.fullName}
                        onChange={handleInputChange}
                    />

                </div>

                <button type="submit" className="w-full  bg-yellow-600 hover: bg-yellow-400 transition-all ease-in-out duration-300 py-2 text-lg cursor-pointer rounded-lg">
                    Update Profile
                </button>

                <Link to="/user/profile">
                    <p className="link text-accent cursor-pointer flex items-center justify-center w-full">
                    <AiOutlineArrowLeft/>Go Back To Profile</p>
                </Link>

            </form>

        </div>
    </HomeLayout>  
)

}

export default EditProfile;