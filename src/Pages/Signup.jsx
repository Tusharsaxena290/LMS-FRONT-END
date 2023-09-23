import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";

function Signup() {
  const [previewImage, setPreviewImage] = useState("");

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[90vh]">
        {/* FORM */}
        <form
          className="flex flex-col justify-center  gap-3 rounded-lg p-4 text-white w-96 
        shadow-[0_0_10px_black]"
        >
          {/* REGISTERATION HEADING */}
          <h1 className="text-center text-2xl font-bold">Registeration Page</h1>

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
            className="hidden"
            type="file" 
            name="image_uploads"
            id="image_uploads"
            accept=".jpg , .jpeg , .png , .svg"
            />
        </form>
      </div>
    </HomeLayout>
  );
}
export default Signup;
