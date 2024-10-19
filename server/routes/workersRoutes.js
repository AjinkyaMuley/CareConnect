import { Router } from "express";
import { addWorker, allWorkers, deleteWorker, getAllWorkersByProfession, updateWorker, workerDetail } from "../controllers/workerControllers.js";

const workerRoutes = Router();

workerRoutes.get('/worker/:id',workerDetail)
workerRoutes.get('/get-all-workers',allWorkers)
workerRoutes.get('/get-all-workers-by-profession/:profession',getAllWorkersByProfession)
workerRoutes.post('/add-worker',addWorker)
workerRoutes.get('/update-worker/:id',updateWorker)
workerRoutes.get('/delete-worker/:id',deleteWorker)

export default workerRoutes