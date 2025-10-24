import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../apiCalls/authCalls.js'
import { Briefcase, Eye, EyeOff } from "lucide-react"

export default function Signup() {
  const navigate = useNavigate()
  const [userType, setUserType] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',      // either 'applicant' or 'recruiter'
    skills: '',
    resume: '',
    company: '',
    location: '',
    workMode: '',
    defaultJobType: '',
  })
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      setError('Please fill in all required fields')
      return false
    }
    if (userType === 'applicant' && (!formData.skills || !formData.resume)) {
      setError('Please fill in all applicant fields')
      return false
    }
    if (userType === 'recruiter' &&
      (!formData.company || !formData.location || !formData.workMode || !formData.defaultJobType)) {
      setError('Please fill in all recruiter fields')
      return false
    }
    return true
  }

    //handle signup
   const handleSignUp = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) return
    let user;
  if (userType === 'applicant') {
     user = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      skills: formData.skills,
      resume: formData.resume,
    };
  }
  else{
    user = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      company: formData.company,
      location: formData.location,
      workMode: formData.workMode,
      defaultJobType: formData.defaultJobType
    };
  }

  try {
    const response = await signup(user);
    console.log("User registered successfully:", response);
    alert("User registered successfully! Please Sign In");
    setFormData({
      name: '',
      email: '',
      password: '',
      role: '',
      skills: '',
      resume: '',
      company: '',
      location: '',
      workMode: '',
      defaultJobType: '',
    });
    setUserType(null);

    navigate('/login')
  } catch (error) {
      console.error("Error registering user:", error);
      alert( "Error registering user");
  }
};


  if (!userType) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">JobConnect</h1>
            <p className="mt-2 text-gray-600">Choose your account type to get started</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => {
                setUserType('applicant')
                setFormData(prev => ({ ...prev, role: 'applicant' }))
              }}
              className="w-full border border-gray-300 p-6 rounded hover:border-blue-600 hover:bg-blue-50"
            >
              <h3 className="font-semibold text-gray-900">I'm a Job Seeker</h3>
              <p className="mt-1 text-sm text-gray-600">Find your next opportunity</p>
            </button>

            <button
              onClick={() => {
                setUserType('recruiter')
                setFormData(prev => ({ ...prev, role: 'recruiter' }))
              }}
              className="w-full border border-gray-300 p-6 rounded hover:border-indigo-600 hover:bg-indigo-50"
            >
              <h3 className="font-semibold text-gray-900">Job Recruiter</h3>
              <p className="mt-1 text-sm text-gray-600">Build your dream team</p>
            </button>
          </div>

          <p className="mt-8 text-sm text-gray-600">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="font-semibold text-blue-600 hover:underline">
              Sign in
            </button>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <button
          onClick={() => setUserType(null)}
          className="mb-6 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          ← Back
        </button>

        <div className="mb-8 text-center">
          
          <div className="flex items-center justify-center gap-2">
                      <Briefcase className="h-8 w-8 text-blue-600" />
                      <h1 className="text-2xl font-bold text-gray-900">JobConnect</h1>
                    </div>
          <p className="mt-2 text-gray-600">
            {userType === 'applicant'
              ? 'Create your job seeker account'
              : 'Create your recruiter account'}
          </p>
        </div>

        
          {/* Common Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Enter Your Name</label>
            <input
              type="text"
              id="name"
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
                <label className="block text-sm font-medium text-gray-900">Role</label>
                <input
                  type="text"
                  id="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

          {/* Applicant Fields */}
          {userType === 'applicant' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-900">Skills</label>
                <input
                  type="text"
                  id="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900">Resume URL</label>
                <input
                  type="text"
                  id="resume"
                  value={formData.resume}
                  onChange={handleInputChange}
                  className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </>
          )}

          {/* Recruiter Fields */}
          {userType === 'recruiter' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-900">Company</label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900">Location</label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900">Work Mode</label>
                <input
                  type="text"
                  id="workMode"
                  value={formData.workMode}
                  onChange={handleInputChange}
                  className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900">Default Job Type</label>
                <input
                  type="text"
                  id="defaultJobType"
                  value={formData.defaultJobType}
                  onChange={handleInputChange}
                  className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
            </>
          )}

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Error Message */}
          {error && <div className="rounded bg-red-100 p-3 text-sm text-red-700">{error}</div>}

          {/* Submit */}
          <button
            className=" my-4 w-full bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="font-semibold text-blue-600 hover:underline">
            Sign in
          </button>
        </p>
      </div>
    </div>
  )
}
