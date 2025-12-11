"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FilterPanelAppliedJob({
  filters,
  setFilters,
  setCurrentPage,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const statuses = ["Accepted", "Rejected", "Pending"];

  const handleFilterChange = (value) => {
    setFilters({ status: value });
    setCurrentPage(1);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted transition"
      >
        <span className="font-medium">
          {filters.status ? `Status: ${filters.status}` : "Filter by Status"}
        </span>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-2 p-4 border border-border rounded-xl bg-card space-y-3"
        >
          <button
            className={`block w-full text-left px-2 py-1 rounded ${
              filters.status === "" ? "text-primary font-semibold" : ""
            }`}
            onClick={() => handleFilterChange("")}
          >
            All Applications
          </button>

          {statuses.map((status) => (
            <button
              key={status}
              className={`block w-full text-left px-2 py-1 rounded ${
                filters.status === status ? "text-primary font-semibold" : ""
              }`}
              onClick={() => handleFilterChange(status)}
            >
              {status}
            </button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
