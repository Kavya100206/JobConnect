"use client"

import React, { useState } from "react"
import DashboardFooter from "../components/footer.jsx"
import DashboardHeader from "../components/header.jsx"
import { useSelector, useDispatch } from "react-redux"
import { Mail, FileText, Edit2, Save, X, Plus } from "lucide-react"
import { setProfileData, setUserData } from "../redux/userSlice"
import { useNavigate } from "react-router-dom"
import { updateRecruiterProfile } from "../apiCalls/recruiterCalls.js"






export default function RecruiterProfile() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.userData)
  const profileData = useSelector(state => state.user.profileData)

  // === State for editing ===
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(profileData || { company:" ", location:" "})
  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (field, value) => {
    setEditedProfile({ ...editedProfile, [field]: value })
  }


  // Cancel editing
  const handleCancel = () => {
    setEditedProfile(profileData) // revert changes
    setIsEditing(false)
  }

  // Save changes
  const handleSave = async () => {
    try {
      // Send updated data to backend
      const response = await updateRecruiterProfile(editedProfile)

        console.log(response.name)
      setIsEditing(false)
      dispatch(
                setUserData({
                  name: response?.user?.name,
                  email:response?.user?.email,
                  role:response?.user?.role
                })
              );
    dispatch(
              setProfileData({
                company: response?.user?.company,
                location: response?.user?.location,
              })
            );
      alert("Profile updated successfully!")
    } catch (err) {
      console.log(err)
      alert("Failed to update profile")
    }
  }
  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onLogout={handleLogout}/>

        <main className="flex-1 overflow-y-auto">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-100 via-indigo-50 to-blue-100 border-b border-gray-300/50">
            <div className="max-w-4xl mx-auto px-6 py-12">
              <div className="flex items-end justify-between gap-6">
                <div className="flex items-end gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-700 to-indigo-600 p-1 shadow-lg">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-4xl font-bold text-blue-700">
                        {user?.name?.[0]}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 pb-2">
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">
                      {user?.name || "Guest"}
                    </h1>
                  </div>
                </div>

                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-5 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200 font-medium"
                  >
                    <Edit2 className="h-5 w-5" /> Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="max-w-4xl mx-auto px-6 py-8 space-y-10">
            {/* Basic Info */}
            <section className="bg-white border border-gray-300 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-700 to-indigo-600 rounded-full"></div>
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-sm">
                <div>
                  <label className="block font-medium mb-1">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.name || ""}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                    />
                  ) : (
                    <p className="font-medium">{user?.name || "N/A"}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 font-medium mb-1">
                    <Mail className="h-4 w-4 text-blue-700" /> Email
                  </label>
                  <p className="font-medium">{user?.email || "N/A"}</p>
                </div>
              </div>
            </section>

            <section className="bg-white border border-gray-300 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-700 to-indigo-600 rounded-full"></div>
                Company and Location
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-sm">
                <div>
                  <label className="block font-medium mb-1">Company</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.company || ""}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                    />
                  ) : (
                    <p className="font-medium">{profileData?.company || "N/A"}</p>
                  )}
                </div>

                <div>
                    <label className="block font-medium mb-1">Location</label>
                    {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.location || ""}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                    />
                  ) : (
                    <p className="font-medium">{profileData?.location || "N/A"}</p>
                  )}
                                  </div>
              </div>
            </section>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-4 pt-6">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition duration-200 font-medium"
                >
                  <Save className="h-5 w-5" /> Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 hover:shadow transition duration-200 font-medium"
                >
                  <X className="h-5 w-5" /> Cancel
                </button>
              </div>
            )}

          </div>
        </main>

        <DashboardFooter />
      </div>
    </div>
  )
}
