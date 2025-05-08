"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const ExploreCard = (Props) => {
  const [color, setcolor] = useState("mr-6");

  let colorselector = () => {
    console.log(Props.color);
    if (Props.color) {
      setcolor("mr-6 text-green-600");
    } else {
      setcolor("mr-6 text-red-600");
      console.log(Props.color);
    }
  };
  useEffect(colorselector, [Props.color]);
  return (
    <Link
      href={Props.link}
      className="w-full flex justify-center items-center "
    >
      <Card
        className={
          "sm:w-full w-full m-2  h-20 bg-white flex justify-between   items-center flex-row hover:shadow-green-400"
        }
      >
        <Avatar className={" ml-5 h-16 w-16"}>
          <AvatarImage src={Props.image} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="h-full w-36  flex flex-col justify-center items-center">
          <CardTitle>{Props.name}</CardTitle>
          <p>{Props.desc}</p>
        </div>

        <CardTitle className={color}>{Props.price}</CardTitle>
      </Card>
    </Link>
  );
};

export default ExploreCard;
