"use client";
import React, { useEffect, useState } from "react";
import { Component } from "./Piechart";
import ExploreCard from "../CostomComp/ExploreCard";
import Link from "next/link";
import { PortfolioCard } from "./PortfolioCard";
import { io } from "socket.io-client";

const page = () => {
  const server = io("http://localhost:4000");

  server.on("connection", (id) => {
    console.log(id);
  });
  const [Userdata, setdata] = useState([]);
  let jwt = "";
  useEffect(() => {
    jwt = localStorage.getItem("TOKEN");
  }, []);

  let fetchdata = async () => {
    console.log(jwt);
    console.log("hi");
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
    setdata(data.ShareHoldings);
    console.log(data.ShareHoldings);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="sm:flex sm:p-14 w-full justify-center items-center">
      <Component />
      <div className="w-full sm:p-14 h-full flex flex-col items center overflow-auto">
        {Userdata.map((data) => {
          return (
            <PortfolioCard
              image={data.stockImg}
              name={data.stockName}
              price={123}
              link={`Explore/${data.stockId}`}
              key={data.stockId}
              qty={data.stockQuantity}
            />
          );
        })}
      </div>
    </div>
  );
};

export default page;
