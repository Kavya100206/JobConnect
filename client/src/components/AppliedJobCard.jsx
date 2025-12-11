"use client";

import { motion } from "framer-motion";

export default function AppliedJobCard({ job, status, index }) {
  if (!job) return null;

  // Status Badge Styles
  const statusClasses = {
    Pending: "bg-amber-50 text-amber-700 border border-amber-200",
    Accepted: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Rejected: "bg-red-50 text-red-700 border border-red-200",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all"
    >
      {/* Header: Job Title + Status */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClasses[status]}`}
        >
          {status}
        </span>
      </div>

      {/* Company */}
      <div className="flex items-center gap-2 text-primary font-medium mb-4 text-base">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M18.75 2.25H5.25A2.25 2.25 0 0 0 3 4.5v15A2.25 2.25 0 0 0 5.25 22.5h13.5A2.25 2.25 0 0 0 21 19.5V4.5a2.25 2.25 0 0 0-2.25-2.25ZM9 6.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v-3Zm10.5 7.5a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75H4.5a.75.75 0 0 1-.75-.75v-3a.75.75 0 0 1 .75-.75h15Z" />
        </svg>

        {job?.recruiter?.company || "Unknown Company"}
      </div>

      {/* Job Details */}
      <div className="space-y-2 text-sm mb-4">
        <p className="text-muted-foreground">📍 {job.location}</p>
        <p className="text-muted-foreground">💰 Salary: ₹{job.salary}</p>

        <div className="flex flex-wrap gap-4 text-muted-foreground">
          <span>💼 {job.jobType}</span>
          <span>🏠 {job.workMode}</span>
          <span>🕒 {job.minExperience} yrs exp</span>
        </div>
      </div>
    </motion.div>
  );
}
