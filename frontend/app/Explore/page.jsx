"use client";

import React, { useEffect, useState } from "react";
import ExploreCard from "../CostomComp/ExploreCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "lucide-react";
import { io } from "socket.io-client";

const page = () => {
  const [stocks, setstocks] = useState([]);
  const [stockprices, setstockprices] = useState([]);
  const [color, setcolor] = useState([]);
  //jwt fetching
  let jwt = "";
  useEffect(() => {
    jwt = `${localStorage.getItem("TOKEN")}`;
  });

  //fetching the stock data
  const fetchStocks = async () => {
    try {
      let url = process.env.NEXT_PUBLIC_BACKEND_URL;
      console.log("Backend URL:", url);

      const response = await fetch(`${url}/stock/getstocks`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("came til here");
      const data = await response.json();
      console.log("Fetched Stocks:", data);
      setstocks(data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };
  useEffect(() => {
    fetchStocks();
  }, []);

  //socket config

  const server = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
    auth: {
      token: `${jwt}`,
    },
  });

  server.on("connect", () => {
    console.log("socketid:", server.id);
  });

  server.on("price-change", (data, data2) => {
    setstockprices(data);
    setcolor(data2);
  });

  //main part

  return (
    <div
      className="w-full h-screen md:pl-64 md:pr-64  bg-gray-50
   flex justify-start pt-10 items-center flex-col"
    >
      {stocks.map((data, i) => {
        let shareprice = stockprices.find(
          (item) => item._id === data._id
        )?.ShareValue;
        shareprice = Math.round(shareprice * 100) / 100;

        return (
          <ExploreCard
            key={data._id}
            link={`Explore/${data._id}`}
            href={`Explore/${data._id}`}
            image={data.ImageUrl}
            name={data.StockName}
            price={shareprice}
            color={color[i]}
          />
        );
      })}
    </div>
  );
};

export default page;
