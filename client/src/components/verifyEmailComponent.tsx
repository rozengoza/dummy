"use client";

import { useState } from "react";
import { register } from "@/services/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import axios from "axios";

const VerifyEmailComponent = () => {
    const [otp, setOtp] = useState<number | null>(null);
    const handleVerifyOtp = () => {

    };

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

                <Button type="submit" className="w-full">
                    Verify OTP
                </Button>
            </div>
        </form>
    )
}

export default VerifyEmailComponent;