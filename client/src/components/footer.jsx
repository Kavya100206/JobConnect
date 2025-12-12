"use client"

export default function DashboardFooter() {
  return (
    <footer className="border-t border-[#71C0BB] dark:border-[#4E6687] bg-[#332D56] dark:bg-[#1a1825] py-2 shadow-inner transition-colors">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-2">
        <div>
          <h3 className="font-semibold text-[#E3EEB2] dark:text-[#E3EEB2] mb-0 text-sm">JobConnect</h3>
          <p className="text-xs text-[#E3EEB2]/80 dark:text-[#E3EEB2]/70 max-w-sm leading-tight">
            Connecting talented professionals with great opportunities.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 text-xs text-[#E3EEB2]/80 dark:text-[#E3EEB2]/80">
          <a href="mailto:support@jobconnect.com" className="hover:text-[#71C0BB] dark:hover:text-[#71C0BB] transition-colors">
            support@jobconnect.com
          </a>
          <a href="tel:+1234567890" className="hover:text-[#F5BABB] dark:hover:text-[#F5BABB] transition-colors">
            +1 (234) 567-890
          </a>
          <a href="#" className="hover:text-[#F5BABB] dark:hover:text-[#F5BABB] transition-colors">
            LinkedIn
          </a>
          <a href="#" className="hover:text-[#F5BABB] dark:hover:text-[#F5BABB] transition-colors">
            Twitter
          </a>
        </div>
      </div>
      <div className="text-center text-[15px] text-[#E3EEB2]/70 dark:text-[#E3EEB2]/60 mt-3 mb-1 select-none">
        &copy; 2025 JobConnect. All rights reserved.
      </div>
    </footer>
  )
}
