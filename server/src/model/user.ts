import mongoose from "mongoose";
import { nanoid } from "nanoid";
const { Schema } = mongoose;

const userSchema = new Schema({
    id: {
        type: String,
        default: () => nanoid(10),
        unique: true,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
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
        match: [/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"],
    },
    name: String,
    role: String,
    avatar: String,
    password: String,
    isActive: {
        type: Boolean,
        default: true,
    }
});

const User = mongoose.model("User", userSchema);
export default User;