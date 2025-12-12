export default function JobForm({
  newJob,
  editingJob,
  handleInputChange,
  handlePostJob,
  setShowJobForm,
  setEditingJob,
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8 shadow-sm animate-fade-in">
      <h3 className="text-xl font-semibold text-foreground mb-6">
        {editingJob ? "Edit Job Posting" : "Create New Job Posting"}
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Job Title
            </label>
            <input
              type="text"
              value={newJob.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="e.g., Senior React Developer"
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Location
            </label>
            <input
              type="text"
              value={newJob.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="e.g., San Francisco, CA"
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Minimum Experience
            </label>
            <input
              type="text"
              value={newJob.minExperience}
              onChange={(e) => handleInputChange("minExperience", e.target.value)}
              placeholder="e.g., San Francisco, CA"
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Job Type
            </label>
            <select
              value={newJob.jobType}
              onChange={(e) => handleInputChange("jobType", e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="full-time">full-time</option>
              <option value="part-time">part-time</option>
              <option value="contract">contract</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Work Mode
            </label>
            <select
              value={newJob.workMode}
              onChange={(e) => handleInputChange("workMode", e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="onsite">Onsite</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Salary
            </label>
            <input
              type="text"
              value={newJob.salary}
              onChange={(e) => handleInputChange("salary", e.target.value)}
              placeholder="e.g., $100k - $130k"
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Skills
            </label>
            <input
              type="text"
              value={newJob.skillsRequired || ""}
              onChange={(e) =>
                handleInputChange("skillsRequired", e.target.value)
              }
              className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Job Description
          </label>
          <textarea
            value={newJob.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Describe the job responsibilities and requirements..."
            rows={4}
            className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handlePostJob}
            className="flex items-center gap-2 px-5 py-2 bg-[#71C0BB] text-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200 font-medium"
          >
            {editingJob ? "Update Job" : "Post Job"}
          </button>
          <button
            onClick={() => {
              setShowJobForm(false);
              setEditingJob(null); // reset edit mode
            }}
            className="flex items-center gap-2 px-5 py-2 bg-[#71C0BB] text-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200 font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
