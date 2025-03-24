"use client";
import { useState } from "react";
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
import { Label } from "@/components/ui/label";

export function SigninForm({ className, ...props }) {
  const [password, setpassword] = useState("");
  const [user, Setuser] = useState("");
  const [confirmPass, setconfirmpass] = useState("");

  let Passupdate = (e) => {
    if (!e) return;
    setpassword(e.target.value);
  };
  let confirmPassUpdate = (e) => {
    if (!e) return;
    setconfirmpass(e.target.value);
  };
  let Userupdate = (e) => {
    if (!e) return;
    Setuser(e.target.value);
  };

  //storing token//
  let getToken = async () => {
    if (confirmPass != password) {
      window.alert("Password does not match");
      return;
    }
    let url = process.env.NEXT_PUBLIC_BACKEND_URL;
    console.log(url);
    await fetch(`${url}/user/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("TOKEN", data.token);
        console.log("token stored");
      })
      .catch((e) => {
        console.error("Error:", e);
      });
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome </CardTitle>
          <CardDescription>Please Sign In</CardDescription>
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
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm Password</Label>
                </div>
                <Input type="confirmpassword" onChange={confirmPassUpdate} />
              </div>
              <Button className="w-full bg-black text-white" onClick={getToken}>
                Sign In
              </Button>
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
