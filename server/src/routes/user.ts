import { Router } from "express";
import { register, sendVerificationCode, verifyOtp, login } from "../controllers/authController.ts";
const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/send-verification-code", sendVerificationCode);
userRouter.post("/verify-otp", verifyOtp);
userRouter.post("/login", login);

export default userRouter;
