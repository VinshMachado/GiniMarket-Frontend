"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Pie, PieChart } from "recharts";
import { Button } from "@/components/ui/button";
import { io } from "socket.io-client";

export const Stockdetails = (Props) => {
  const [price, setprice] = useState(0);
  const [color, setcolor] = useState(false);
  const [UserBal, setBal] = useState([]);
  const [holdings, setholdings] = useState([]);
  let jwt = "";
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
  const [qty, setqty] = useState(0);

  const buystock = async () => {
    try {
      if (price * qty > UserBal) {
        alert("not enough Funds");
      } else {
        let responce = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/buy`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
            },
            body: JSON.stringify({
              name: Props.name,
              qty: qty,
              stockImg: Props.image,
              stockId: Props.id,
              avg: price,
            }),
          }
        );
        console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/buy`);
        console.log(responce);
        console.log(Props.image, Props.id);
        console.log("success");
      }
    } catch (e) {
      alert(e);
    }
  };
  const fetcholdings = async () => {
    let responce = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/data`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    if (!responce.ok) {
      alert("Failed to fetch data");
    }
    let data = await responce.json();
    setholdings(data.ShareHoldings);
  };

  const sellstock = async () => {
    console.log("Sell button clicked");
    try {
      console.log("ran");

      console.log(holdings);
      let stock = await holdings.find((item) => item.stockName == Props.name);
      console.log(stock.stockQuantity);
      console.log(qty);

      if (stock.stockQuantity >= qty) {
        let responce = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/sell`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
            },
            body: JSON.stringify({ name: Props.name, qty: qty, avg: price }),
          }
        );
        console.log(responce);
        console.log("success");
        alert("stock sold");
      } else {
        alert("NO stock holdings to sell");
      }
    } catch (e) {
      alert(e);
    }
  };

  let fetchdata = async () => {
    let responce = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/data`,
      {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    if (!responce.ok) {
      alert("Failed to fetch data");
    }
    let data = await responce.json();
    setBal(data.Balance);
  };

  useEffect(() => {
    jwt = localStorage.getItem("TOKEN");
    fetchdata();
    fetcholdings();
  }, []);

  // socket config //
  const server = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
    auth: {
      token: jwt,
    },
  });

  server.on("connect", () => {});
  server.on("price-change", (data, color) => {
    // Find the index of the item with matching _id
    const index = data.findIndex((item) => item._id === Props.id);

    if (index !== -1) {
      setprice(data[index].ShareValue ?? 0);
      setcolor(color[index]);
    }
  });

  return (
    <Card
      className={
        "sm:w-1/3 h-[630px] w-full m-2 bg-white flex justify-between border-0 items-center flex-col hover:shadow-green-400"
      }
    >
      <div className="h-full w-full flex justify-center items-center">
        <Avatar className={"ml-5 h-16 w-16"}>
          <AvatarImage src={Props.image} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <CardTitle>{Props.name}</CardTitle>
      </div>

      <div className="w-full h-auto pl-5 pr-5">
        <CardTitle className={"mr-6"}>Description</CardTitle>
        <p className="text-left">{Props.desc}</p>
      </div>

      <div className="h-full w-full flex justify-center items-center">
        <CardTitle>Current Price:</CardTitle>
        <CardTitle
          className={color ? "ml-2 text-green-500" : "ml-2 text-red-500"}
        >
          {(Math.floor(price * 100) / 100).toFixed(2)}
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

      <div className="h-full w-full flex justify-center items-center">
        <CardTitle>OS Shares Vs Equipped Shares</CardTitle>
      </div>

      <div>
        <CardTitle className={"flex"}>
          Market Cap:
          <CardTitle className={"text-green-400"}>{Props.marketCap}</CardTitle>
        </CardTitle>
      </div>

      <div className="w-full flex  items-center justify-center">
        {/* Buy Alert Dialog */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-green-500 text-white">Buy</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white w-64 h-46 flex justify-center items-center flex-col">
            <AlertDialogHeader>
              <AlertDialogTitle>Enter the Qty</AlertDialogTitle>
            </AlertDialogHeader>
            <input
              type="number"
              min="1"
              className="w-1/2 h-16 border-black border-2"
              onChange={(e) => setqty(Number(e.target.value))}
            />
            <AlertDialogAction asChild>
              <Button className="bg-green-500 text-white" onClick={buystock}>
                Buy
              </Button>
            </AlertDialogAction>
          </AlertDialogContent>
        </AlertDialog>

        {/* Sell Alert Dialog */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-red-500 text-white ml-5">Sell</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white w-64 h-46 flex justify-center items-center flex-col">
            <AlertDialogHeader>
              <AlertDialogTitle>Enter the Qty</AlertDialogTitle>
            </AlertDialogHeader>
            <input
              type="number"
              min="1"
              className="w-1/2 h-16 border-black border-2"
              onChange={(e) => setqty(Number(e.target.value))}
            />
            <AlertDialogAction asChild>
              <Button className="bg-red-500 text-white" onClick={sellstock}>
                Sell
              </Button>
            </AlertDialogAction>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Card>
  );
};
