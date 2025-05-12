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
  const [piechart, setpiechart] = useState();

  let jwt = "";

  //fetching users stock holdings

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
    setdata(data.ShareHoldings);
    setpiechart(data);
  };

  useEffect(() => {
    jwt = localStorage.getItem("TOKEN");
    fetchdata();
  }, []);

  // socket config //
  useEffect(() => {
    const server = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
      auth: {
        token: jwt,
      },
    });

    server.on("connect", () => {
      console.log("socketid:", server.id);
    });

    const handlePriceChange = (data, color) => {
      setstockprices(data);
      setcolor(color);
    };

    server.on("price-change", handlePriceChange);
    return () => {
      server.off("price-change", handlePriceChange);
      server.disconnect();
    };
  }, []);

  return (
    <div className="sm:flex sm:p-14 w-full justify-center items-center">
      {piechart ? <Component userdata={piechart} /> : <p>Loading...</p>}
      <div className="w-full sm:p-14 h-full flex flex-col items center overflow-auto">
        {Userdata.length === 0 ? (
          <p className=" text-3xl md:text-6xl pl-16 mt-16 w-full h-full flex justify-center items-center">
            No Holdings Yet{" "}
          </p>
        ) : (
          Userdata.map((data, i) => {
            let shareprice = stockprices.find(
              (item) => item._id === data.stockId
            )?.ShareValue;

            shareprice = Math.round((shareprice ?? 0) * 100) / 100;

            return (
              <PortfolioCard
                key={data.stockId}
                image={data.stockImg}
                name={data.stockName}
                price={
                  typeof shareprice === "number" && !isNaN(shareprice)
                    ? shareprice
                    : 0
                }
                link={`Explore/${data.stockId}`}
                qty={
                  typeof shareprice === "number" && !isNaN(shareprice)
                    ? data.stockQuantity ?? 0
                    : 0
                }
                avg={data.avgPrice}
                color={color[i]}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default page;
