import { applyForJob, getAllJObs, getMyApplications, getSavedJobs, saveJob, unsaveJob, updateUserprofile, withdrawApplication } from "../controllers/applicant.controller.js";
import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { isApplicant } from "../middlewares/roleAuth.js";
import upload from "../middlewares/upload.middleware.js";




const applicantRouter = express.Router();

applicantRouter.get('/jobs', getAllJObs);
applicantRouter.post('/apply/:jobId', isAuth, isApplicant, applyForJob);
applicantRouter.get('/myApplications', isAuth, isApplicant, getMyApplications);
applicantRouter.delete('/withdraw/:jobId', isAuth, isApplicant, withdrawApplication);
applicantRouter.post('/updateProfile', isAuth, isApplicant, upload.single('profilePicture'), updateUserprofile);
applicantRouter.post('/saveJob/:jobId', isAuth, isApplicant, saveJob);
applicantRouter.delete('/unsaveJob/:jobId', isAuth, isApplicant, unsaveJob);
applicantRouter.get('/savedJobs', isAuth, isApplicant, getSavedJobs);



export default applicantRouter;
