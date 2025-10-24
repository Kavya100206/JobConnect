import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applications: [],
  },
  reducers: {
    addApplication: (state, action) => {
      state.applications.push(action.payload);
    },
  },
});

export const { addApplication } = applicationSlice.actions;
export default applicationSlice.reducer;
