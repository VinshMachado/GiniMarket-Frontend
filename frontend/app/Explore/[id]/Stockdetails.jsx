import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Pie, PieChart } from "recharts";

export const Stockdetails = (Props) => {
  const chartData = [
    {
      browser: "chrome",
      visitors: Props.os,
      fill: "var(--color-chrome)",
    },
    {
      browser: "safari",
      visitors: Props.equiped,
      fill: "var(--color-safari)",
    },
  ];
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "OS shares",
      color: "hsl(var(--chart-3))",
    },
    safari: {
      label: "Equipped shares",
      color: "hsl(var(--chart-5))",
    },
  };
  console.log("os:", Props.os);
  console.log("equiped:", Props.equiped);
  return (
    <Card
      className={
        "sm:w-1/3 h-[630px] w-full m-2   bg-white flex justify-between   border-0 items-center flex-col hover:shadow-green-400"
      }
    >
      <div className="h-full w-full  flex  justify-center items-center">
        <Avatar className={" ml-5 h-16 w-16"}>
          <AvatarImage src={Props.image} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <CardTitle>{Props.name}</CardTitle>
      </div>
      <div className="w-full h-auto pl-5 pr-5">
        <CardTitle className={"mr-6"}>Description</CardTitle>
        <p className="text-left">{Props.desc}</p>
      </div>
      <div className="h-full w-full  flex  justify-center items-center">
        <CardTitle>Current Price:</CardTitle>
        <CardTitle className="ml-2">
          {(Math.floor(Props.price * 100) / 100).toFixed(2)}
        </CardTitle>
      </div>
      <div className="w-full h-auto pl-5 pr-5">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              stroke="0"
            />
          </PieChart>
        </ChartContainer>
      </div>

      <div className="h-full w-full  flex  justify-center items-center">
        <CardTitle>OS Shares Vs Equipped Shares </CardTitle>
      </div>
    </Card>
  );
};
