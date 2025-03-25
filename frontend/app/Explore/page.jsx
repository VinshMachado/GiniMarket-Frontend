"use client";

import React, { useEffect, useState } from "react";
import ExploreCard from "../CostomComp/ExploreCard";

const page = () => {
  const [stocks, setstocks] = useState();
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
    <div className="w-full h-screen bg-green-300 flex justify-center items-center">
      <ExploreCard />
    </div>
  );
};

export default page;
