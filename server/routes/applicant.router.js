import { applyForJob, getAllJObs, getMyApplications, updateUserprofile, withdrawApplication } from "../controllers/applicant.controller.js";
import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { isApplicant } from "../middlewares/roleAuth.js";


const applicantRouter = express.Router();

applicantRouter.get('/jobs', getAllJObs);
applicantRouter.post('/apply/:jobId', isAuth, isApplicant, applyForJob);
applicantRouter.get('/myApplications', isAuth, isApplicant, getMyApplications);
applicantRouter.delete('/withdraw/:applicationId', isAuth, isApplicant, withdrawApplication);
applicantRouter.post('/updateProfile', isAuth, isApplicant, updateUserprofile);


export default applicantRouter;
