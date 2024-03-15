import express from "express";
import validateBody from "../helpers/validateBody.js";
import { loginSchema, registerSchema, userEmailSchema } from "../db/user.js";
import { getCurrent, login, logout, register, resendVerifyEmail, updateAvatar, verify } from "../controllers/authControllers.js";
import { authenticate } from "../helpers/authenticate.js";
import upload from "../helpers/upload.js";

const authRouter = express.Router();

authRouter.post('/register', validateBody(registerSchema), register);

authRouter.get('/verify/:verificationToken', verify);

authRouter.post('/verify', validateBody(userEmailSchema), resendVerifyEmail);

authRouter.post('/login', validateBody(loginSchema), login)

authRouter.get('/current', authenticate, getCurrent);

authRouter.post('/logout', authenticate, logout);

authRouter.patch('/avatars', authenticate, upload.single('avatar'), updateAvatar);


export default authRouter;