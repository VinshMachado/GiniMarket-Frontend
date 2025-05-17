"use client";
import { useState } from "react";
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

    await fetch(`${url}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user,
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          alert("no such user or our server must be down");
        }
        return response.json();
      })
      .then((data) => {
        if (data.ok) localStorage.setItem("TOKEN", data.token);
        console.log("in local:", localStorage.getItem("TOKEN"));
        console.log("token stored");
        console.log(data.token);
        localStorage.setItem("TOKEN", data.token);
        alert("Successfully logged in");
        localStorage.setItem("isLoggedIn", "true");

        router.push("/Explore");
      })
      .catch((e) => {});
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
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
              <Button className="w-full bg-black text-white" onClick={getToken}>
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
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
