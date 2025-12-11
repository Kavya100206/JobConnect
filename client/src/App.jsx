import { Route, Routes } from "react-router-dom"
import Signup from "./pages/Signup.jsx"
import LandingPage from "./pages/Landing.jsx"
import Login from "./pages/Login.jsx"
import ApplicantProfile from "./pages/ApplicantProfile.jsx"
import RecruiterDashboard from "./pages/RecruiterDashboard.jsx"
import RecruiterProfile from "./pages/RecruiterProfile.jsx"
import RecruiterApplications from "./pages/ViewApplicants.jsx"
import RecruiterAnalytics from "./pages/RecruiterInsight.jsx"
import JobDiscovery from "./pages/ApplicantDashboard.jsx"
import ApplicantStats from "./pages/ApplicantStats.jsx"
import ApplicationDetailsPage from "./pages/ApplicantDetails.jsx"





function App() {
  
  return (
    <Routes>
      <Route path='/' element = {<LandingPage/>}/>
      <Route path='/signup' element = {<Signup/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/ApplicantDashboard' element = {<JobDiscovery/>}/>
      <Route path='/ApplicantProfile' element = {<ApplicantProfile/>}/>
      <Route path='/RecruiterDashboard' element = {<RecruiterDashboard/>}/>
      <Route path='/RecruiterProfile' element = {<RecruiterProfile/>}/>
      <Route path='/RecruiterApplications' element = {<RecruiterApplications/>}/>
      <Route path='/RecruiterStats' element = {<RecruiterAnalytics/>}/>
      <Route path='/ApplicantStats' element = {<ApplicantStats/>}/>
      <Route path="/ApplicantDetails" element={<ApplicationDetailsPage />} />
    </Routes>
  )
}

export default App
