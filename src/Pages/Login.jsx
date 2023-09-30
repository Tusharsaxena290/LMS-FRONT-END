import React, { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import {login} from "../Redux/Slices/AuthSlice"



function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local States
  
  const [loginData, setLoginData] = useState({
    
    email: "",
    password: "",
    
  });

  // Handle User Input(not image)
  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  

  // Function to handle Login

  async function handleLogin(event) {
    // let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // let passwordFormat =
    //   /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    event.preventDefault();
    if (
      !loginData.email ||
      !loginData.password 
      
    ) {
      toast.error("Please fill all the details.");
      return;
    }
   

    
    // Form data to send over the server.

    

    //Dispatch createAccount action
    const response = await dispatch(login(loginData))
    if(response?.payload?.success){
      navigate("/");
    }

    
    setLoginData({
      
      email: "",
      password: "",
      
    });
   
    


  }

  
  

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[90vh]">
        {/* FORM */}
        <form
          noValidate
          onSubmit={handleLogin}
          className="flex flex-col justify-center  gap-3 rounded-lg p-4 text-white w-96 
        shadow-[0_0_10px_black]"
        >
          {/* REGISTERATION HEADING */}
          <h1 className="text-center text-2xl font-bold text-yellow-100 m-auto">
            Login Page
          </h1>


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
              value={loginData.email}
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
              value={loginData.password}
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
            Login 
          </button>

          {/* Para for not already existing user */}
         <p className="text-center">
            Do not have an account? <Link to="/signup" className="px-2 text-yellow-300 link no-underline" >Signup</Link>

         </p>

        </form>
      </div>
    </HomeLayout>
  );
}
export default Login;
