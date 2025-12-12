"use client";

import { motion } from "framer-motion";
import { Bookmark, BookmarkCheck, Send } from "lucide-react";

export default function JobCard({
  job,
  isSaved,
  isApplied,
  onSave,
  onApply,
  onUnSave,
  withdrawApplication,
  index,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0"></div>
          <div className="flex-1">
            <h3 className="-ml-10 text-xl font-semibold text-foreground text-balance ">
              {job.title}
            </h3>
          </div>
        </div>
        <button
          onClick={() => {
            if (isSaved) {
              onUnSave(job._id); // call unsave if already saved
            } else {
              onSave(job._id); // call save if not saved
            }
          }}
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label={isSaved ? "Remove from saved" : "Save job"}
        >
          {isSaved ? (
            <BookmarkCheck className="w-6 h-6 fill-primary text-primary" />
          ) : (
            <Bookmark className="w-6 h-6" />
          )}
        </button>
      </div>

        {/* <div className="flex items-center mb-6 text-xl">
          <p className="text-primary text-xl">{job.recruiter.company}</p>
        </div> */}
        <div className="flex items-center gap-2 mb-6 text-xl font-medium">
  {/* Simple Briefcase Icon for company */}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary">
    <path d="M18.75 2.25H5.25A2.25 2.25 0 0 0 3 4.5v15A2.25 2.25 0 0 0 5.25 22.5h13.5A2.25 2.25 0 0 0 21 19.5V4.5a2.25 2.25 0 0 0-2.25-2.25ZM9 6.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v-3Zm10.5 7.5a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75H4.5a.75.75 0 0 1-.75-.75v-3a.75.75 0 0 1 .75-.75h15Z" />
  </svg>
  
  <p className="text-primary font-semibold">
    {job?.recruiter?.company}
  </p>
</div>

      {/* Job Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-6 text-sm">
          <p className="text-muted-foreground text-xl">📍 {job.location}</p>
          <p className="text-primary text-xl">💰 Salary: ₹{job.salary}</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-6 text-sm">
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
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 text-l">
        {job.description}
      </p>

      {/* Skills */}
      <div className="mb-5">
        <div className="flex flex-wrap gap-2">
          {job?.skillsRequired?.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center px-3 py-1 rounded-md bg-[#F3F4F6] border border-[#E5E7EB] text-gray-700 text-xs font-medium"
            >
              {skill}
            </span>
          ))}
          {job?.skills?.length > 3 && (
            <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#F3F4F6] border border-[#E5E7EB] text-gray-500 text-xs font-medium">
              +{job.skills.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => {
            if (isApplied) {
              withdrawApplication(job._id);
            } else {
              onApply(job._id);
            }
          }}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2
      ${
        isApplied
          ? "bg-[#332D56] text-white shadow-md shadow-[#71C0BB]/20"
          : "bg-[#E3EEB2]/40 text-[#332D56] border border-[#71C0BB]/30 hover:bg-[#E3EEB2]/60"
      }`}
        >
          <Send className="w-4 h-4" />
          {isApplied ? "Applied" : "Apply Now"}
        </button>
      </div>
    </motion.div>
  );
}
