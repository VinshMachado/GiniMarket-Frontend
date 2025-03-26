"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const { id } = useParams();
  const [stockdetails, setstockdetail] = useState({});
  const getData = async () => {
    console.log("ID:", id); // Ensure this logs correctly

    try {
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/stock/one`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: id }), // Correctly formatted JSON
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let data = await response.json();

      setstockdetail(data[0]);
      console.log(data);
    } catch (error) {
      console.error("Error fetching stock details:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>{stockdetails.StockName ? stockdetails.StockName : "Loading"}</div>
  );
};

export default page;
