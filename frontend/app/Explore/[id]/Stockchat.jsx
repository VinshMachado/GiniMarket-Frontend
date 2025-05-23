"use client";
import { useEffect } from "react";
import { io } from "socket.io-client";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

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

  server.on("connect", () => {});

  useEffect(() => {
    const handlePriceChange = (data) => {
      const datawanted = data.find((item) => item._id === Props.stockid);
      if (!datawanted?.ShareValue) return;

      setdata((prev) => {
        const last = prev[prev.length - 1];
        if (last?.desktop === datawanted.ShareValue) return prev;

        const newEntry = { month: "", desktop: datawanted.ShareValue };
        const graph = [...prev, newEntry];
        if (graph.length > 10) graph.shift();
        return graph;
      });
    };

    server.on("price-change", handlePriceChange);

    // 🔴 CLEAN UP to avoid memory leaks
    return () => {
      server.off("price-change", handlePriceChange);
    };
  }, [Props.stockid]);

  return (
    <Card className="sm:w-3/5">
      <CardHeader>
        <CardTitle>LIVE STOCK DATA </CardTitle>
        <CardDescription>live</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
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
            <YAxis domain={["dataMin - 0.1", "dataMax + 0.1"]} />
            <Tooltip formatter={(value) => value.toFixed(5)} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="desktop"
              type="linear"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing Live Graph Of{` ${Props.stockname}`}
        </div>
      </CardFooter>
    </Card>
  );
}
