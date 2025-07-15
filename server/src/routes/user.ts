import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.ts";
import { requestOTP, verifyOTP } from "../controllers/otpController.ts";
const saltRounds = 10;
const userRouter = Router();

userRouter.post("/register", async (req, res) => {
    const { email, phoneNumber, password } = req.body;

    if (!email && !phoneNumber) {
        return res.status(400).send("Either email or phone number is required");
    }

    if (!password) {
        return res.status(400).send("Password is required");
    }
    const orConditions = [];
    if (email) orConditions.push({ email });
    if (phoneNumber) orConditions.push({ phoneNumber });

    try {
        const existingUser = await User.findOne({
            $or: orConditions
        });
        if (existingUser) return res.status(400).send("User with this email or phone number already exists");

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await User.create({
            email,
            phoneNumber,
            password: hashedPassword
        });
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser.id,
                email: newUser.email,
                phoneNumber: newUser.phoneNumber,
                isActive: true,
            },
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({ message: error.message });
            }
        }
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


userRouter.post("/send-verification-code", async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    try {
        await requestOTP(email);
        res.status(200).json({ message: "OTP sent to email." });
    } catch (error) {
        res.status(500).json({ error: "Failed to send OTP." });
    }
});


userRouter.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;
    try {
        const isValid = await verifyOTP(email, otp);
        res.status(200).json({ success: isValid });
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "An unknown error occurred." });
        }
    }
});

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email })
    if (!user) return res.send({ message: "Email not found" });
    if (!user.password) {
        return res.status(400).send({ message: "Invalid user data: missing password" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) return res.send({ message: "Invalid password" });
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET not set in environment");
    }
    const token = jwt.sign({ email: email }, secret);
    return res.send({
        message: "Logged in successfully",
        user: user,
        isLoggedIn: true,
        authToken: token,
    });
});

export default userRouter;
