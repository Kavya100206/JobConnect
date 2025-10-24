

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