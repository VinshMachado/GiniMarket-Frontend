"use client";
import React, { useEffect, useState } from "react";
import { Component } from "./Piechart";
import ExploreCard from "../CostomComp/ExploreCard";

const page = () => {
  const [data, setdata] = useState(null);
  let jwt = "";
  useEffect(() => {
    jwt = localStorage.getItem("TOKEN");
  }, []);

  let fetchdata = async () => {
    let data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/data`, {
      method: "GET",

      headers: {
        authorization: `Bearer ${jwt}`,
      },
    });
    if (!data.ok) {
      alert("Failed to fetch data");
    }
    setdata(await data.json());
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="sm:flex sm:p-14 w-full justify-center items-center">
      <Component />
      <div className="w-full sm:p-14 h-full flex flex-col items center overflow-auto">
        <ExploreCard
          link={`Explore/${67}`}
          href={`Explore/${23}`}
          image={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABblBMVEX////qQjU0qFNChvX6vAX//v87gPSXuff///1BiPT8//////z//f9BhvPl7/0oePPqQjjoQzbsQjQ0qFX6vQToRDL+//nuQTL89fHpKRX6wQD5twD7tQD+vABEhPYyqVXZ7t4RoD3oNCH4zMr629j++OceokbH5881p0b35OP31NH97uz0q6bzmJLwc2jrWU3raF3xhn73vbbmOSXsMSf0jYvveWv75urwfHb1sqvwoZntYFXtT0L3xb/qKxD4ra3rTkf2xsjqPyH84JLqXizwfR765aD2nhD7wyr88sjydSLpNDj70GL+5K74zUv0ixjuZCj5oxDrUTH81HP7tzkccvOjv/Ryo/f+8tf67b7K3Py90fp/qvJgmfb92IX7xT/huwq1tSWh1auArzjFthdkuHyQsi5ZqkbTsxtMsmmfw/2arTDn8fu03sN4xI6Y0KQamHM/itg8krY3nIM9iOQ8kMaDx5Y4mZ03om05laspzqplAAAOQUlEQVR4nO1di1/b1hW+tnXN9ZVs62FZGGPZFiAbSIDgNCNAWrZ0KSlJui1r2jxIOjqaeQvQrm22/fc7VzJggyVL5gqZ/vT98iAPbH06r++ce32FUIIECRIkSJAgQYIECRIkSJAgQYIECRIkSJAgQYIECRJcMyj8xPALhq8wAL7CcV8TXzBSpAdKiBj39fAHEEPMgs5vzleOWX8TOHNGaXpxfn5ubm5pfnF5Os4r4gQwluORiErLc7dur6wa1gCUtTub64uMKSmLmGAS9wWHBYQdu+jludsrRsXqdJSUqqbOoKZ01TCMu5a1emd9UYLbIN48ighNz32yalmGqutAjtFT1T6WqktZN6xK6t7671CfO98MTK/f61Q6KSOlKgoQUfoM2AdVVxQVzAm2/GzxBmQeURJZzaNImtuogPGGkvKAbFW27k8jSkSKJ7dSErcWLG/KVkcJQ495q6J27lp35uH76eQak0LmRPP3LAsiLyTBlAw/ZFWtbD1A7FZNKAiiS2t3DVVmcReWo6oqOks/1vb6hNpQhOiZX6sYYY13maq1/YD5gzRhloTavrjxqX5lfgx6ZWsJXnHiTLnJwX4uwMU/3ViesPpIl1IdKH0qHyMCyY712YTYEJMytELSnUro7DkCkFZB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`}
          name={"stockname"}
          price={123}
        />
      </div>
    </div>
  );
};

export default page;
