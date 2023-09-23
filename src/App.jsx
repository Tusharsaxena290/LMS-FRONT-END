import './App.css'
import { Routes,Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import AboutUs from './Pages/AboutUs'
import NotFound from './Pages/NotFound'

function App() {


  return (
    <div>

    
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path='/about' element={<AboutUs/>}/>


    {/* unknown path */}
    <Route path='*' element={<NotFound></NotFound>}/>
    </Routes>
     
     </div>
    
  )
}

export default App
