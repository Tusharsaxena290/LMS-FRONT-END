import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";

function Profile(){
    // no need for dispath as we have data in localstorage  
    // const dispatch=useDispatch();
    const userData=useSelector((state)=>{
        state?.auth?.data
    });

    return(
        
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center">
                <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[o_o_10px_black]">
                    <img src={userData?.avatar?.secure_url} 
                    alt="profile"
                    className="w-40 m-auto rounded-full border border-black"
                    />

                    <h3 className="text-xl font-semibold text-center capitalize">
                        {userData?.fullName}

                    </h3>

                    <div className="grid grid-col-2">
                        <p>Email:</p> <p>{userData?.email}</p>
                        
                        <p>Role:</p> <p>{userData?.role}</p>
                        
                        <p>Subscription:</p> <p>{userData?.subscription?.staus==="active"? "Active":"Inactive"}</p>


                        

                    </div>


                    <div className="flex items-center gap-2 justify-between">

                        <Link to="/changepassword"
                        className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all  ease-in-out duration-300
                        rounded-sm font-semibold cursor-pointer text-white
                        "
                        >
                            <button>Change Password</button>

                        </Link>

                        <Link to="/user/editprofile"
                        className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all  ease-in-out duration-300
                        rounded-sm font-semibold cursor-pointer text-white
                        "
                        >
                            <button>Edit Profile</button>

                        </Link>


                    </div>
                    {userData?.subscription?.status==="active" && (
                        <button className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300">Cancel Subscription</button>
                    )}

                </div>

            </div>
        </HomeLayout>
    )

}
export default Profile;