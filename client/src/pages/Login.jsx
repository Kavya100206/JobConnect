import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Eye, EyeOff, Loader2 } from "lucide-react";
import { login } from "../apiCalls/authCalls.js";
import { setProfileData, setUserData } from "../redux/userSlice.js";
import { useDispatch } from "react-redux";
import ApplicantDashboard from "./ApplicantDashboard.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;
    const user = {
      email: formData.email,
      password: formData.password,
    };

    setIsLoading(true); // Start loading animation

    try {
      const response = await login(user);
      console.log("User signed in successfully:", response);
      alert("User signed in successfully!");
      console.log(response.user.role)

      dispatch(
        setUserData({
          id: response.user._id,
          name: response.user.name,
          email: response.user.email,
          role: response.user.role,
          profilePicture: response.user.profilePicture,
        })
      );

      // store profile info
      if (response.user.role === "applicant") {
        dispatch(
          setProfileData({
            skills: response.user.skills,
            resume: response.user.resume,
            experience: response.user.experience,
          })
        );
      } else if (response.user.role === "recruiter") {
        dispatch(
          setProfileData({
            company: response.user.company,
            location: response.user.location,
          })
        );
      }
      if (response.user.role === "applicant") {
        navigate("/ApplicantDashboard");
      }
      else {
        navigate("/RecruiterDashboard")
      }

      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error signing in user:", error);
      alert("Error signing in user");
    } finally {
      setIsLoading(false); // Stop loading animation
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-8 shadow-2xl flex flex-col items-center gap-4">
            <Loader2 className="h-12 w-12 text-[#71C0BB] animate-spin" />
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">Signing in...</h3>
              <p className="text-sm text-gray-600 mt-1">Please wait a moment</p>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2">
            <Briefcase className="h-8 w-8 text-[#71C0BB]" />
            <h1 className="text-2xl font-bold text-gray-900">JobConnect</h1>
          </div>
          <p className="mt-2 text-gray-600">
            Welcome back! Sign in to your account
          </p>
        </div>
        <div className="border border-gray-300 bg-white p-8 rounded shadow">
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Email Address
            </label>
            <input
              type="text"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#71C0BB]"
              disabled={isLoading}
            />
          </div>
          {/* Password with toggle */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs text-[#71C0BB] hover:underline"
                disabled={isLoading}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className="pr-10 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#71C0BB]"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          {/* Error message */}
          {error && (
            <div className="rounded bg-red-100 p-3 text-sm text-red-700">
              {error}
            </div>
          )}
          {/* Submit button */}
          <button
            type="submit"
            className="my-4 w-full bg-[#71C0BB] text-white rounded px-4 py-2 hover:bg-[#5aa8a3] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            onClick={handlelogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Login"
            )}
          </button>
          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 border-t border-gray-300" />
            <span className="text-xs text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-300" />
          </div>
          {/* SignUp link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="font-semibold text-[#71C0BB] hover:underline"
              disabled={isLoading}
            >
              Sign up
            </button>
          </p>
        </div>
        {/* Footer */}
        <div className="mt-8 flex justify-center gap-4 text-xs text-gray-500">
          <button className="hover:text-gray-700 transition-colors">
            Privacy Policy
          </button>
          <span>•</span>
          <button className="hover:text-gray-700 transition-colors">
            Terms of Service
          </button>
        </div>
      </div>
    </div>
  );
}
