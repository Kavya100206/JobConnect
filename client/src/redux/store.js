import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js"
import applicationSlice from "./applicationSlice.js"

const store = configureStore({
    reducer:{
        user: userSlice,
        application: applicationSlice,
    }
})

export default store;