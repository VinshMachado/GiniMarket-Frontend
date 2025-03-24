import Image from "next/image";
import Link from "next/link";
import Navbar from "./CostomComp/Navbar";
import Heros from "./CostomComp/heros";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Heros />
      <div className="w-full h-36  text-2xl sm:text-5xl flex justify-center text-shadowed font-poppins items-center">
        About{" "}
        <p className="text-[#8d8b00] pl-3 font-bold text-shadowed"> Gini</p>
        Market
      </div>
    </div>
  );
}
