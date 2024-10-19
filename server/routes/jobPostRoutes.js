import { Router } from "express";
import { getAllJobs, jobDetails, postJob } from "../controllers/jobPostControllers.js";

const jobPostRoutes = Router();

jobPostRoutes.get('/get-all-jobs/',getAllJobs)
jobPostRoutes.post('/post-job/',postJob)
jobPostRoutes.get('/get-job-details/:id',jobDetails)

export default jobPostRoutes