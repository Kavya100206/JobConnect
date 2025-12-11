// redux/savedJobsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const savedJobsSlice = createSlice({
  name: "savedJobs",
  initialState: {
    jobs: [],
  },
  reducers: {
    setSavedJobs: (state, action) => {
      // Replace all saved jobs (useful when fetching from API)
      state.jobs = action.payload;
    },
    addSavedJob: (state, action) => {
      const job = action.payload;
      const exists = state.jobs.find((j) => j._id === job._id);
      if (!exists) state.jobs.push(job);
    },
    removeSavedJob: (state, action) => {
      // action.payload is job._id
      state.jobs = state.jobs.filter((job) => job._id !== action.payload);
    },
    clearSavedJobs: (state) => {
      state.jobs = [];
    },
  },
});

export const { setSavedJobs, addSavedJob, removeSavedJob, clearSavedJobs } = savedJobsSlice.actions;
export default savedJobsSlice.reducer;
