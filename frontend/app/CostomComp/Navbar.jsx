"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

const login = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(localStorage.getItem("isLoggedIn") == "true" ? true : false);
  }, []);
  useEffect(() => {
    setLoggedIn(localStorage.getItem("isLoggedIn") == "true" ? true : false);
  }, [isLoggedIn]);

  return isLoggedIn ? (
    <Avatar className={"ml-10"}>
      <HoverCard>
        <HoverCardTrigger className="w-10 h-10">
          {" "}
          <AvatarImage
            src="https://wallpapers.com/images/featured/funny-aesthetic-pictures-ys71y0vex3e7gbod.jpg"
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </HoverCardTrigger>
        <HoverCardContent className="bg-white flex justify-center items-center">
          <Button
            className={"bg-amber-200"}
            onClick={() => {
              localStorage.setItem("isLoggedIn", false);
              setLoggedIn(false);
              localStorage.removeItem("TOKEN");
            }}
          >
            Logout
          </Button>
        </HoverCardContent>
      </HoverCard>
    </Avatar>
  ) : (
    <Link
      href="/login"
      className="ml-5 hover:border-b-2 hover:border-black pb-2 font-poppins"
    >
      Login
    </Link>
  );
};

const Navbar = () => {
  return (
    <div className="w-full h-30  flex justify-between items-center flex-wrap">
      <Link href="/">
        <img src="/Gini.png" className="w-auto ml-3 sm:h-20 h-10" />
      </Link>

      <div className="mr-7 sm:w-96  sm:text-2xl  flex justify-center items-center">
        <Link
          className="  hover:border-b-2 hover:border-black font-poppins pb-2"
          href="/leaderboards"
        >
          LeaderBoards
        </Link>
        <Link
          className="ml-5  hover:border-b-2 hover:border-black font-poppins pb-2"
          href="/Explore"
        >
          Explore
        </Link>
        <Link
          className="ml-5  hover:border-b-2 hover:border-black font-poppins pb-2"
          href="/portfolio"
        >
          Portfolio
        </Link>
        {login()}
      </div>
    </div>
  );
};

export default Navbar;
