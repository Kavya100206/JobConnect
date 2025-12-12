import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import applicationSlice from "./applicationSlice.js";
import savedJobsSlice from "./savedJobSLice.js";
import themeSlice from "./themeSlice.js";

// Persist configuration
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "application", "savedJobs", "theme"], // slices to persist
};

// Combine reducers
const rootReducer = combineReducers({
    user: userSlice,
    application: applicationSlice,
    savedJobs: savedJobsSlice,
    theme: themeSlice,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
});

// Create persistor
export const persistor = persistStore(store);

export default store;