"use client";

import React, { useEffect, useState } from "react";

const page = () => {
  const [stocks, setstocks] = useState();
  const fetchStocks = async () => {
    try {
      let url = process.env.NEXT_PUBLIC_BACKEND_URL;
      console.log("Backend URL:", url);

      const response = await fetch(`${url}/stock/getstocks`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
        },
      });
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
      ada
    </div>
  );
};

export default page;
