import axios from "axios";
import { API_BASE_URL } from "./config.js";

//register user
const api = axios.create({
  baseURL: API_BASE_URL, // backend url
  withCredentials: true, //allows cookies to be sent with requests
});

//update profile
export const updateRecruiterProfile = async (userData) => {
  try {
    const response = await api.post("api/recruiter/updateProfile", userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//get my jobs
export const recruiterJobs = async () => {
  try {
    const response = await api.get("api/recruiter/getMyJob");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//delete job
export const deleteJob = async (jobId) => {
  try {
    const response = await api.delete(`api/recruiter/delete/${jobId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//post a job
export const postJob = async (userData) => {
  try {
    const response = await api.post("api/recruiter/post" , userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

//updateJob
export const updateJob = async (jobId , userData) => {
  try {
    const response = await api.put(`api/recruiter/update/${jobId}`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


//getStats
export const getStats = async() => {
  try {
    const response = await api.get('api/recruiter/getStats');
    return response.data;
  } catch (error) {
    
  }
}