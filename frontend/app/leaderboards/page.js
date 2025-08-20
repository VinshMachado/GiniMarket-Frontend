"use client";
import React, { useEffect } from "react";
import { useState } from "react";
const Page = () => {
  const [players, setplayers] = useState([
    { _id: 1, Name: "Alice", Balance: 95 },
  ]);

  const FetchLeaders = async () => {
    try {
      const responce = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/leaders`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!responce.ok) {
        console.log("somthing went wrong");
      }
      const data = await responce.json();
      console.log("leaders data:", data);
      setplayers(data);
    } catch (e) {
      alert("somthing went wrong");
    }
  };
  useEffect(() => {
    FetchLeaders();
  }, []);
  return (
    <div className="w-full h-[900px] flex justify-center items-center bg-amber-300">
      <div className="w-[400px] h-[400px] p-6 bg-white rounded-2xl shadow-lg bg-red">
        <h2 className="text-2xl font-bold text-center mb-4">🏆 Leaderboard</h2>
        <ul>
          {players
            .sort((a, b) => b.Balance - a.Balance) // sort by score
            .map((player, index) => (
              <li
                key={player._id}
                className="flex justify-between items-center p-3 mb-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
              >
                <span className="font-medium">
                  {index + 1}. {player.Name}
                </span>
                <span className="text-blue-600 font-semibold">
                  {player.Balance.toFixed(2)}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
