import { Router } from "express";
import { register, sendVerificationCode, verifyOtp, login, fetchUsers } from "../controllers/authController.ts";
const userRouter = Router();

userRouter.post("/register", register);
userRouter.post("/send-verification-code", sendVerificationCode);
userRouter.post("/verify-otp", verifyOtp);
userRouter.post("/login", login);
userRouter.get("/users", fetchUsers);

export default userRouter;
