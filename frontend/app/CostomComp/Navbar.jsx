import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full h-30  flex justify-between items-center flex-wrap">
      <Link href="/">
        <div className="ml-10">LOGO</div>
      </Link>

      <div className="mr-7 sm:w-96  sm:text-2xl  flex justify-center items-center">
        <Link
          href="/login"
          className="ml-5 hover:border-b-2 hover:border-black pb-2 font-poppins"
        >
          Login
        </Link>

        <Link
          className="ml-5  hover:border-b-2 hover:border-black font-poppins pb-2"
          href="/Explore"
        >
          Explore
        </Link>
        <Link
          className="ml-5  hover:border-b-2 hover:border-black font-poppins pb-2"
          href="/portfolio"
        >
          Portfolio
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
