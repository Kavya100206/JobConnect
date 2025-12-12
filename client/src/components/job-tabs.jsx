"use client"

import { motion } from "framer-motion"

export default function JobTabs({ activeTab, setActiveTab, counts }) {
  const tabs = [
    { id: "all", label: "All Jobs", count: counts.all },
    { id: "saved", label: "Saved Jobs", count: counts.saved },
    { id: "applied", label: "Applied Jobs", count: counts.applied },
  ]

  return (
    <div className="mb-8">
      <div className="flex gap-1 border-b border-gray-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-4 py-3 font-medium whitespace-nowrap transition-colors
              ${
                activeTab === tab.id
                  ? "text-[#332D56]" // active purple text
                  : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {tab.label} ({tab.count})
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#71C0BB] rounded-t-full"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
