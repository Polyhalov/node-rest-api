import express from "express";
import validateBody from "../helpers/validateBody.js";
import { loginSchema, registerSchema } from "../db/user.js";
import { login, register } from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post('/register', validateBody(registerSchema), register);

authRouter.post('/login', validateBody(loginSchema), login)


export default authRouter;