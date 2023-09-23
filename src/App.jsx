import './App.css'
import { Routes,Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import NotFound from './Pages/NotFound'
import Signup from './Pages/SignUp'

function App() {


  return (
    <div>

    
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path='/about' element={<AboutUs/>}/>

    {/* SignUp */}

    <Route path='/signup' element={<Signup/>}></Route>

    {/* unknown path */}
    <Route path='*' element={<NotFound></NotFound>}/>
    </Routes>
     
     </div>
    
  )
}

export default App
