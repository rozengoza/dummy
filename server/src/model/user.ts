import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    email: String,
    phoneNumber: String,
    name: String,
    role: String,
    avatar: String,
    password: String,
    userPreferences: [
        {
            type: String,
        }
    ]
});

const User = mongoose.model("User", userSchema);
export default User;