"use client"

export default function DashboardFooter() {
  return (
    <footer className="border-t border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 shadow-inner transition-colors">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-2">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-0 text-sm">JobConnect</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm leading-tight">
            Connecting talented professionals with great opportunities.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 text-xs text-gray-500 dark:text-gray-400">
          <a href="mailto:support@jobconnect.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            support@jobconnect.com
          </a>
          <a href="tel:+1234567890" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            +1 (234) 567-890
          </a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            LinkedIn
          </a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Twitter
          </a>
        </div>
      </div>
      <div className="text-center text-[15px] text-gray-400 dark:text-gray-500 mt-3 mb-1 select-none">
        &copy; 2025 JobConnect. All rights reserved.
      </div>
    </footer>
  )
}
