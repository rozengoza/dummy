import mongoose from "mongoose";
import { nanoid } from "nanoid";
const { Schema } = mongoose;

const userSchema = new Schema({
    id: {
        type: String,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true,
        trim: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please enter a valid email address"
        ]
    },
    phoneNumber: {
        type: String,
        unique: true,
        trim: true,
        sparse: true,
        match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"],
    },
    password: {
        type: String,
        required: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.model("User", userSchema);
export default User;