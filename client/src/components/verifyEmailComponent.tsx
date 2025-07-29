"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { verifyOtp } from "@/services/api/auth";
import axios from "axios";

interface VerifyEmailComponentProps {
    email: string;
    onSuccess?: () => void;
}

const VerifyEmailComponent = ({ email, onSuccess }: VerifyEmailComponentProps) => {
    const [otp, setOtp] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!otp || otp.length !== 6) {
            toast.error("Please enter a valid 6-digit OTP.");
            return;
        }

        setLoading(true);
        try {
            const res = await verifyOtp({ 'email': email, 'otp': otp });
            toast.success(res?.message || "Email verified successfully!");
            if (onSuccess) onSuccess();
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err?.response?.data?.message || "OTP verification failed");
            } else {
                toast.error("Unexpected error verifying OTP");
            }
        } finally {
            setLoading(false);
        }

    }

    return (
        <form onSubmit={handleVerifyOtp}>
            <div className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md">
                <h1 className="text-xl font-semibold">Verify OTP to Continue</h1>

                <div className="flex w-full flex-col gap-2">
                    <Label>Enter 6-digit OTP</Label>
                    <Input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="123456"
                        className="text-sm tracking-widest text-center"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Verifying..." : "Verify OTP"}
                </Button>
            </div>
        </form>
    )
}

export default VerifyEmailComponent;