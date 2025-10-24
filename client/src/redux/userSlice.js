import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,       // {name, email, role}
  profileData: null,    // Applicant: {skills, resume} | Recruiter: {company, location, workMode, defaultJobType}
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set user info on login
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.isLoggedIn = true;
    },

    // Set or update profile data (role-specific)
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },

    // Update profile partially (merge fields)
    updateProfileData: (state, action) => {
      state.profileData = { ...state.profileData, ...action.payload };
    },

    // Logout user
    logoutUser: (state) => {
      state.userData = null;
      state.profileData = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUserData, setProfileData, updateProfileData, logoutUser } = userSlice.actions;
export default userSlice.reducer;
