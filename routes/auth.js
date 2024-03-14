import express from "express";
import validateBody from "../helpers/validateBody.js";
import { loginSchema, registerSchema } from "../db/user.js";
import { getCurrent, login, logout, register, updateAvatar } from "../controllers/authControllers.js";
import { authenticate } from "../helpers/authenticate.js";
import upload from "../helpers/upload.js";

const authRouter = express.Router();

authRouter.post('/register', validateBody(registerSchema), register);

authRouter.post('/login', validateBody(loginSchema), login)

authRouter.get('/current', authenticate, getCurrent);

authRouter.post('/logout', authenticate, logout);

authRouter.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar);


export default authRouter;