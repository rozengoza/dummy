"use client";

import { useState } from "react";
import { register } from "@/services/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
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

  const router = useRouter();
  const [formValues, setFormValues] = useState({
    name: '', 
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  });

  const [showVerifyOTPField, setShowVerifyOTPField] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; 

    setIsSubmitting(true);
    try {
      const res = await register(formValues);
      console.log(res);
      if (!res?.user?.isEmailVerified) {
        toast.success(res?.message + '. ' + 'Please verify your email to continue');
        setShowVerifyOTPField(true);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorData = err?.response?.data;

        if (err.response?.status === 409) {
          // Specific handling for user already exists
          toast.error(errorData?.message || "User already exists");
        } else if (
          errorData?.message?.toLowerCase().includes("duplicate") ||
          errorData?.message?.toLowerCase().includes("exists")
        ) {
          toast.error("This email or phone number is already registered.");
        } else {
          toast.error(errorData?.message || "Error signing up");
        }
      } else {
        toast.error("Unexpected error signing up");
      }
    } finally {
      setIsSubmitting(false);
    }
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
            <VerifyEmailComponent
              email={formValues.email}
              onSuccess={() => {
                toast.success("Your email is now verified. You can log in.");
                router.push("/login");
              }}
            />
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