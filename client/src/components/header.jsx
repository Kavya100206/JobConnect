"use client";

import { Link } from "react-router-dom";
import { Briefcase, LogOut, User,Home, BarChart3 } from "lucide-react";
import { useSelector } from "react-redux";
import NotificationBell from "./notification-bell";
import ThemeToggle from "./theme-toggle";



export default function DashboardHeader({ onLogout }) {
  const user = useSelector((state) => state.user.userData);
  return (
    <header className="sticky top-0 z-50 border-b border-[#71C0BB] dark:border-[#4E6687] bg-[#332D56] dark:bg-[#1a1825] shadow-md transition-colors">
      <div className="relative flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
  
  {/* LEFT: Logo */}
  <Link to="/" className="flex items-center gap-2">
    <Briefcase className="h-8 w-8 text-[#71C0BB]" />
    <h1 className="text-2xl font-bold text-[#E3EEB2]">JobConnect</h1>
  </Link>

  {/* CENTER: Hi + Nav */}
  <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-6 text-sm font-medium text-[#E3EEB2]">
    
    <span>
      Hi,{" "}
      <span className="font-semibold text-[#71C0BB]">
        {user?.name || "Guest"}
      </span>
    </span>

    <Link
      to={user?.role === "applicant" ? "/ApplicantDashboard" : "/RecruiterDashboard"}
      className="flex items-center gap-1 hover:text-[#71C0BB] transition-colors"
    >
      <Home className="h-4 w-4" />
      Home
    </Link>

    <Link
      to={user?.role === "applicant" ? "/ApplicantProfile" : "/RecruiterProfile"}
      className="flex items-center gap-1 hover:text-[#71C0BB] transition-colors"
    >
      <User className="h-4 w-4" />
      Profile
    </Link>

    <Link
      to={user?.role === "applicant" ? "/ApplicantStats" : "/RecruiterStats"}
      className="flex items-center gap-1 hover:text-[#71C0BB] transition-colors"
    >
      <BarChart3 className="h-4 w-4" />
      Stats
    </Link>
  </nav>

  {/* RIGHT: Actions */}
  <div className="hidden md:flex items-center gap-4">
    <NotificationBell />
    <ThemeToggle />

    <button
      onClick={onLogout}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 hover:scale-105 transition"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </button>
  </div>

  {/* MOBILE ICON */}
  <button className="md:hidden p-2 rounded-lg hover:bg-[#4E6687]">
    <User className="h-5 w-5 text-[#E3EEB2]" />
  </button>
</div>

    </header>
  );
}
