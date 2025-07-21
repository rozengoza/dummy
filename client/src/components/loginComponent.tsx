"use client";

import { useState } from "react";
import { login } from "@/services/api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import axios from "axios";
// import { useAppSelector, useAppDispatch, useAppStore } from "@/lib/hooks";
import VerifyEmailComponent from "./verifyEmailComponent";


interface LoginComponentProps {
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

const LoginComponent = ({
  heading = "Login",
  buttonText = "Login",
  signupText = "Need an account?",
  signupUrl = "https://shadcnblocks.com",
}: LoginComponentProps) => {

  const [showVerifyOTPField, setShowVerifyOTPField] = useState<boolean>(false);

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    phoneNumber: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await login(formValues);
      console.log(res);

      if (res.user.isEmailVerified) {
        toast.success(res?.message);
        localStorage.setItem("authToken", res.authToken);
        localStorage.setItem("user", JSON.stringify(res.user));
        setShowVerifyOTPField(false);
      }
      else{
        setShowVerifyOTPField(true);
      }
      
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data?.error);
      }
      else {
        toast.error("Error signing up");
      }
    } finally {

    }
  };

  return (
    <section className="bg-muted h-screen">
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-6 lg:justify-start">
          {showVerifyOTPField ? (
          <form onSubmit={handleLogin}>
            <div className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md">
              {heading && <h1 className="text-xl font-semibold">{heading}</h1>}
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
              <Button type="submit" className="w-full">
                {buttonText}
              </Button>
            </div>
          </form>
          ) 
          : (
            <VerifyEmailComponent/>
          )}
          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>{signupText}</p>
            <a
              href={signupUrl}
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export { LoginComponent };
