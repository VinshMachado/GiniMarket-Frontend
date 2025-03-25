import Image from "next/image";
import Link from "next/link";
import Navbar from "./CostomComp/Navbar";
import Heros from "./CostomComp/heros";
import Cards from "./CostomComp/cards";
import Howitworkscards from "./CostomComp/Howitworkscards";
import Footer from "./CostomComp/Footer";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Navbar />
      <Heros />
      <div className="w-full sm:h-36 h-28  text-2xl sm:text-5xl flex justify-center bg-[#09A599] text-white  mb-10 mt-8 font-poppins items-center">
        About <p className="text-[#F6EC72]  pl-3 font-bold "> Gini</p>
        Market
      </div>
      <div className="flex justify-center items-center">
        <p className="font-poppins text-center  font-bold text-lg sm:text-2xl text-wrap w-11/12">
          Ginni Market is a solo project inspired by the idea of building a
          stock market from the ground up—not for profit, but purely for fun and
          learning. The goal is to create an interactive and engaging platform
          where users can explore market dynamics, trading concepts, and
          financial strategies in a simplified and enjoyable way. By stripping
          away the complexities of real-world stock markets, Ginni Market offers
          a space for experimentation, education, and entertainment, making
          finance more accessible to everyone.
        </p>
      </div>

      <div className="w-full mt-8 mb-10 rounded-full text-[#1684A7]  h-15 text-bold font-bold  text-2xl sm:text-5xl flex justify-center  font-poppins items-center">
        How It Works?
      </div>
      <Howitworkscards />
      <Footer />
    </div>
  );
}
