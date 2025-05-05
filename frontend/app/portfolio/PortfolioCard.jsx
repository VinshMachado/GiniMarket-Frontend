import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export const PortfolioCard = (Props) => {
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

        <CardTitle className={"mr-6"}>
          Value:{" " + Math.round(Props.price * Props.qty * 100) / 100}
        </CardTitle>
        <div className="h-full w-36  flex flex-col justify-center items-center">
          <CardTitle>
            {Props.qty + " X "} <b>{Props.price}</b>
          </CardTitle>
        </div>
      </Card>
    </Link>
  );
};
