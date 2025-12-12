"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/search-bar";
import FilterPanel from "../components/filter-panel";
import JobCard from "../components/job-card";
import JobTabs from "../components/job-tabs";
import RecommendedJobs from "../components/recommended-jobs";
import DashboardHeader from "../components/header";
import DashboardFooter from "../components/footer";
import {
  applyJob,
  getAllJobs,
  getMyApplications,
  getSavedJobs,
  saveJob,
  unsaveJob,
  withdrawApplication,
} from "../apiCalls/applicantCalls.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addApplication,
  clearApplications,
  removeApplication,
} from "../redux/applicationSlice";
import {
  addSavedJob,
  clearSavedJobs,
  removeSavedJob,
  setSavedJobs,
} from "../redux/savedJobSLice.js";

export default function JobDiscovery() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    jobType: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const [jobs, myJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const { profileData } = useSelector((state) => state.user); // applicant skills
  const appliedJobs = useSelector((state) => state.application.applications);
  const savedJobs = useSelector((state) => state.savedJobs.jobs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const jobsPerPage = 6;

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const response = await getAllJobs();
        myJobs(response);
        setFilteredJobs(response);

        let mySkills = profileData?.skills || [];
        console.log("Raw Skills:", mySkills);

        // STEP 1 — If it's array with a single quoted string → parse it
        if (
          Array.isArray(mySkills) &&
          mySkills.length === 1 &&
          typeof mySkills[0] === "string"
        ) {
          try {
            mySkills = JSON.parse(mySkills[0]); // first parse
          } catch {
            console.log("First parse failed");
          }
        }

        // STEP 2 — If still a string after first parse → parse again
        if (typeof mySkills === "string") {
          try {
            mySkills = JSON.parse(mySkills); // second parse
          } catch {
            console.log("Second parse failed");
          }
        }

        // STEP 3 — Safety check: if still not array → reset to empty
        if (!Array.isArray(mySkills)) {
          mySkills = [];
        }

        console.log("Final Parsed Skills:", mySkills);

        // Recommended jobs logic
        const matchedJobs = response.filter((job) =>
          job.skillsRequired?.some((skill) =>
            mySkills.some(
              (userSkill) =>
                userSkill.toLowerCase().trim() === skill.toLowerCase().trim()
            )
          )
        );

        setRecommendedJobs(matchedJobs);
      } catch (error) {
        console.error("Error fetching recommended jobs:", error);
      }
    };

    fetchRecommended();
  }, [profileData]);

  useEffect(() => {
    let filtered = [...jobs];

    // 🔍 Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (job) =>
          job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.recruiter.company
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          job.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.skillsRequired?.some((skill) =>
            skill.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // 📍 Location filter
    if (filters.location) {
      filtered = filtered.filter(
        (job) => job.location?.toLowerCase() === filters.location.toLowerCase()
      );
    }

    // 💼 Job Type filter
    if (filters.jobType) {
      filtered = filtered.filter(
        (job) => job.jobType?.toLowerCase() === filters.jobType.toLowerCase()
      );
    }

    // 🧠 Experience (if you use it later)
    if (filters.experience) {
      filtered = filtered.filter(
        (job) =>
          job.experience?.toLowerCase() === filters.experience.toLowerCase()
      );
    }

    setFilteredJobs(filtered);
  }, [filters, jobs, searchQuery]);

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const savedJobsList = jobs.filter((job) => savedJobs.includes(job._id));

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await getMyApplications(); // fetch applied jobs for logged-in user
        dispatch(clearApplications());
        const cleaned = res
          .filter((a) => a.job !== null && a.status === "Pending") // 🔥 Only show pending applications
          .map((a) => ({
            applicationId: a.applicationId,
            status: a.status,
            appliedAt: a.appliedAt,
            ...a.job, // flatten actual job details
          }));




        cleaned.forEach((job) => dispatch(addApplication(job)));
      } catch (err) {
        console.error("Failed to fetch applied jobs:", err);
      }
    };

    fetchAppliedJobs();
  }, [dispatch]);

  const handleApply = async (job) => {
    try {
      const response = await applyJob(job._id); // backend call
      dispatch(addApplication(job)); // update Redux state

      alert(response.message || "Applied successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to apply");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await getSavedJobs(); // fetch applied jobs for logged-in user
        dispatch(clearSavedJobs());
        res.forEach((job) => dispatch(addSavedJob(job))); // populate Redux
      } catch (err) {
        console.error("Failed to fetch applied jobs:", err);
      }
    };

    fetchSavedJobs();
  }, [dispatch]);

  const handleSave = async (job) => {
    try {
      const response = await saveJob(job._id); // backend call
      dispatch(addSavedJob(job)); // update Redux state
      alert("Job saved successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save job");
      console.error(error);
    }
  };

  const handleUnsave = async (jobId) => {
    try {
      const response = await unsaveJob(jobId);
      dispatch(removeSavedJob(jobId)); // update Redux
      alert(response.message || "Job unsaved successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to unsave job");
    }
  };

  const handleWithdraw = async (applicantId) => {
    try {
      const response = await withdrawApplication(applicantId);
      dispatch(removeApplication(applicantId)); // update Redux
      alert(response.message || "Application withdrawn successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to withdraw application");
      console.error(error);
    }
  };

  const handleLogout = () => {
    dispatch(clearApplications());
    dispatch(clearSavedJobs());
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
          <div>
            <FilterPanel
              filters={filters}
              setFilters={setFilters}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>

        <RecommendedJobs
          jobs={recommendedJobs}
          onSave={handleSave}
          onApply={handleApply}
          appliedJobs={appliedJobs}
          savedJobs={savedJobs}
          onUnSave={handleUnsave}
          withdrawApplication={handleWithdraw}
        />

        <div className="mt-12">
          <JobTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            counts={{
              all: filteredJobs.length,
              saved: savedJobs.length,
              applied: appliedJobs.length,
            }}
          />

          {activeTab === "all" && (
            <motion.div
              key="all-jobs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentJobs.map((job, index) => (
                  <JobCard
                    key={job._id}
                    job={job}
                    isSaved={savedJobs.includes(job)}
                    isApplied={appliedJobs.some((j) => j._id === job._id)}
                    onSave={() => handleSave(job)} // FIX 1: Wrap handleSave
                    onUnSave={() => handleUnsave(job._id)} // FIX 2: Wrap handleUnsave (assuming handleUnsave takes only ID)
                    onApply={() => handleApply(job)}
                    withdrawApplication={handleWithdraw}
                    index={index}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 rounded-lg transition-colors ${currentPage === page
                            ? "bg-primary text-primary-foreground"
                            : "border border-border text-foreground hover:bg-muted"
                          }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "saved" && (
            <motion.div
              key="saved-jobs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {savedJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedJobs.map((job, index) => (
                    <JobCard
                      key={job._id}
                      job={job}
                      isSaved={savedJobs.some((j) => j._id === job._id)}
                      isApplied={appliedJobs.some((j) => j._id === job._id)}
                      onSave={() => handleSave(job)}
                      onApply={() => handleApply(job)}
                      onUnSave={() => handleUnsave(job._id)}
                      withdrawApplication={() => handleWithdraw(job._id)}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No saved jobs yet. Start saving jobs you like!
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "applied" && (
            <motion.div
              key="applied-jobs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {appliedJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {appliedJobs.map((job, index) => (
                    <JobCard
                      key={job._id}
                      job={job}
                      isSaved={savedJobs.some((j) => j._id === job._id)}
                      isApplied={appliedJobs.some((j) => j._id === job._id)}
                      onSave={() => handleSave(job)}
                      onApply={() => handleApply(job)}
                      onUnSave={() => handleUnsave(job._id)}
                      withdrawApplication={() => handleWithdraw(job._id)}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    You haven't applied to any jobs yet. Start applying!
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
      <DashboardFooter />
    </main>
  );
}
