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

  let jwt = "";

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
  const server = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
    auth: {
      token: jwt,
    },
  });

  server.on("connect", () => {
    console.log("socketid:", server.id);
  });

  server.on("price-change", (data) => {
    setstockprices(data);
  });

  return (
    <div className="sm:flex sm:p-14 w-full justify-center items-center">
      <Component />
      <div className="w-full sm:p-14 h-full flex flex-col items center overflow-auto">
        {Userdata.map((data) => {
          let shareprice = stockprices.find(
            (item) => item._id === data.stockId
          )?.ShareValue;
          shareprice = Number(shareprice).toFixed(2); // returns string like "21.20"
          shareprice = parseFloat(shareprice);

          shareprice = parseFloat(shareprice.toFixed(2));
          return (
            <PortfolioCard
              image={data.stockImg}
              name={data.stockName}
              price={shareprice}
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
