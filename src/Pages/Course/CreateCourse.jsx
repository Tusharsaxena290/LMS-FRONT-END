import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../Layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";

function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //local states
  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: null,
    previewImage: "",
  });

  function handleImageUpload(e) {
    e.preventDeafault();
    const uploadImage = e.target.files[0];
    if (uploadImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", function () {
        setUserInput({
          ...userInput,
          previewImage: fileReader.result,
          thumbnail: uploadImage,
        });
      });
    }
  }

  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDeafault();

    if (
      !userInput.title ||
      !userInput.description ||
      !userInput.category ||
      !userInput.thumbnail ||
      !userInput.createdBy
    ) {
      toast.error("All fields are mandatory");
      return;
    }
    const response = await dispatch(createNewCourse(userInput));
    if (response?.payload?.success) {
      setUserInput({
        title: "",
        category: "",
        createdBy: "",
        description: "",
        thumbnail: null,
        previewImage: "",
      });
      // to change later
      navigate("/courses");
    }
  }

  return (
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center gap-5 rounded-lg p-4 w-[700px] my-10 text-white shadow-[0_0_10px_black] relative"
        >
          <Link className="absolue top-8 text-2xl link text-accent cursor-pointer">
            <AiOutlineArrowLeft />
          </Link>
          <h1 className="text-center text-2xl font-bold">Create New Course</h1>
          <main className="grid grid-cols-2 gap-x-10">
            <div className="gap-y-6">
              <div>
                <label htmlFor="image_uploads" className="cursor-pointer">
                  {userInput.previewImage ? (
                    <img
                      src={userInput.previewImage}
                      alt="preview Img"
                      className="w-full h-44 m-auto border"
                    />
                  ) : (
                    <div className="w-full h-44 m-auto flex items-center justify-center border">
                      <h1 className="font-bold text-lg">
                        Upload your course image
                      </h1>
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  className="hidden"
                  id="image_uploads"
                  accept=".jpg, .jpeg, .png"
                  name="image_uploads"
                  onChange={handleImageUpload}
                />
                <div className="flex flex-col gap-1 ">
                  <label htmlFor="title" className="text-lg font-semibold">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter Course title"
                    className="bg-transparent px-2 py-1 border"
                    value={userInput.title}
                    onChange={handleUserInput}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 ">
              <label htmlFor="createdBy" className="text-lg font-semibold">
                Course Instructor
              </label>
              <input
                type="text"
                name="createdBy"
                id="createdBy"
                placeholder="Enter the creator's name"
                className="bg-transparent px-2 py-1 border"
                value={userInput.createdBy}
                onChange={handleUserInput}
              />
            </div>
            <div className="flex flex-col gap-1 ">
              <label htmlFor="category" className="text-lg font-semibold">
                Course Category
              </label>
              <input
                type="text"
                name="category"
                id="category"
                placeholder="Enter the course category"
                className="bg-transparent px-2 py-1 border"
                value={userInput.category}
                onChange={handleUserInput}
              />
            </div>
            <div className="flex flex-col gap-1 ">
              <label htmlFor="description" className="text-lg font-semibold">
                Course description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Enter the course description"
                className="bg-transparent px-2 py-1 h-24 overflow-y-scroll resize-none border"
                value={userInput.description}
                onChange={handleUserInput}
              />
            </div>
          </main>
          <button type="submit"
          className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
          >
            Create Course
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}
export default CreateCourse;
