"use client";
import { useEffect } from "react";
import { io } from "socket.io-client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
import { useState } from "react";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
};

export function LineChat(Props) {
  const [chartData, setdata] = useState([
    {
      month: "",
      desktop: Props.price,
    },
  ]);

  let jwt = "";

  useEffect(() => {
    jwt = localStorage.getItem("TOKEN");
  }, []);

  // socket config //
  const server = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
    auth: {
      token: jwt,
    },
  });

  server.on("connect", () => {
    console.log("socketid:", server.id);
  });
  server.on("price-change", (data) => {
    let datawanted = data.filter((item) => item._id == Props.stockid);
    if (data) {
      setdata((prev) => {
        const newEntry = {
          month: "",
          desktop: datawanted[0]?.ShareValue,
        };

        const graph = [...prev, newEntry];
        if (chartData.length > 2) graph.shift();

        return graph; // ✅ return the updated array
      });
    }
  });

  return (
    <Card className="sm:w-3/5">
      <CardHeader>
        <CardTitle>Line Chart </CardTitle>
        <CardDescription>live</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing Live Graph Of{` ${Props.stockname},${Props.stockid}`}
        </div>
      </CardFooter>
    </Card>
  );
}
