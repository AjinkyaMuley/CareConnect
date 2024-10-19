import { Router } from "express";
import { addReview } from "../controllers/reviewController.js";

const reviewRouter = Router();

reviewRouter.post('/add-review',addReview)

export default reviewRouter