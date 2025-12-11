import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applications: [],
  },
  reducers: {
    addApplication: (state, action) => {
      const job = action.payload;
  const exists = state.applications.find((j) => j._id === job._id);
  if (!exists) state.applications.push(job);
    },
    clearApplications: (state) => {
    state.applications = [];
  },
  removeApplication : (state,action)=>{
    state.applications = state.applications.filter((app) => app._id!==action.payload);
  }
  },
});

export const { addApplication , clearApplications,removeApplication } = applicationSlice.actions;
export default applicationSlice.reducer;
