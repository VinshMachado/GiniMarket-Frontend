"use client";

import React, { useEffect, useState } from "react";
import ExploreCard from "../CostomComp/ExploreCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "lucide-react";

const page = () => {
  const [stocks, setstocks] = useState([]);
  const fetchStocks = async () => {
    try {
      let url = process.env.NEXT_PUBLIC_BACKEND_URL;
      console.log("Backend URL:", url);
      console.log(localStorage.getItem("TOKEN"));

      const response = await fetch(`${url}/stock/getstocks`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
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

  return (
    <div
      className="w-full h-screen md:pl-64 md:pr-64  bg-gray-50
   flex justify-start pt-10 items-center flex-col"
    >
      {stocks.map((data) => {
        return (
          <ExploreCard
            key={data._id}
            link={`Explore/${data._id}`}
            href={`Explore/${data._id}`}
            image={data.ImageUrl}
            name={data.StockName}
            price={parseFloat(data.ShareValue.toFixed(2))}
          />
        );
      })}
    </div>
  );
};

export default page;
