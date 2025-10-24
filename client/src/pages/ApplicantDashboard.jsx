"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Briefcase } from "lucide-react";
import DashboardFooter from "../components/footer";
import DashboardHeader from "../components/header";
import { useEffect } from "react";
import {
  applyJob,
  getAllJobs,
  getMyApplications,
} from "../apiCalls/applicantCalls.js";
import { useDispatch, useSelector } from "react-redux";
import { addApplication } from "../redux/applicationSlice";

export default function ApplicantDashboard() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  const { profileData } = useSelector((state) => state.user); // applicant skills
  const [recommended, setRecommended] = useState([]);
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.application.applications);
  const [myJobs, setMyJobs] = useState([]);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const response = await getAllJobs();
        console.log(response);

        // get applicant’s skills from Redux
        const mySkills = profileData?.skills || [];
        console.log(mySkills);

        // ✅ filter jobs where at least one required skill matches applicant skills
        const matchedJobs = response.filter((job) =>
          job.skillsRequired?.some((skill) =>
            mySkills.some(
              (userSkill) => userSkill.toLowerCase() === skill.toLowerCase()
            )
          )
        );

        console.log(matchedJobs)

        setRecommended(matchedJobs);
        console.log(recommended);
      } catch (error) {
        console.error("Error fetching recommended jobs:", error);
      }
    };

    fetchRecommended();
  }, [profileData]);

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const response = await getMyApplications();
        console.log(response);

        setMyJobs(response);
        console.log(myJobs);
      } catch (error) {
        console.error("Error fetching recommended jobs:", error);
      }
    };

    fetchMyJobs();
  }, [profileData]);

  const handleApply = async (jobId) => {
    try {
      const response = await applyJob(jobId); // call backend
      dispatch(addApplication(jobId)); // store jobId in redux
      alert(response.message || "Applied successfully!");
    } catch (error) {
      alert(error.message || "Failed to apply");
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    
    <div className="flex h-screen bg-gray-50 overflow-x-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onLogout={handleLogout} />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Welcome Section */}
            <div className="mb-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Hi {user?.name}
              </h2>
              <p className="text-gray-600 text-xl">Find your next opportunity</p>
            </div>

            {/* Recommended Jobs */}
            <h1 className="flex items-center gap-3 my-9">
              <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-blue-700 to-indigo-600" />
              <span className="text-xl md:text-3xl font-semibold text-gray-900">
                Recommended Jobs
              </span>
            </h1>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

              {recommended.map((job) => (
                <div
                  key={job._id}
                  className="bg-white border border-gray-300 rounded-lg p-6 shadow hover:shadow-lg transition-all duration-200 flex flex-col"
                >
                  {/* Content (NO flex-grow here) */}
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-5 my-3">
                      {job.title}
                    </h4>
                    <p className="text-l font-semibold text-gray-600 mb-4">
                      {job.recruiter?.company}
                    </p>
                    <div className="flex flex-wrap gap-4 mb-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1 text-xl font-semibold text-gray-600 mb-2">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1 text-xl font-semibold text-gray-600 mb-2">
                        <Briefcase className="h-4 w-4" />
                        {job.jobType}
                      </div>
                      <div className="flex items-center gap-1 text-xl font-semibold text-gray-600 mb-2">
                        ₹{job.salary}
                      </div>
                    </div>
                    <p className="text-gray-800 text-xl mb-3 leading-relaxed line-clamp-3 my-6">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {job.skillsRequired.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-gray-100 text-xs rounded-full my-4"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Button uses mt-auto */}
                  <button
                    onClick={() => handleApply(job._id)}
                    disabled={applications.includes(job._id)}
                    className={`w-full px-6 py-3 rounded-lg font-semibold transition-all mt-auto ${
                      applications.includes(job._id)
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transform transition-transform"
                    }`}
                  >
                    {applications.includes(job._id) ? "Applied" : "Apply Now"}
                  </button>
                </div>
              ))}
            </div>
            

            <h1 className="flex items-center gap-3 my-9">
              <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-blue-700 to-indigo-600" />
              <span className="text-xl md:text-3xl font-semibold text-gray-900">
                My Jobs
              </span>
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {myJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white border border-gray-300 rounded-lg p-6 shadow hover:shadow-lg transition-all duration-200 flex flex-col w-full "
                >
                  {/* Content (NO flex-grow here) */}
                  <div>
                    <h4 className="text-2xl font-semibold text-gray-900 mb-5 my-3">
                      {job.job.title}
                    </h4>
                    <p className="text-l font-semibold text-gray-600 mb-4">
                      {job.recruiter?.company}
                    </p>
                    <div className="flex flex-wrap gap-4 mb-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1 text-xl font-semibold text-gray-600 mb-2">
                        <MapPin className="h-4 w-4" />
                        {job.job.location}
                      </div>
                      <div className="flex items-center gap-1 text-xl font-semibold text-gray-600 mb-2">
                        <Briefcase className="h-4 w-4" />
                        {job.job.jobType}
                      </div>
                      <div className="flex items-center gap-1 text-xl font-semibold text-gray-600 mb-2">
                        ₹{job.job.salary}
                      </div>
                    </div>
                    <p className="text-gray-800 text-xl mb-3 leading-relaxed line-clamp-3 my-6">
                      {job.job.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {job.job.skillsRequired.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-gray-100 text-xs rounded-full my-4"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Button uses mt-auto */}
                  <button
                    onClick={() => handleApply(job._id)}
                    disabled={applications.includes(job._id)}
                    className={`w-full px-6 py-3 rounded-lg font-semibold transition-all mt-auto ${
                      applications.includes(job._id)
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 transform transition-transform"
                    }`}
                  >
                    {applications.includes(job._id) ? "Applied" : "Apply Now"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>

        <DashboardFooter />
      </div>
    </div>
  );
}
