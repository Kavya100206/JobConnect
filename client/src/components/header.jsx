"use client";

import { Link } from "react-router-dom";
import { Briefcase, LogOut, User } from "lucide-react";
import { useSelector } from "react-redux";




export default function DashboardHeader({ onLogout }) {
  const user = useSelector((state) => state.user.userData);
  return (
    <header className="sticky top-0 z-50 border-b border-gray-300 bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div>
            <Link
            to={
             "/"
            }
            >
            <div className="flex items-center justify-center gap-2">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">JobConnect</h1>
            </div>
            </Link>
            {/* <p className="text-xs text-gray-500 capitalize">{userRole} Dashboard</p> */}
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 font-medium text-gray-700">
          <span className="text-sm">
            Hi,{" "}
            <span className="font-semibold text-blue-600">
              {user?.name || "Guest"}
            </span>
          </span>

          <Link
            to={
              user?.role === "applicant"
                ? "/ApplicantDashboard"
                : "/RecruiterDashboard"
            }
            className="text-sm hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link
            to={
              user?.role === "applicant"
                ? "/ApplicantProfile"
                : "/RecruiterProfile"
            }
            className="text-sm hover:text-blue-600 transition-colors"
          >
            Profile
          </Link>
          <Link
            to={
              user?.role === "applicant"
                ? "/ApplicantStats"
                : "/RecruiterStats"
            }
            className="text-sm hover:text-blue-600 transition-colors"
          >
            Stats
          </Link>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 hover:scale-105 transition-transform transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </nav>

        <button className="md:hidden p-2 hover:bg-gray-200 rounded-lg transition-colors">
          <User className="h-5 w-5 text-gray-700" />
        </button>
      </div>
    </header>
  );
}
