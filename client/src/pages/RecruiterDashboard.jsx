"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit2, Trash2, Users, Eye } from "lucide-react";
import DashboardFooter from "../components/footer.jsx";
import DashboardHeader from "../components/header.jsx";
import {
  deleteJob,
  getStats,
  postJob,
  recruiterJobs,
  updateJob,
} from "../apiCalls/recruiterCalls.js";
import { useSelector } from "react-redux";
import JobForm from "../components/JobForm.jsx";

export default function RecruiterDashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [showJobForm, setShowJobForm] = useState(false);
  const { profileData } = useSelector((state) => state.user);
  const { userData } = useSelector((state) => state.user);
  const [editingJob, setEditingJob] = useState(null); // stores the job being edited
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    skillsRequired: [],
    minExperience: 0,
    salary: "",
    location: "",
    jobType: "full-time",
    workMode: "onsite",
  });
  const [stats, setStats] = useState({
    totalApplicants: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);


  const handleInputChange = (field, value) => {
    setNewJob({
      ...newJob,
      [field]: value,
    });
  };

  const handlePostJob = async () => {
    const {
      title,
      description,
      skillsRequired,
      minExperience,
      salary,
      location,
      jobType,
      workMode,
    } = newJob;

    // 1️⃣ Validation
    if (
      !title ||
      !description ||
      !skillsRequired ||
      !minExperience ||
      !salary ||
      !location ||
      !jobType ||
      !workMode
    ) {
      alert("Please fill all the required fields.");
      setShowJobForm(false);
      return;
    }

    // 2️⃣ Prevent duplicate (ignore the job being edited)
    const duplicate = jobs.find(
      (job) =>
        job._id !== editingJob?._id &&
        job.title.toLowerCase() === title.toLowerCase() &&
        job.location.toLowerCase() === location.toLowerCase()
    );

    if (duplicate) {
      setShowJobForm(false);
      alert("This job has already been posted.");
      return;
    }

    try {
      // 3️⃣ Prepare job data
      const jobData = {
        ...newJob,
        skillsRequired: skillsRequired.split(",").map((skill) => skill.trim()),
        salary: Number(salary),
      };

      let response;

      if (editingJob) {
        // 4️⃣ Edit existing job
        response = await updateJob(editingJob._id, jobData); // your frontend API call
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === editingJob._id ? response.job : job
          )
        );
        alert("Job updated successfully");
      } else {
        // 5️⃣ Create new job
        response = await postJob(jobData);
        setJobs((prevJobs) => [response.job, ...prevJobs]);
        alert("Job posted successfully");
      }

      // 6️⃣ Reset form
      setNewJob({
        title: "",
        description: "",
        skillsRequired: "",
        minExperience: 0,
        salary: "",
        location: "",
        jobType: "Full-time",
        workMode: "Onsite",
      });
      setEditingJob(null); // clear edit mode
      setShowJobForm(false); // close modal
    } catch (error) {
      console.log(error);
      alert("Failed to save job. Try again.");
    }
  };

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const response = await recruiterJobs();
        setJobs(response);
      } catch (error) {
        console.error("Error fetching recommended jobs:", error);
      }
    };
    fetchMyJobs();
  }, [profileData]);

  useEffect(() => {
    const getMyStats = async () => {
      try {
        const response = await getStats();
        setStats(response);
      } catch (error) {
        console.log(error);
      }
    };
    getMyStats();
  }, [profileData]);

  const handleEditJob = (job) => {
    setEditingJob(job); // mark the job as editing
    setNewJob({
      title: job.title,
      description: job.description,
      skillsRequired: job.skillsRequired.join(", "), // convert array to string for input
      minExperience: job.minExperience,
      salary: job.salary,
      location: job.location,
      jobType: job.jobType,
      workMode: job.workMode,
    });
    setShowJobForm(true); // open the form
  };

  const handleDeleteJob = async (id) => {
    try {
      const response = await deleteJob(id);
      console.log(response);
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error("Error fetching recommended jobs:", error);
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleViewApplicants = () => {
     navigate(`/RecruiterApplications`);
  };

  const jobsPerPage = 6;
const indexOfLastJob = currentPage * jobsPerPage;
const indexOfFirstJob = indexOfLastJob - jobsPerPage;
const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
const totalPages = Math.ceil(jobs.length / jobsPerPage);
  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onLogout={handleLogout} />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Welcome Section */}
            <div className="flex items-center justify-between mb-8 animate-fade-in">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  Welcome back, {userData?.name} 👋
                </h2>
                <p className="text-muted-foreground">
                  Here's an overview of your job postings.
                </p>
              </div>
              
              <div className="flex gap-4">
              <button
                onClick={() => setShowJobForm(!showJobForm)}
                className="flex items-center gap-2 px-5 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200 font-medium"
              >
                <Plus className="h-4 w-4" />
                Add New Job
              </button>
              <button
                          onClick={() => handleViewApplicants()}
                          className="flex items-center gap-2 px-5 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200 font-small"
                        >
                          <Eye className="h-4 w-4" />
                          View Applicants
                        </button>
                        </div>
            </div>

            {/* Quick Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-fade-in">
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                <p className="text-sm text-muted-foreground mb-2">
                  Number of Jobs Posted
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {jobs.length}
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                <p className="text-sm text-muted-foreground mb-2">
                  Total Applicants
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {stats?.totalApplicants || 0}
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                <p className="text-sm text-muted-foreground mb-2">
                  Pending Applications
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {stats?.pending || 0}
                </p>
              </div>
            </div>

            {/* Create Job Form */}
            {showJobForm && (
              <JobForm
                newJob={newJob}
                editingJob={editingJob}
                handleInputChange={handleInputChange}
                handlePostJob={handlePostJob}
                setShowJobForm={setShowJobForm}
                setEditingJob={setEditingJob}
              />
            )}

            {/* Your Job Postings Section */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Your Job Postings
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {currentJobs.map((job) => (

                  <div
                    key={job.id}
                    className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow animate-fade-in"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">
                          {job.title}
                        </h3>
                        <div className="text-sm text-gray-500 gap-2 flex flex-wrap">
                          <span className="text-base text-gray-600 mb-4 font-medium ">
                            📍 {job.location}
                          </span>
                          <span className="text-base text-gray-600 mb-4 font-medium">
                            💼 {job.jobType}
                          </span>
                          <span className="text-base text-gray-600 mb-4 font-medium">
                            🏠 {job.workMode}
                          </span>
                          <span className="text-base text-gray-600 mb-4 font-medium">
                            🕒 {job.minExperience} yrs exp
                          </span>
                        </div>

                        <p className="text-base text-gray-700 mb-2 font-semibold">
                          💰 Salary: ₹{job.salary.toLocaleString()}
                        </p>

                        <p className="text-sm text-gray-500 font-semibold">
                          Posted on{" "}
                          {new Date(job.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditJob(job)}
                          className="flex items-center gap-2 px-5 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200 font-small"
                        >
                          <Edit2 className="h-4 w-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job._id)}
                          className="flex items-center gap-1 px-2 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:shadow-l hover:scale-105 transition-transform duration-200 font-small"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  
                ))}
                {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-lg transition-colors ${
                        currentPage === page
                          ? "bg-primary text-primary-foreground"
                          : "border border-border text-foreground hover:bg-muted"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
              </div>

              {jobs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    No jobs posted yet.
                  </p>
                  <button
                    onClick={() => setShowJobForm(true)}
                    className="px-6 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-medium"
                  >
                    Post Your First Job
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>

        <DashboardFooter />
      </div>
    </div>
  );
}
