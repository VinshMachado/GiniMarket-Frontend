"use client";
import React, { useEffect, useState } from "react";
import { Component } from "./Piechart";
import ExploreCard from "../CostomComp/ExploreCard";
import Link from "next/link";
import { PortfolioCard } from "./PortfolioCard";
import { io, Socket } from "socket.io-client";

const page = () => {
  const [Userdata, setdata] = useState([]);
  const [stockprices, setstockprices] = useState([]);
  const [color, setcolor] = useState([]);

  let jwt = "";

  //fetching users stock holdings

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
  };

  useEffect(() => {
    jwt = localStorage.getItem("TOKEN");
    fetchdata();
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

  server.on("price-change", (data, color) => {
    setstockprices(data);
    setcolor(color);
  });

  return (
    <div className="sm:flex sm:p-14 w-full justify-center items-center">
      <Component />
      <div className="w-full sm:p-14 h-full flex flex-col items center overflow-auto">
        {Userdata.map((data, i) => {
          let shareprice = stockprices.find(
            (item) => item._id === data.stockId
          )?.ShareValue;
          shareprice = Math.round(shareprice * 100) / 100;
          return (
            <PortfolioCard
              image={data.stockImg}
              name={data.stockName}
              price={
                typeof shareprice === "number" && !isNaN(shareprice)
                  ? shareprice ?? 0
                  : 0
              }
              link={`Explore/${data.stockId}`}
              key={data.stockId}
              qty={
                typeof shareprice === "number" && !isNaN(shareprice)
                  ? data.stockQuantity ?? 0
                  : 0
              }
              color={color[i]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default page;
