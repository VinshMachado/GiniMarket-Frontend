import React from "react";

const Cards = (props) => {
  return (
    <div className="max-w-lg mx-auto m-5 bg-white shadow-xl rounded-2xl p-6 flex flex-col items-center space-y-4">
      {/* Image Placeholder (Replace src with actual image) */}
      <img
        src={props.image}
        alt="Ginni Market"
        className="w-56 h-auto object-cover rounded-lg "
      />

      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        {props.title}
      </h2>

      {/* Description */}
      <p className="text-gray-600 text-center">{props.desc}</p>
    </div>
  );
};

export default Cards;
