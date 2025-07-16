import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import User from "../model/user.ts";
import { requestOTP, verifyOtpService } from "./otpController.ts";

const saltRounds = 10;

export const register = async (req: Request, res: Response) => {
    const { email, phoneNumber, password } = req.body;

    if (!email && !phoneNumber) {
        return res.status(400).send("Either email or phone number is required");
    }
    if (!password) {
        return res.status(400).send("Password is required");
    }

    try {
        const query: any = {};
        if (email && phoneNumber) {
            query.$or = [{ email }, { phoneNumber }];
        } else if (email) {
            query.email = email;
        } else if (phoneNumber) {
            query.phoneNumber = phoneNumber;
        }

        const existingUser = await User.findOne(query);
        if (existingUser) return res.status(400).send("User already exists");

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await User.create({
            id: nanoid(10),
            email,
            phoneNumber,
            password: hashedPassword,
            isEmailVerified: false,
        });

        if (email) {
            await requestOTP(email);
        }

        return res.status(201).json({
            message: "User registered successfully. Please verify your email",
            user: {
                id: newUser.id,
                email: newUser.email,
                phoneNumber: newUser.phoneNumber,
                isEmailVerified: newUser.isEmailVerified,
            },
        });
    } catch (error: unknown) {
        if ((error as any).code === 11000) {
            return res.status(400).json({ message: "Duplicate user" });
        }
        if (error instanceof Error && error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const sendVerificationCode = async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    try {
        await requestOTP(email);
        res.status(200).json({ message: "OTP sent to email." });
    } catch {
        res.status(500).json({ error: "Failed to send OTP." });
    }
};

export const verifyOtp = async (req: Request, res: Response) => {
    const { email, otp } = req.body;

    try {
        const isValid = await verifyOtpService(email, otp);
        if (!isValid) return res.status(400).json({ error: "Invalid OTP" });

        const user = await User.findOneAndUpdate(
            { email },
            { $set: { isEmailVerified: true } },
            { new: true }
        );

        if (!user) return res.status(404).json({ error: "User not found" });

        return res.status(200).json({
            success: true,
            message: `Email verified successfully for ${email}`,
            user: {
                id: user.id,
                email: user.email,
                isEmailVerified: user.isEmailVerified,
            },
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: "Unknown error" });
        }
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "Email not found" });

        const isPasswordMatched = await bcrypt.compare(password, user.password || "");
        if (!isPasswordMatched) return res.status(401).json({ message: "Invalid password" });

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET not set");
        }

        const token = jwt.sign({ email: user.email }, secret);
        return res.status(200).json({
            message: "Logged in successfully",
            user,
            isLoggedIn: true,
            authToken: token,
        });
    }
    catch (error: any) {
        console.error("Login error: ", error);
        return res.status(500).json({ message: "Login failed " });
    }
};

export const fetchUsers = async (  res: Response) => {
    const data = await User.find();
    return res.send(data);
};