import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js"
import applicationSlice from "./applicationSlice.js"
import savedJobsSlice from "./savedJobSLice.js"


const store = configureStore({
    reducer:{
        user: userSlice,
        application: applicationSlice,
        savedJobs: savedJobsSlice

    }
})

export default store;