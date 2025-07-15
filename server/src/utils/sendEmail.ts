import nodemailer from 'nodemailer';
import dotenv from "dotenv";

dotenv.config();

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

export async function sendVerificationCode(userEmail: string, otp: string): Promise<void> {
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Verification code for Level Up Gaming',
        html: `<h2>Your OTP Code</h2><p>Your code is: <b>${otp}</b></p><p>This code is valid for 5 minutes.</p>`,

    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
    } catch (error) {
        console.error("Failed to send email:", error);
        throw error;
    }
}
