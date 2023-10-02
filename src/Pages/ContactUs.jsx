import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import toast from "react-hot-toast";
import axiosInstance from "../Helpers/axiosInstance";

function ContactUs() {
    // local state
    const [userInput,setUserInput]=useState({
        name:"",
        email:"",
        message:""
    });

    // function to changeInput
    function handleInputChange(e){
        const{name,value}=e.target;
        setUserInput({
            ...userInput,
            [name]:value
        })

    }

    // function to submit form

    async function onFormSubmit(e){
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;   
        e.preventDefault();
        if(!userInput.name|| !userInput.email ||!userInput.message){
            toast.error("Please fill all the details!")
            return;
        }
        // email validation
        if (!userInput.email.match(mailformat)) {
            toast.error("Invalid Email");
            return;
          }

        try {
            const response=axiosInstance.post("/contact",userInput);
            toast.promise(response,{
                loading:"Submitting your form",
                success:"Form submitted successfully",
                error:"Failed to submit the form"
            })
            const contactResponse=await response;
            if(contactResponse?.data?.success){
                setUserInput({
                    name:"",
                    email:"",
                    message:"",
                })
            }
        } catch (error) {
            toast.error("Operation Failed!");
            
        }
      
        

    }

  return (
    <HomeLayout>
      <div
        className="flex items-center justify-center
            h-[100vh]
            "
      >
        <form
            noValidate
            onSubmit={onFormSubmit}
          className="flex flex-col items-center justify-center
            gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black]
            w-[22rem]
            "
        >
          <h1 className="text-3xl font-semibold">Contact Form</h1>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="name" className="text-xl font-semibold">
              Name
            </label>
            <input
              type="text"
              className="bg-transparent border px-2 py-1 rounded-sm"
              placeholder="Enter your name"
              id="name"
              name="name"
              onChange={handleInputChange}
              value={userInput.name}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="email" className="text-xl font-semibold">
              Email
            </label>
            <input
              type="text"
              className="bg-transparent border px-2 py-1 rounded-sm"
              placeholder="Enter your email"
              id="email"
              name="email"
              onChange={handleInputChange}
              value={userInput.email}
            />
          </div>

          <div className="flex flex-col w-full gap-1">
            <label htmlFor="email" className="text-xl font-semibold">
              Message
            </label>
            <textarea
              type="text"
              className="bg-transparent border px-2 py-1 rounded-sm
              h-40 resize-none"
              placeholder="Enter your email"
              id="message"
              name="message"
              onChange={handleInputChange}
              value={userInput.message}
            />
          </div>

          <button
          type="submit"
          className="w-full bg-yellow-600 hover:bg-yellow-500
          transition-all ease-in-out duration-300 rounded-lg
          py-2 font-semibold text-lg cursor-pointer
          "
          >
            Submit

          </button>

        </form>
      </div>
    </HomeLayout>
  );
}
export default ContactUs;
