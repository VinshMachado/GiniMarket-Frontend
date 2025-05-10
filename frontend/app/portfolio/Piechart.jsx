"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Label, Pie, PieChart } from "recharts";
import { io } from "socket.io-client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
};

export function Component(props) {
  const [chartData, setfinaldata] = useState([
    { browser: "chrome", visitors: 270, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  ]);
  const [userdata, setuserdata] = useState({});
  const [ShareHoldings, setshare] = useState([]);
  const [stockprices, setstockprices] = useState([]);
  let jwt = "";

  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, [chartData]);

  useEffect(() => {
    jwt = localStorage.getItem("TOKEN");
  });

  //setting data from props//
  useEffect(() => {
    setuserdata(props.userdata);
    setshare(props.userdata.ShareHoldings);
  }, [props.userdata]);

  useEffect(() => {
    const server = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
      auth: {
        token: jwt,
      },
    });
    const handlePriceChange = (data, color) => {
      setstockprices(data);
      setcolor(color);
    };
    server.on("price-change", handlePriceChange);
    return () => {
      server.off("price-change", handlePriceChange);
      server.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log("fron chart", stockprices);
    let temp = 0;
    let bal = 0;

    ShareHoldings.map((data, i) => {
      let shareprice = stockprices.find(
        (item) => item._id === data.stockId
      )?.ShareValue;
      shareprice = Math.round(shareprice * 100) / 100;

      if (shareprice) {
        temp += data.stockQuantity * shareprice;
      }
    });

    setfinaldata([
      {
        browser: "Cash",
        visitors: Math.round(userdata.Balance * 100) / 100,
        fill: "var(--color-chrome)",
      },
      { browser: "Equity", visitors: temp, fill: "var(--color-safari)" },
    ]);
  }, [stockprices]);

  return (
    <Card className="flex flex-col border-0 sm:w-1/2 ">
      <CardHeader className="items-center pb-0">
        <CardTitle>Portfolio Destibution</CardTitle>
        <CardDescription>stocks and cash</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
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
              innerRadius={50}
              strokeWidth={4}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        ></tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
