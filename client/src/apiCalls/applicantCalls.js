

import axios from "axios";
import { API_BASE_URL } from "./config.js";

//register user
const api = axios.create({
  baseURL: API_BASE_URL, // backend url
  withCredentials: true, //allows cookies to be sent with requests
});

//update profile
export const updateApplicantProfile = async(userData) => {
    try {
        const response = await api.post('api/applicant/updateProfile' , userData)
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

//getAllJobs

export const getAllJobs = async() => {
    try {
        const response = await api.get('api/applicant/jobs')
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}


//apply for a job
export const applyJob = async (jobId) => {
  try {
    const response = await api.post(`/api/applicant/apply/${jobId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//get my applications

export const getMyApplications = async() => {
  try {
    const response = await api.get('api/applicant/myApplications');
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

//withdraw application
export const withdrawApplication = async(applicationId) => {
  try {
    const response = await api.delete(`api/applicant/withdraw/${applicationId}`); 
    return response.data;
  } catch (error) {
    throw error.response.data;
  } 
};



// Save a job
export const saveJob= async (jobId) => {
  try {
    const res = await api.post(
      `/api/applicant/saveJob/${jobId}`
    );
    return res.data; // returns saved job object
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Unsave a job
export const unsaveJob = async (jobId) => {
  try {
    const res = await api.delete(
      `api/applicant/unsaveJob/${jobId}`,);
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// Get all saved jobs
export const getSavedJobs = async () => {
  try {
    const res = await api.get(`api/applicant/savedJobs`);
    return res.data.savedJobs;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

