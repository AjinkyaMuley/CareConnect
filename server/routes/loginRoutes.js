import { Router } from "express";
import { userLogin, workerLogin } from "../controllers/loginControllers.js";

const loginRoutes = Router();

loginRoutes.get('/user/',userLogin)
loginRoutes.get('/worker/',workerLogin)

export default loginRoutes