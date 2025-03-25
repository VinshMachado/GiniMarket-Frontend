import React from "react";
import Cards from "./cards";

const Howitworkscards = () => {
  const titlles = [
    "Sign In",
    "Login",
    "Explore Stocks",
    "Buy",
    "Preview In Portfolio",
  ];
  const desc = [
    "Access your account by entering your credentials. This step allows you to manage your portfolio, track stocks, and engage with the platform",

    " Authenticate yourself using your registered email or username and password to enter the system and access personalized features.",

    "Explore Stocks  Browse through available stocks, view their trends, and analyze market data to make informed investment decisions.",

    "Purchase stocks and add them to your portfolio based on market prices and your investment strategy.",

    " View an overview of your purchased stocks, including their current value, performance, and potential growth within your portfolio.",
  ];
  const image = [
    "/key.png",
    "/login.png",
    "/explore.png",
    "/buy.png",
    "/preview.png",
  ];
  return (
    <>
      <div className="h-auto sm:w-11/12 flex flex-wrap sm:bg-[#F6EC72] sm:m-3  sm:mb-20 sm:rounded-4xl">
        {titlles.map((data, index) => {
          return <Cards title={data} desc={desc[index]} image={image[index]} />;
        })}
      </div>
    </>
  );
};

export default Howitworkscards;
