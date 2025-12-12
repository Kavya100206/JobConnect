import express from 'express';
import { isAuth } from '../middlewares/isAuth.js';
import { getMyJobs, updateJob, deleteJob, createJob, updateApplicationStatus, getJobApplications, updateRecruiterProfile, getRecruiterStats, getApplicantsForRecruiter } from '../controllers/recruiter.controller.js';
import { isRecruiter } from '../middlewares/roleAuth.js';
import upload from '../middlewares/upload.middleware.js';







const recruiterRouter = express.Router();

// recruiter routes
recruiterRouter.post('/post', isAuth, isRecruiter, createJob);
recruiterRouter.get('/getMyJob', isAuth, isRecruiter, getMyJobs);
recruiterRouter.put('/update/:id', isAuth, isRecruiter, updateJob);
recruiterRouter.delete('/delete/:id', isAuth, isRecruiter, deleteJob);
recruiterRouter.get('/viewApplicants/:jobId', isAuth, isRecruiter, getJobApplications);
recruiterRouter.post('/updateProfile', isAuth, isRecruiter, upload.single('profilePicture'), updateRecruiterProfile);
recruiterRouter.get('/getStats', isAuth, isRecruiter, getRecruiterStats);
recruiterRouter.put('/updateApplicationStatus/:applicationId', isAuth, isRecruiter, updateApplicationStatus);
recruiterRouter.get('/getApplicants', isAuth, isRecruiter, getApplicantsForRecruiter);

export default recruiterRouter;