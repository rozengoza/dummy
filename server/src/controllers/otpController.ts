import OTP from "../model/otpModel.ts";
import { sendVerificationCode } from "../utils/sendEmail.ts";

function generateOTP(): string{
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function requestOTP(email: string): Promise<void> {
    const otp = generateOTP();
    await OTP.create({ email, otp });
    await sendVerificationCode(email, otp);
}

export async function verifyOtpService(email: string, userOTP: string): Promise<boolean> {
    const record = await OTP.findOne({ email }).sort({ createdAt: -1 });
    if(!record){
        throw new Error("OTP not found or expired");
    }

    if(record.otp !== userOTP){
        throw new Error("Invalid OTP");
    }
    await OTP.deleteMany({ email });
    return true;
}