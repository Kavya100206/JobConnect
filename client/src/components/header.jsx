"use client";

import { Link } from "react-router-dom";
import { Briefcase, LogOut, User } from "lucide-react";
import { useSelector } from "react-redux";
import NotificationBell from "./notification-bell";
import ThemeToggle from "./theme-toggle";



export default function DashboardHeader({ onLogout }) {
  const user = useSelector((state) => state.user.userData);
  return (
    <header className="sticky top-0 z-50 border-b border-[#71C0BB] dark:border-[#4E6687] bg-[#332D56] dark:bg-[#1a1825] shadow-md transition-colors">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div>
            <Link
              to={
                "/"
              }
            >
              <div className="flex items-center justify-center gap-2">
                <Briefcase className="h-8 w-8 text-[#71C0BB] dark:text-[#71C0BB]" />
                <h1 className="text-2xl font-bold text-[#E3EEB2] dark:text-[#E3EEB2]">JobConnect</h1>
              </div>
            </Link>
            {/* <p className="text-xs text-gray-500 capitalize">{userRole} Dashboard</p> */}
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 font-medium text-[#E3EEB2] dark:text-[#E3EEB2]">
          <span className="text-sm">
            Hi,{" "}
            <span className="font-semibold text-[#71C0BB] dark:text-[#71C0BB]">
              {user?.name || "Guest"}
            </span>
          </span>

          <Link
            to={
              user?.role === "applicant"
                ? "/ApplicantDashboard"
                : "/RecruiterDashboard"
            }
            className="text-sm hover:text-[#71C0BB] dark:hover:text-[#71C0BB] transition-colors"
          >
            Home
          </Link>
          <Link
            to={
              user?.role === "applicant"
                ? "/ApplicantProfile"
                : "/RecruiterProfile"
            }
            className="text-sm hover:text-[#71C0BB] dark:hover:text-[#71C0BB] transition-colors"
          >
            Profile
          </Link>
          <Link
            to={
              user?.role === "applicant"
                ? "/ApplicantStats"
                : "/RecruiterStats"
            }
            className="text-sm hover:text-[#71C0BB] dark:hover:text-[#71C0BB] transition-colors"
          >
            Stats
          </Link>

          {/* Notification Bell */}
          <NotificationBell />

          {/* Theme Toggle */}
          <ThemeToggle />

          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 hover:scale-105 transition-transform transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </nav>

        <button className="md:hidden p-2 hover:bg-[#4E6687] dark:hover:bg-[#3d5168] rounded-lg transition-colors">
          <User className="h-5 w-5 text-[#E3EEB2] dark:text-[#E3EEB2]" />
        </button>
      </div>
    </header>
  );
}
