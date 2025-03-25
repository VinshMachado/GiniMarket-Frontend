import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ExploreCard = (Props) => {
  return (
    <Card
      className={
        "sm:w-1/2 w-full  h-20 bg-green-100 flex justify-between items-center flex-row"
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

      <CardTitle className={"mr-6"}>Price:{Props.price}</CardTitle>
    </Card>
  );
};

export default ExploreCard;
