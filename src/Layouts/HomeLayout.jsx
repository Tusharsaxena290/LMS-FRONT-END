import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //check if user is logged-in

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  //role
  const role = useSelector((state) => state?.auth?.role);

  function changeWidth() {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  }

  function hideDrawer() {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;
    //changeWidth();
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = 0;
  }

  //handleLogout

  function handleLogOut(e){
    e.preventDefault();

    //const res=await dispatch()

    navigate("/");

  }

  return (
    <div className="min-h-[90vh]">
      <div className="drawer absolute left-0 z-50 w-fit">
        <input className="drawer-toggle" id="my-drawer" type="checkbox" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer"
            className="
                cursor-pointer relative
                "
          >
            <FiMenu
              onClick={changeWidth}
              size={"32px"}
              className="font-bold text-white m-4"
            ></FiMenu>
          </label>
        </div>
        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul
            className="menu p-4 w-48 sm:w-80
                bg-base-100 text-base-content relative
                h-[100%]
                "
          >
            <li
              className="w-fit absolute
                    right-2 z-50
                    "
            >
              <button onClick={hideDrawer}>
                <AiFillCloseCircle size={24} />
              </button>
            </li>

            <li>
              <Link to="/">HOME</Link>
            </li>

            {isLoggedIn && role === "ADMIN" && (
              <li>
                <Link to="/admin/dashboard">ADMIN DASHBOARD</Link>
              </li>
            )}

            <li>
              <Link to="/courses">ALL COURSES</Link>
            </li>

            <li>
              <Link to="/contact">CONTACT US</Link>
            </li>

            <li>
              <Link to="/about">ABOUT US</Link>
            </li>
            {/* IF NOT LOGGED-IN */}
            {!isLoggedIn && (
              <li className="absolute bottom-4 w-[90%]">
                <div className="flex w-full items-center justify-center">
                  <button className=" relative btn-primary px-4 py-1 w-full font-semibold rounded-md">
                    <Link to="/login">Login</Link>
                  </button>

                  <button className="relative btn-secondary px-4 py-1 w-full font-semibold rounded-md">
                    <Link to="/signup">Signup</Link>
                  </button>
                </div>
              </li>
            )}


            {/* IF LOGGED-IN */}
            {isLoggedIn && (
              <li className="absolute bottom-4 w-[90%]">
                <div className="flex w-full items-center justify-center">
                  <button className=" relative btn-primary px-4 py-1 w-full font-semibold rounded-md">
                    <Link to="/profile">Profile</Link>
                  </button>

                  <button className="relative btn-secondary px-4 py-1 w-full font-semibold rounded-md">
                    <Link onClick={handleLogOut}>Logout</Link>
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
      {children}
      <Footer></Footer>
    </div>
  );
}

export default HomeLayout;
