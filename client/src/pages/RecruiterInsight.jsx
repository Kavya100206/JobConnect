"use client"
import { useNavigate } from "react-router-dom"
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { Users, Briefcase, TrendingUp } from "lucide-react"
import DashboardFooter from "../components/footer.jsx"
import DashboardHeader from "../components/header.jsx"
import { getStats } from "../apiCalls/recruiterCalls.js"
import { useState } from "react"
import { useEffect } from "react"


const chartConfigJobType = {
  fulltime: {
    label: "Full-time",
    color: "#3B82F6",  // Blue-500
  },
  parttime: {
    label: "Part-time",
    color: "#10B981",  // Emerald-500
  },
  contract: {
    label: "Contract",
    color: "#EF4444",  // Red-500
  },
}

export default function RecruiterAnalytics() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    totalApplicants: 0,
    pending: 0,
    accepted: 0,
    rejected: 0
  });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await getStats()
        setData(stats)
      } catch (error) {
        console.error("Error fetching stats:", error)
      }
    }

    fetchStats()
  }, [])

  const handleLogout = () => {
    navigate("/login")
  }


   // legend
  const jobTypeDistributionData = [
    { name: "Full-time", value: data.acceptedJobTypeCounts?.fullTime || 0, color: "#3B82F6" },
    { name: "Part-time", value: data.acceptedJobTypeCounts?.partTime || 0, color: "#10B981" },
    { name: "Contract", value: data.acceptedJobTypeCounts?.contract || 0, color: "#EF4444" },
  ]// hide types with 0 count

  
   // pieChart
  const jobTypePieChart = [
    { name: "Full-time", value: data.jobTypeCOunts
?.fullTime || 0, color: "#3B82F6" },
    { name: "Part-time", value: data.jobTypeCOunts
?.partTime || 0, color: "#10B981" },
    { name: "Contract", value: data.jobTypeCOunts
?.contract || 0, color: "#EF4444" },
  ]


  const applicantsPerJobData = data.applicantsPerJob?.map(item => ({
    job: item.job,
    applicants: item.applicants
  })) || []

  const totalJobs = applicantsPerJobData.length
  const totalApplicants = data.totalApplicants
  const avgApplicantsPerJob = totalJobs > 0 ? Math.round(totalApplicants / totalJobs) : 0
  const mostAppliedJob = applicantsPerJobData.reduce(
    (prev, current) => (current.applicants > prev.applicants ? current : prev),
    applicantsPerJobData[0] || { job: "N/A", applicants: 0 }
  )


  return (
    <div className="flex h-screen bg-background">

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader userName="Jane Smith" userRole="recruiter" onLogout={handleLogout} />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-foreground mb-2">Analytics & Insights</h2>
              <p className="text-muted-foreground">Track your recruitment performance and applicant trends</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-in">
              {/* Total Applicants */}
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground font-semibold">Total Applicants</p>
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-foreground">{data.totalApplicants}</p>
                <p className="text-xs text-muted-foreground mt-2">Across all positions</p>
              </div>

              {/* Active Postings */}
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground font-semibold">Active Postings</p>
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Briefcase className="h-5 w-5 text-accent" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-foreground">{totalJobs}</p>
                <p className="text-xs text-muted-foreground mt-2">Job positions open</p>
              </div>

              {/* Avg per Job */}
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground font-semibold">Avg per Job</p>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-foreground">{avgApplicantsPerJob}</p>
                <p className="text-xs text-muted-foreground mt-2">Applicants per position</p>
              </div>

              {/* Top Position */}
              <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground font-semibold">Top Position</p>
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Briefcase className="h-5 w-5 text-emerald-600" />
                  </div>
                </div>
                <p className="text-lg font-bold text-foreground truncate">{mostAppliedJob.job}</p>
                <p className="text-xs text-muted-foreground mt-2">{mostAppliedJob.applicants} applicants</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Bar Chart - Applicants per Job */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow animate-fade-in border-l-4 border-primary">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-1">Applicants per Job</h3>
                  <p className="text-sm text-muted-foreground">Distribution of applicants across your job postings</p>
                </div>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={applicantsPerJobData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis
                      dataKey="job"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                    />
                    <YAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} />
                    <Bar dataKey="applicants" fill="#3B82F6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart - Job Type Distribution */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow animate-fade-in border-r-4 border-accent">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-1">Job Type Distribution</h3>
                  <p className="text-sm text-muted-foreground">Breakdown of job types among your postings</p>
                </div>
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie
  data={jobTypePieChart}
  cx="50%"
  cy="50%"
  labelLine={false}
  outerRadius={100}
  innerRadius={60}
  fill="#3B82F6"
  dataKey="value"
  label={({ name, percent, value }) =>
    value > 0 ? `${name} ${(percent * 100).toFixed(0)}%` : ""
  }
>

                      {jobTypeDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Legend Section */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-foreground mb-4">Legend</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {jobTypeDistributionData.map((type) => (
                  <div key={type.name} className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: type.color }}></div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{type.name}</p>
                      <p className="text-xs text-muted-foreground">{type.value} applicants</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <DashboardFooter />
      </div>
    </div>
  )
}
