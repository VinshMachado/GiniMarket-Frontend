import Image from "next/image";
import Link from "next/link";
import Navbar from "./CostomComp/Navbar";
import Heros from "./CostomComp/heros";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Heros />
    </div>
  );
}
