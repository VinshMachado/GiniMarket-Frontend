import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export const PortfolioCard = (Props) => {
  const [color, setcolor] = useState("mr-6 text-sm sm:text-md");

  let colorselector = () => {
    console.log(Props.color);
    if (Props.color) {
      setcolor("mr-6 text-green-600 text-sm sm:text-md");
    } else {
      setcolor("mr-6 text-red-600 text-sm sm:text-md");
      console.log(Props.color);
    }
  };
  useEffect(colorselector, [Props.color]);
  return (
    <Link href={Props.link}>
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
        </div>

        <CardTitle className={color}>
          <p className="text-black">Value</p>
          {" " + Math.round(Props.price * Props.qty * 100) / 100}
        </CardTitle>

        <div className="h-full w-36 flex flex-col justify-center items-center">
          <CardTitle className="flex items-center justify-center">
            <span>{Props.qty} ×</span>
            <p className={`${color} ml-3`}>{+Props.price}</p>
          </CardTitle>
        </div>
      </Card>
    </Link>
  );
};
