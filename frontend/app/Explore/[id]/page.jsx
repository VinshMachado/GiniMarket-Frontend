"use client";
import { LineChat } from "./Stockchat";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Stockdetails } from "./Stockdetails";

const page = () => {
  const { id } = useParams();
  const [stockdetails, setstockdetail] = useState({});
  const [Userdata, setdata] = useState([]);

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
  let jwt = "";

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
    setdata(data);
    console.log(data.Balance);
  };

  useEffect(() => {
    jwt = localStorage.getItem("TOKEN");
    fetchdata();
  }, []);

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-full flex flex-col  justify-center items-center">
      <div className="w-full flex justify-center items-center  flex-wrap h-auto">
        <LineChat
          stockname={
            stockdetails.StockName ? stockdetails.StockName : "Loading"
          }
          stockid={stockdetails._id}
        />

        <Stockdetails
          id={stockdetails._id}
          image={stockdetails.ImageUrl}
          name={stockdetails.StockName}
          desc={stockdetails.Desc}
          price={stockdetails.ShareValue}
          os={stockdetails.OSshares}
          equiped={stockdetails.EqupiedShares}
        />
      </div>
      hello
    </div>
  );
};

export default page;
