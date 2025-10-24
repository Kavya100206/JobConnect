import { Route, Routes } from "react-router-dom"
import Signup from "./pages/Signup.jsx"
import LandingPage from "./pages/Landing.jsx"
import Login from "./pages/Login.jsx"
import ApplicantDashboard from "./pages/ApplicantDashboard.jsx"
import ApplicantProfile from "./pages/ApplicantProfile.jsx"
import RecruiterDashboard from "./pages/RecruiterDashboard.jsx"
import RecruiterProfile from "./pages/RecruiterProfile.jsx"



function App() {
  
  return (
    <Routes>
      <Route path='/' element = {<LandingPage/>}/>
      <Route path='/signup' element = {<Signup/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/ApplicantDashboard' element = {<ApplicantDashboard/>}/>
      <Route path='/ApplicantProfile' element = {<ApplicantProfile/>}/>
      <Route path='/RecruiterDashboard' element = {<RecruiterDashboard/>}/>
      <Route path='/RecruiterProfile' element = {<RecruiterProfile/>}/>

    </Routes>
  )
}

export default App
