import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import { getMyJobs, updateJob, deleteJob, createJob, updateApplicationStatus, getJobApplications, updateRecruiterProfile, getRecruiterStats } from '../controllers/recruiter.controller.js';
import { isRecruiter } from '../middlewares/roleAuth.js';




const recruiterRouter = express.Router();

// recruiter routes
recruiterRouter.post('/post', isAuth, isRecruiter, createJob);
recruiterRouter.get('/getMyJob', isAuth, isRecruiter, getMyJobs);
recruiterRouter.put('/update/:id', isAuth, isRecruiter, updateJob);
recruiterRouter.delete('/delete/:id', isAuth, isRecruiter, deleteJob);
recruiterRouter.get('/applications/:jobId', isAuth, isRecruiter, getJobApplications);
recruiterRouter.put('/updateStatus/:applicationId', isAuth, isRecruiter, updateApplicationStatus);
recruiterRouter.post('/updateProfile', isAuth, isRecruiter, updateRecruiterProfile);
recruiterRouter.get('/getStats', isAuth, isRecruiter, getRecruiterStats);

export default recruiterRouter;