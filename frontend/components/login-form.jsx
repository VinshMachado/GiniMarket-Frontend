"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";

export function LoginForm({ className, ...props }) {
  const [password, setpassword] = useState("");
  const [user, Setuser] = useState("");
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  let Passupdate = (e) => {
    if (!e) return;
    setpassword(e.target.value.toLowerCase());
  };
  let Userupdate = (e) => {
    if (!e) return;
    Setuser(e.target.value.toLowerCase());
  };

  //storing token//
  let getToken = async () => {
    let url = process.env.NEXT_PUBLIC_BACKEND_URL;
    setIsProcessing(true);

    try {
      const response = await fetch(`${url}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, password }),
      });

      if (!response.ok) {
        setIsProcessing(false);
        throw new Error("Invalid credentials. sign before login");
      }

      const data = await response.json();

      localStorage.setItem("TOKEN", data.token);
      localStorage.setItem("isLoggedIn", "true");
      setIsProcessing(false);
      alert("Successfully logged in");
      router.push("/Explore");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {isProcessing ? (
        <div className="flex items-center justify-center p-4 text-lg font-medium">
          Loading
          <span className="animate-bounce">.</span>
          <span className="animate-bounce delay-150">.</span>
          <span className="animate-bounce delay-300">.</span>
        </div>
      ) : (
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>

            <CardDescription>Login with your Account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Username</Label>
                  <Input placeholder="Username" onChange={Userupdate} />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input type="password" onChange={Passupdate} />
                </div>
                <Button
                  className="w-full bg-black text-white"
                  onClick={getToken}
                >
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signin" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
