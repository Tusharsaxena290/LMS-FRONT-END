import React, { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import {createAccount} from "../Redux/Slices/AuthSlice"



function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local States
  const [previewImage, setPreviewImage] = useState("");
  const [signupData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  // Handle User Input(not image)
  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignUpData({
      ...signupData,
      [name]: value,
    });
  }

  //      Handler for Profile Image

  function handleProfileImage(e) {
    e.preventDefault();
    // getting img
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      setSignUpData({
        ...signupData,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", () => {
        setPreviewImage(fileReader.result);
      });
    }
  }

  // Function to create new UserAccount(Signup)

  async function createNewUser(event) {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let passwordFormat =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    event.preventDefault();
    if (
      !signupData.email ||
      !signupData.password ||
      !signupData.fullName ||
      !signupData.avatar
    ) {
      toast.error("Please fill all the details.");
      return;
    }
    // Check length of name field
    if (signupData.fullName.length < 5) {
      toast.error("Full name should be of atleast of length five.");
      return;
    }

    //email validation
    if (!signupData.email.match(mailformat)) {
      toast.error("Invalid Email");
      return;
    }

    // Password validation
    if (!signupData.password.match(passwordFormat)) {
      toast.error(
        "Password should be 6-16 characters long with atleast a number and a special character"
      );
      return;
    }
    // Form data to send over the server.
    const formData = new FormData();
    
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);
   

    //Dispatch createAccount action
    const response = await dispatch(createAccount(formData))
    if(response?.payload?.success){
      navigate("/");
    }

    
    setSignUpData({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    });
    setPreviewImage("");
    


  }

  
  

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[90vh]">
        {/* FORM */}
        <form
          noValidate
          onSubmit={createNewUser}
          className="flex flex-col justify-center  gap-3 rounded-lg p-4 text-white w-96 
        shadow-[0_0_10px_black]"
        >
          {/* REGISTERATION HEADING */}
          <h1 className="text-center text-2xl font-bold text-yellow-100 m-auto">
            Registeration Page
          </h1>

          {/* LABEL */}
          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewImage ? (
              <img
                className="w-24 h-24 m-auto rounded-full"
                src={previewImage}
              />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
            )}
          </label>

          {/* INPUT-IMAGE-INPUT FROM USER*/}
          <input
            onChange={handleProfileImage}
            className="hidden"
            type="file"
            name="image_uploads"
            id="image_uploads"
            accept=".jpg , .jpeg , .png , .svg"
          />

          {/* DIV FOR INPUT LABLES- Full-Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="font-semibold">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              required
              placeholder="Enter your Full Name"
              value={signupData.fullName}
              onChange={handleUserInput}
              className="bg-transparent px-2 py-1 border"
            />
          </div>

          {/* DIV FOR INPUT LABLES- EMAIL */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Enter your Email"
              value={signupData.email}
              onChange={handleUserInput}
              className="bg-transparent px-2 py-1 border"
            />
          </div>

          {/* DIV FOR INPUT LABLES- PASS */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              placeholder="Enter your Password..."
              value={signupData.password}
              onChange={handleUserInput}
              className="bg-transparent px-2 py-1 border"
            />
          </div>

          {/* Button to create Account */}
          <button
            type="submit"
            className="border rounded-full px-2 py-2 bg-yellow-600 mt-2
            hover:bg-yellow-500 transition-all ease-in-out duration-300 font-bold text-xl cursor-pointer
            
            "
          >
            Create Account
          </button>

          {/* Para for already existing user */}

          <p className="m-auto">
            Already have an account?
            <Link
              className="px-2 text-yellow-300 link no-underline"
              to={"/login"}
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}
export default Signup;
