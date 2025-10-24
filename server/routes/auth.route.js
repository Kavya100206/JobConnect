import { login, signUp } from "../controllers/auth.controller.js";
import express from "express";



const authRouter = express.Router();

authRouter.post('/signup' , signUp);
authRouter.post('/login' , login);

export default authRouter;