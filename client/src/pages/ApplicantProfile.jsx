"use client"

import React, { useState } from "react"
import DashboardFooter from "../components/footer.jsx"
import DashboardHeader from "../components/header.jsx"
import { useSelector, useDispatch } from "react-redux"
import { Mail, FileText, Edit2, Save, X, Plus, Camera } from "lucide-react"
import { setProfileData, setUserData } from "../redux/userSlice"
import { updateApplicantProfile } from "../apiCalls/applicantCalls.js"
import { useNavigate } from "react-router-dom"





export default function ApplicantProfile() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.userData)
  const profileData = useSelector(state => state.user.profileData)

  // === State for editing ===
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(profileData || { skills: [], resume: "" , email:""})
  const [newSkill, setNewSkill] = useState("")
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (field, value) => {
    setEditedProfile({ ...editedProfile, [field]: value })
  }

  // Add skill
  const addSkill = () => {
    if (newSkill.trim() && !editedProfile.skills.includes(newSkill.trim())) {
      setEditedProfile({
        ...editedProfile,
        skills: [...editedProfile.skills, newSkill.trim()],
      })
      setNewSkill("")
    }
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
        formData.append('email', editedProfile.email || user?.email);
        formData.append('skills', JSON.stringify(editedProfile.skills));
        formData.append('resume', editedProfile.resume);
        formData.append('profilePicture', selectedFile);
        dataToSend = formData;
      } else {
        dataToSend = editedProfile;
      }

      const response = await updateApplicantProfile(dataToSend);

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
          skills: response?.user?.skills,
          resume: response?.user?.resume,
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
          <div className="bg-gradient-to-r from-blue-100 via-indigo-50 to-blue-100 border-b border-gray-300/50">
            <div className="max-w-4xl mx-auto px-6 py-12">
              <div className="flex items-end justify-between gap-6">
                <div className="flex items-end gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-700 to-indigo-600 p-1 shadow-lg">
                      {imagePreview || user?.profilePicture ? (
                        <img
                          src={imagePreview || user.profilePicture}
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-4xl font-bold text-blue-700">
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
                          className="absolute bottom-0 right-0 bg-blue-700 text-white p-2 rounded-full cursor-pointer hover:bg-blue-800 transition shadow-lg"
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
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.email || ""}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                    />
                  ) : (
                    <p className="font-medium">{user?.email || "N/A"}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Skills */}
            <section className="bg-white border border-gray-300 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-700 to-indigo-600 rounded-full"></div>
                Skills & Expertise
              </h3>
              <div className="flex flex-wrap gap-3 mb-6">
                {editedProfile.skills?.map((skill) => (
                  <div
                    key={skill}
                    className="group relative px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() =>
                          setEditedProfile({
                            ...editedProfile,
                            skills: editedProfile.skills.filter((s) => s !== skill),
                          })
                        }
                        className="ml-2 opacity-0 group-hover:opacity-100 text-red-600 hover:text-red-800 transition-opacity absolute top-1/2 right-2 -translate-y-1/2"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {isEditing && (
                <div className="flex gap-2 pt-4">
                  <input
                    type="text"
                    value={newSkill || ""}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addSkill()}
                    placeholder="Add a new skill..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition"
                  />
                  <button
                    onClick={addSkill}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition duration-200 font-medium"
                  >
                    <Plus className="h-4 w-4" /> Add
                  </button>
                </div>
              )}
            </section>

            {/* Resume */}
            <section className="bg-white border border-gray-300 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-700 to-indigo-600 rounded-full"></div>
                Resume
              </h3>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-3 w-full">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-700" />
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.resume || ""}
                      onChange={(e) => handleInputChange("resume", e.target.value)}
                      placeholder="Paste your resume link here..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                    />
                  ) : (
                    <span className="text-gray-900 font-medium truncate max-w-xs">
                      {editedProfile.resume || "No resume uploaded"}
                    </span>
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
