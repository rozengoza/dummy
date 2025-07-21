"use client";

import { useState } from "react";
import { register } from "@/services/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import axios from "axios";
import VerifyEmailComponent from "./verifyEmailComponent";

interface SignupComponentProps {
  heading?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title?: string;
  };
  buttonText?: string;
  googleText?: string;
  signupText?: string;
  signupUrl?: string;
}

const SignupComponent = ({
  heading = "Signup",
  buttonText = "Create Account",
  signupText = "Already a user?",
  signupUrl = "https://shadcnblocks.com",
}: SignupComponentProps) => {
  const [formValues, setFormValues] = useState({
    name: '', // Make sure 'name' is included if your RegisterRequest type expects it
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  });

  const [showVerifyOTPField, setShowVerifyOTPField] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>(''); // Changed to string for input value
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // New state for submission status

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions if already submitting

    setIsSubmitting(true); // Disable button

    try {
      const res = await register(formValues);
      toast.success(res?.message + '. ' + 'Please verify your email to continue');
      if (!res.user.isEmailVerified) {
        setShowVerifyOTPField(true);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // Check if the error is specifically about duplicate email/user
        if (err?.response?.data?.error?.includes("duplicate") || err?.response?.data?.error?.includes("exists")) {
            toast.error("Error: This email is already registered. Please try logging in.");
        } else {
            toast.error(err?.response?.data?.error || "Error signing up");
        }
      } else {
        toast.error("Error signing up");
      }
    } finally {
      setIsSubmitting(false); // Re-enable button regardless of success or failure
    }
  };

  const handleVerifyOtp = async() => {
    // Implement your OTP verification logic here
    // Remember to handle loading state and error messages for this as well
  };

  return (
    <section className="bg-muted h-screen">
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-6 lg:justify-start">
          {!showVerifyOTPField ? (
            <form onSubmit={handleSignup}>
              <div className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md">
                {heading && <h1 className="text-xl font-semibold">{heading}</h1>}
                {/* Add name and phone number fields if they are part of RegisterRequest */}
                <div className="flex w-full flex-col gap-2">
                    <Label>Name</Label>
                    <Input
                        type="text"
                        placeholder="Your Name"
                        className="text-sm"
                        required
                        value={formValues.name}
                        onChange={(e) =>
                            setFormValues((prev) => ({ ...prev, name: e.target.value }))
                        }
                    />
                </div>
                <div className="flex w-full flex-col gap-2">
                    <Label>Phone Number</Label>
                    <Input
                        type="tel" // Use type="tel" for phone numbers
                        placeholder="e.g., 98XXXXXXXX"
                        className="text-sm"
                        required
                        value={formValues.phoneNumber}
                        onChange={(e) =>
                            setFormValues((prev) => ({ ...prev, phoneNumber: e.target.value }))
                        }
                    />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="Email"
                    className="text-sm"
                    required
                    value={formValues.email}
                    onChange={(e) =>
                      setFormValues((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <Label>Password</Label>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="text-sm"
                    required
                    value={formValues.password}
                    onChange={(e) =>
                      setFormValues((prev) => ({ ...prev, password: e.target.value }))
                    }
                  />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    placeholder="Confirm Password" // Corrected typo
                    className="text-sm"
                    required
                    value={formValues.confirmPassword}
                    onChange={(e) =>
                      setFormValues((prev) => ({ ...prev, confirmPassword: e.target.value }))
                    }
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Creating Account..." : buttonText} {/* Dynamic button text */}
                </Button>
              </div>
            </form>
          ) : (
            <VerifyEmailComponent />
          )}
          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>{signupText}</p>
            <a
              href={signupUrl}
              className="text-primary font-medium hover:underline"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { SignupComponent };