import { Router } from "express";
import { allWorkers } from "../controllers/workerControllers.js";

const workerRoutes = Router();

workerRoutes.get('/get-all-workers',allWorkers)

export default workerRoutes