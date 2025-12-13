"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardFooter from "../components/footer";
import DashboardHeader from "../components/header";
import AppliedJobCard from "../components/AppliedJobCard";
import { getMyApplications } from "../apiCalls/applicantCalls";
import SearchBar from "../components/search-bar";
import FilterPanelAppliedJob from "../components/FIlterPanelAppliedJobs";
import { useNavigate } from "react-router-dom";



export default function ApplicationDetailsPage() {
  const [applications, setApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ status: "" });

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getMyApplications();
        const apps = data.applications || data || [];
        setApplications(apps);
      } catch (err) {
        console.log("Error fetching applications:", err);
      }
    };

    fetchApplications();
  }, []);

  // ⭐ FILTER + SEARCH COMBINED
  const filteredJobs = useMemo(() => {
    let filtered = [...applications];

    // 🔎 Search filter
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((app) => {
        const job = app.job;
        if (!job) return false;

        return (
          job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.recruiter?.company
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          job.location?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    // 🏷 Status filter
    if (filters.status) {
      filtered = filtered.filter(
        (app) => app.status.toLowerCase() === filters.status.toLowerCase()
      );
    }

    return filtered;
  }, [applications, searchQuery, filters]);

  // ⭐ PAGINATION
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-foreground">My Applications</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Showing {filteredJobs.length} applications
          </p>

          {/* Search + Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
            <div className="lg:col-span-3">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            <FilterPanelAppliedJob
              filters={filters}
              setFilters={setFilters}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>

        {/* JOB GRID */}
        {currentJobs.length > 0 ? (
          <>
            <motion.div
              key={`grid-${currentPage}-${filters.status}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            >
              {currentJobs.map((app, index) => (
                <AppliedJobCard
                  key={app.applicationId || index}
                  job={app.job}
                  status={app.status}
                  index={index}
                />
              ))}
            </motion.div>

            {/* PAGINATION */}
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
                            ? "bg-primary text-primary-foreground bg-[#71C0BB]"
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
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No applications found.</p>
          </div>
        )}
      </div>

      <DashboardFooter />
    </main>
  );
}
