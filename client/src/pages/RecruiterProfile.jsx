"use client"

import React, { useState } from "react"
import DashboardFooter from "../components/footer.jsx"
import DashboardHeader from "../components/header.jsx"
import { useSelector, useDispatch } from "react-redux"
import { Mail, FileText, Edit2, Save, X, Plus, Camera } from "lucide-react"
import { setProfileData, setUserData } from "../redux/userSlice"
import { useNavigate } from "react-router-dom"
import { updateRecruiterProfile } from "../apiCalls/recruiterCalls.js"






export default function RecruiterProfile() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.userData)
  const profileData = useSelector(state => state.user.profileData)

  // === State for editing ===
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(profileData || { company: " ", location: " ", email: " " })
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (field, value) => {
    setEditedProfile({ ...editedProfile, [field]: value })
  }


  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditedProfile(profileData) // revert changes
    setIsEditing(false)
    setSelectedFile(null);
    setImagePreview(null);
  }

  // Save changes
  const handleSave = async () => {
    try {
      // Create FormData if file is selected, otherwise send regular object
      let dataToSend;
      if (selectedFile) {
        const formData = new FormData();
        formData.append('name', editedProfile.name || user?.name);
        formData.append('company', editedProfile.company);
        formData.append('location', editedProfile.location);
        formData.append('email', editedProfile.email || user?.email);
        formData.append('profilePicture', selectedFile);
        dataToSend = formData;
      } else {
        dataToSend = editedProfile;
      }

      const response = await updateRecruiterProfile(dataToSend);

      setIsEditing(false);
      setSelectedFile(null);
      setImagePreview(null);

      dispatch(
        setUserData({
          name: response?.user?.name,
          email: response?.user?.email,
          role: response?.user?.role,
          profilePicture: response?.user?.profilePicture
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
        <DashboardHeader onLogout={handleLogout} />

        <main className="flex-1 overflow-y-auto">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#E3EEB2] via-[#71C0BB]/20 to-[#E3EEB2] border-b border-gray-300/50">
            <div className="max-w-4xl mx-auto px-6 py-12">
              <div className="flex items-end justify-between gap-6">
                <div className="flex items-end gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#332D56] to-[#4E6687] p-1 shadow-lg">
                      {imagePreview || user?.profilePicture ? (
                        <img
                          src={imagePreview || user.profilePicture}
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-4xl font-bold text-[#332D56]">
                          {user?.name?.[0]}
                        </div>
                      )}
                    </div>
                    {isEditing && (
                      <div>
                        <input
                          type="file"
                          id="profile-pic"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="profile-pic"
                          className="absolute bottom-0 right-0 bg-[#332D56] text-white p-2 rounded-full cursor-pointer hover:bg-[#1a1825] transition shadow-lg"
                        >
                          <Camera className="h-4 w-4" />
                        </label>
                      </div>
                    )}
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
                    className="flex items-center gap-2 px-5 py-2 bg-[#71C0BB] text-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200 font-medium"
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
                <div className="w-1 h-6 bg-gradient-to-b from-[#332D56] to-[#4E6687] rounded-full"></div>
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#71C0BB] focus:border-transparent transition"
                    />
                  ) : (
                    <p className="font-medium">{user?.name || "N/A"}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 font-medium mb-1">
                    <Mail className="h-4 w-4 text-[#71C0BB]" /> Email
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.email || ""}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#71C0BB] focus:border-transparent transition"
                    />
                  ) : (
                    <p className="font-medium">{user?.email || "N/A"}</p>
                  )}
                </div>
              </div>
            </section>

            <section className="bg-white border border-gray-300 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-[#332D56] to-[#4E6687] rounded-full"></div>
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#71C0BB] focus:border-transparent transition"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#71C0BB] focus:border-transparent transition"
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
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4E6687] to-[#71C0BB] text-white rounded-lg hover:shadow-lg hover:scale-105 transition duration-200 font-medium"
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
