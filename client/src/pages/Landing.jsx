import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Briefcase } from 'lucide-react'


export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-300 bg-white bg-opacity-95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">JobConnect</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden gap-3 sm:flex">
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Get Started
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="border-b border-gray-300 bg-gradient-to-b from-white to-gray-50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Connect with Your <span className="text-blue-600">Perfect Job</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            JobConnect bridges the gap between talented professionals and innovative companies. Find your next
            opportunity or build your dream team.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button
              className="px-6 py-3 text-white bg-blue-600 rounded hover:bg-blue-700 transition-transform hover:scale-105 flex items-center gap-2 justify-center"
              onClick={() => navigate('/signup')}
            >
              Start Your Journey <span aria-hidden="true">→</span>
            </button>
            <button className="px-6 py-3 border border-blue-600 rounded text-blue-600 hover:bg-blue-50 transition-transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Why Choose JobConnect?</h2>
            <p className="mt-4 text-lg text-gray-600">Everything you need to succeed in your career journey</p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="border rounded p-8 bg-white shadow hover:shadow-lg transition-shadow duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 mb-4">
                <div className="h-6 w-6 bg-blue-600 rounded-full"></div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Curated Opportunities</h3>
              <p className="mt-2 text-gray-600">
                Access hand-picked job listings matched to your skills and preferences.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="border rounded p-8 bg-white shadow hover:shadow-lg transition-shadow duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 mb-4">
                <div className="h-6 w-6 bg-indigo-600 rounded-full"></div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Direct Connections</h3>
              <p className="mt-2 text-gray-600">
                Connect directly with hiring managers and build meaningful professional relationships.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="border rounded p-8 bg-white shadow hover:shadow-lg transition-shadow duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 mb-4">
                <div className="h-6 w-6 bg-blue-600 rounded-full"></div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">Quick Matching</h3>
              <p className="mt-2 text-gray-600">
                Our intelligent algorithm matches you with roles in minutes, not weeks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-gray-300 bg-white px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-900">Ready to Find Your Next Opportunity?</h2>
          <p className="mt-4 text-lg text-gray-600">
            Join thousands of professionals already using JobConnect to advance their careers.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="mt-8 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-transform hover:scale-105"
          >
            Sign Up Now →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-300 bg-gray-50 px-4 py-8 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
        <p>© 2025 JobConnect. All rights reserved.</p>
      </footer>
    </div>
  )
}
