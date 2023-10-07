import './App.css'
import { Routes,Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import NotFound from './Pages/NotFound'
import Signup  from './Pages/Signup'
import Login from './Pages/Login'
import CourseList from './Pages/Course/CourseList'
import ContactUs from './Pages/ContactUs'
import Denied from './Pages/Denied'
import CourseDescription from './Pages/Course/CourseDescription'
import RequireAuth from './Components/Auth/RequireAuth'
import CreateCourse from './Pages/Course/CreateCourse'
//import Login from "./pages/Login"

function App() {


  return (
    <div>

    
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path='/about' element={<AboutUs/>}/>
    <Route path='/courses' element={<CourseList/>}/>

    {/* SignUp */}

    <Route path='/signup' element={<Signup/>}></Route>

  {/* Login */}
  <Route path='/login' element={<Login/>}></Route>

  {/* ContactUs */}
  <Route path='/contact' element={<ContactUs/>}></Route>

  {/* CourseDescription */}
  <Route path='/course/description' element={<CourseDescription/>}></Route>

  {/* For Admin */}

  <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
    <Route path='/course/create' element={<CreateCourse/>}></Route>

  </Route>



  {/* Denied */}
  <Route path='/denied' element={<Denied/>}></Route>
  

    {/* unknown path */}
    <Route path='*' element={<NotFound></NotFound>}/>
    </Routes>
     
     </div>
    
  )
}

export default App
