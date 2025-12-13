"use client";

import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DashboardFooter from "../components/footer";
import DashboardHeader from "../components/header";
import { getMyApplications } from "../apiCalls/applicantCalls";

export default function ApplicantStats() {
  const navigate = useNavigate();

  const [statusDistribution, setStatusDistribution] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    accepted: 0,
    rejected: 0,
    pending: 0,
  });

  const [recentApps, setRecentApps] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getMyApplications();
        const apps = data.applications || data || [];

        // derive stats
        const total = apps.length;
        const pending = apps.filter((a) => a.status === "Pending").length;
        const accepted = apps.filter((a) => a.status === "Accepted").length;
        const rejected = apps.filter((a) => a.status === "Rejected").length;

        setStats({ total, pending, accepted, rejected });

        // pie chart
        const pie = [
          { name: "Pending", value: pending, fill: "#728d96ff" },
          { name: "Accepted", value: accepted, fill: "#167fd4ff" },
          { name: "Rejected", value: rejected, fill: "#e02f2fff" },
        ];
        setStatusDistribution(pie);

        // ⭐ CLEANED + DETAILED recent apps list
        const recent = apps
          .slice()
          .sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt))
          .slice(0, 3)
          .map((a) => ({
            job: a.job,
            title: a.job?.title || "Unknown Role",
            company: a.job?.recruiter?.company || "Unknown Company",
            appliedAt: a.appliedAt,
            status: a.status,
          }));

        setRecentApps(recent);
      } catch (err) {
        console.log("Error fetching application stats:", err);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => navigate("/login");

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          onLogout={handleLogout}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Analytics & Insights
              </h1>
              <p className="text-muted-foreground mt-1 text-xl">
                Your job application overview and progress
              </p>
            </motion.div>

            {/* Summary cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              {[
                {
                  label: "Total",
                  value: stats.total,
                  color: "bg-[#E3EEB2]/80 text-[#332D56]",
                },
                {
                  label: "Pending",
                  value: stats.pending,
                  color: "bg-yellow-50 text-yellow-700",
                },
                {
                  label: "Accepted",
                  value: stats.accepted,
                  color: "bg-green-50 text-green-700",
                },
                {
                  label: "Rejected",
                  value: stats.rejected,
                  color: "bg-red-50 text-red-700",
                },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={`${stat.color} rounded-lg p-4 text-center`}
                >
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs font-medium mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Charts + Recent activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* LEFT: PIE CHART */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-card border border-border rounded-2xl p-6 shadow-sm"
              >
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Status Distribution
                </h2>

                <div style={{ width: "100%", height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        paddingAngle={4}
                        dataKey="value"
                        label={({ name, percent, value }) =>
                          value > 0
                            ? `${name} ${(percent * 100).toFixed(0)}%`
                            : ""
                        }
                        labelLine={false}
                      >
                        {statusDistribution.map((entry, i) => (
                          <Cell key={i} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "var(--card)",
                          border: "1px solid var(--border)",
                          borderRadius: "8px",
                        }}
                        labelStyle={{ color: "var(--foreground)" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* RIGHT: RECENT APPLICATIONS */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="bg-card border border-border rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">
                    Recent Applications
                  </h2>

                  {recentApps.length > 0 && (
                    <button
                      onClick={() => navigate("/ApplicantDetails")}
                      className="flex items-center gap-2 px-5 py-2 bg-[#71C0BB] text-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200 font-medium"
                    >
                      View All →
                    </button>
                  )}
                </div>

                {recentApps.length === 0 && (
                  <div className="py-10 text-center text-muted-foreground">
                    No applications yet
                  </div>
                )}

                <div className="space-y-3">
                  {recentApps.map((a, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 rounded-lg border border-border/60 
                                 hover:bg-accent/10 cursor-pointer transition"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {a.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {a.company}
                        </p>
                      </div>

                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          a.status === "Accepted"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : a.status === "Rejected"
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {a.status}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </main>

        <DashboardFooter />
      </div>
    </div>
  );
}
