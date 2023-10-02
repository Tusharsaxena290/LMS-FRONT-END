import { useNavigate } from "react-router-dom";

function Denied(){
    // navigator
    const navigate=useNavigate();
    function navigateBack(){
        navigate(-1);


    }
return(
    <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
        <h1 className="text-9xl font-extrabold text-white tracking-widest">
            403
        </h1>
        <div className="
        bg-black text-white px-2 text-sm rouned rotate-12 absolute
        ">Access Denied</div>
        <button
        className="mt-5 "
        onClick={navigateBack}
        ><span className="
        relative block px-8 py-3 bg-[#1A2238] border border-current
        ">Go Back</span></button>

    </main>
)
}
export default Denied;