"use client";

import { motion } from "framer-motion";
import JobCard from "./job-card";

export default function RecommendedJobs({
  jobs,
  onSave,
  onApply,
  appliedJobs,
  savedJobs,
  onUnSave,
  withdrawApplication,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-6">
          {/* Blue vertical line */}
          <div
            className="w-1 h-6 rounded-full"
            style={{ backgroundColor: "#2563EB" }}
          ></div>

          <h2 className="text-2xl font-bold text-foreground">
            Recommended for You
          </h2>
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <JobCard
              key={job._id}
              job={job}
              isSaved={savedJobs.some((j) => j._id === job._id)}
              isApplied={appliedJobs.some((j) => j._id === job._id)}
              onSave={() => onSave(job)}
              onApply={() => onApply(job)}
              onUnSave={() => onUnSave(job._id)}
              withdrawApplication={() => withdrawApplication(job._id)}
              index={index}
            />
          ))}
        </div>
      </div>

      <div className="h-px bg-border my-12"></div>
    </motion.div>
  );
}
