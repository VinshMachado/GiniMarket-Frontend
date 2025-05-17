"use client";
import { LineChat } from "./Stockchat";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Stockdetails } from "./Stockdetails";

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
    <div className="w-full flex flex-col  justify-center items-center">
      <div className="w-full flex justify-center items-center  flex-wrap h-auto">
        <LineChat
          className={"sm:m-5 sm:w-full"}
          stockname={
            stockdetails.StockName ? stockdetails.StockName : "Loading"
          }
          stockid={stockdetails._id}
        />

        <Stockdetails
          className={"m-5"}
          id={stockdetails._id}
          image={stockdetails.ImageUrl}
          name={stockdetails.StockName}
          desc={stockdetails.Desc}
          price={stockdetails.ShareValue}
          os={stockdetails.OSshares}
          equiped={stockdetails.EqupiedShares}
          marketCap={stockdetails.marketCap}
        />
      </div>
    </div>
  );
};

export default page;
