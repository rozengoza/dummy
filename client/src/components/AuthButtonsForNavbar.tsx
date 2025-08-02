'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/lib/feature/auth/authSlice";
import { persistor } from "@/lib/store";
import { RootState } from "@/lib/store";
import { toast } from "react-hot-toast";

const AuthButtons = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge().then(() => {
      toast.success("Logged out successfully");
    });
  };

  if (isAuth) {
    return (
      <>
        <Button asChild variant="outline" size="sm">
          <Link href="/bookings">MY BOOKINGS</Link>
        </Button>
        <Button onClick={handleLogout} size="sm">
          LOGOUT
        </Button>
      </>
    );
  }

  return (
    <>
      <Button asChild variant="outline" size="sm">
        <Link href="/login">LOGIN</Link>
      </Button>
      <Button asChild size="sm">
        <Link href="/signup">SIGNUP</Link>
      </Button>
    </>
  );
};

export default AuthButtons;
