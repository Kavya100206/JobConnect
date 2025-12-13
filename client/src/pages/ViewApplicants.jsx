"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CheckCircle, XCircle, Download, Mail, Briefcase, Calendar } from "lucide-react"
import DashboardHeader from "../components/header.jsx"
import DashboardFooter from "../components/footer.jsx"
import { getAllApplicants, viewApplicants } from "../apiCalls/recruiterCalls.js"
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { updateApplicationStatus } from "../apiCalls/recruiterCalls.js"
import { useSelector } from "react-redux";




export default function RecruiterApplications() {
  const navigate = useNavigate()
  const [applicants, setApplicants] = useState([])
  const [selectedJob, setSelectedJob] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([])
  const { profileData } = useSelector((state) => state.user)



  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const data = await getAllApplicants();
        setApplicants(data);

        // ✅ once applicants are fetched, set jobs list
        const uniqueJobs = Array.from(
          new Set(
            (data || [])
              .map((app) => app.job?.title || "Unknown Job")
              .filter(Boolean)
          )
        );
        setJobs(uniqueJobs);
      } catch (err) {
        console.error("Error fetching applicants:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchApplicants();
  }, [profileData]);

  const filteredApplicants = applicants.filter((app) => {
    const matchesJob = selectedJob === "all" || app.job?.title === selectedJob;
    const matchesStatus = selectedStatus === "all" || app.status === selectedStatus;
    return matchesJob && matchesStatus;
  });




  const handleAccept = async (id) => {
    try {
      const updated = await updateApplicationStatus(id, "Accepted");
      setApplicants((prev) =>
        prev.map((applicant) =>
          applicant._id === id
            ? { ...applicant, status: updated.status }   // merge instead of replace
            : applicant
        )
      );

    } catch (error) {
      console.error("Error updating application status:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      const updated = await updateApplicationStatus(id, "Rejected");
      setApplicants((prev) =>
        prev.map((applicant) =>
          applicant._id === id
            ? { ...applicant, status: updated.status }   // merge instead of replace
            : applicant
        )
      );
    } catch (error) {
      console.error("Error updating application status:", error);
    }

  };
  if (loading) return <p>Loading applications...</p>;

  const handleLogout = () => {
    navigate("/login")
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-700 border border-amber-200"
      case "Accepted":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200"
      case "Rejected":
        return "bg-red-50 text-red-700 border border-red-200"
      default:
        return ""
    }
  }

  const getStatusBadgeIcon = (status) => {
    switch (status) {
      case "Pending":
        return "◆"
      case "Accepted":
        return "✓"
      case "Rejected":
        return "✕"
      default:
        return ""
    }
  }

  return (
    <div className="flex h-screen bg-background">

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader userName="Jane Smith" userRole="recruiter" onLogout={handleLogout} />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header Section */}
            <div className="mb-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-foreground mb-2">Applications</h2>
              <p className="text-muted-foreground">Review and manage applicants for your job postings</p>
            </div>

            {/* Filters Section */}
            <div className="bg-card border border-border rounded-xl p-6 mb-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Filter by Job</label>
                  <select
                    value={selectedJob}
                    onChange={(e) => setSelectedJob(e.target.value)}
                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  >
                    <option value="all">All Jobs</option>
                    {jobs.map((job) => (
                      <option key={job} value={job}>
                        {job}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Filter by Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Applicants Grid */}
            <div className="space-y-4">
              {filteredApplicants.map((applicant, index) => (
                <div
                  key={applicant.id}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300 ease-out animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Top Section: Name, Email, Status */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5 pb-5 border-b border-border/50">
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">{applicant.applicant?.name}</h3>
                        <div
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            applicant.status
                          )}`}
                        >
                          <span>{getStatusBadgeIcon(applicant.status)}</span>
                          <span>{applicant.status}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Mail className="w-4 h-4" />
                          <span>{applicant.applicant?.email}</span>
                        </div>
                        <div className="hidden md:flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(applicant.appliedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Middle Section: Job & Experience */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 pb-5 border-b border-border/50">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Position</p>
                      <div className="flex items-center gap-2 text-foreground">
                        <Briefcase className="w-4 h-4 text-primary" />
                        <span className="font-medium">{applicant.job?.title}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Experience</p>
                      <span className="inline-block px-3 py-1.5 bg-primary/10 text-primary font-semibold rounded-lg text-sm">
                        {applicant.applicant?.experience} year{applicant.applicant?.experience !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div className="mb-5 pb-5 border-b border-border/50">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {applicant.applicant?.skills?.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5  text-[#332D56] border border-[#71C0BB] text-sm rounded-lg font-medium hover:bg-[#71C0BB]/20 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                    <a
                      href="#"
                      className="flex items-center justify-center gap-2 px-4 py-2.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg transition-all font-medium text-sm border border-border/50"
                    >
                      <Download className="h-4 w-4" />
                      Download Resume
                    </a>

                    {applicant.status === "Pending" && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleAccept(applicant._id)}
                          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-all font-medium text-sm shadow-sm hover:shadow-md"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(applicant._id)}
                          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all font-medium text-sm shadow-sm hover:shadow-md"
                        >
                          <XCircle className="h-4 w-4" />
                          Reject
                        </button>
                      </div>
                    )}

                    {applicant.status !== "Pending" && (
                      <div className="text-sm font-medium text-muted-foreground">
                        {applicant.status === "Accepted" && "✓ Applicant accepted"}
                        {applicant.status === "Rejected" && "✕ Applicant rejected"}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {filteredApplicants.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground mb-2">No applications found</p>
                  <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
                </div>
              )}
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              <div className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-2">Total Applications</p>
                <p className="text-3xl font-bold text-foreground">{applicants.length}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-2">Pending</p>
                <p className="text-3xl font-bold text-amber-600">{applicants.filter((app) => app.status === "Pending").length}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-2">Accepted</p>
                <p className="text-3xl font-bold text-emerald-600">{applicants.filter((app) => app.status === "Accepted").length}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-2">Rejected</p>
                <p className="text-3xl font-bold text-red-600">{applicants.filter((app) => app.status === "Rejected").length}</p>
              </div>
            </div>
          </div>
        </main>

        <DashboardFooter />
      </div>
    </div>
  )
}
