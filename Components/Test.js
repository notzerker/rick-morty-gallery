import React, { useState } from "react";

const Test = ({ genderQuery }) => {
  return (
    <div className="w-64 flex flex-col">
      <h1 className="font-bold text-4xl">FILTER</h1>
      <button
        className="text-sm cursor-pointer border-gray-300 border-[1px] rounded-lg mt-6"
        onClick={() => genderQuery("male")}
      >
        Male
      </button>
      <button
        className="text-sm cursor-pointer border-gray-300 border-[1px] rounded-lg mt-2"
        onClick={() => genderQuery("female")}
      >
        Female
      </button>
    </div>
  );
};

export default Test;
