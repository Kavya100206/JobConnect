"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { getAllJobs } from "../apiCalls/applicantCalls.js"




export default function FilterPanel({ filters, setFilters, setCurrentPage }) {
  const [isOpen, setIsOpen] = useState(false)
  const [jobs,setJobs]=useState([])

   // ✅ Fetch all jobs when component mounts
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAllJobs()
        // some APIs return data inside response.data
        setJobs(response?.data || response)
      } catch (error) {
        console.error("Error fetching jobs:", error)
      }
    }

    fetchJobs()
  }, [])

  const locations = useMemo(() => {
    const locs = jobs.map((job) => job.location).filter(Boolean)
    return [...new Set(locs)]
  }, [jobs])

  const jobTypes = useMemo(() => {
    const types = jobs.map((job) => job.jobType).filter(Boolean)
    return [...new Set(types)]
  }, [jobs])

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value })
    setCurrentPage(1)
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-border bg-card text-foreground hover:bg-muted transition-colors"
      >
        <span className="font-medium">Filters</span>
        <ChevronDown
          className={`w-5 h-5 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.2 }}
          className="mt-2 p-4 rounded-xl border border-border bg-card space-y-4"
        >
          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Location
            </label>
            <select
              value={filters.location}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Job Type
            </label>
            <select
              value={filters.jobType}
              onChange={(e) => handleFilterChange("jobType", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
