import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Label = ({ title, sub, click }) => {
  return (
    <div
      className="cursor-pointer px-2 py-1 border-[1px] rounded-lg border-light w-fit text-sm flex flex-row items-center justify-center space-x-2 hover:bg-light"
      onClick={click}
    >
      <p>
        {title}: <span>{sub}</span>
      </p>
      <AiOutlineClose className="text-gray-500" />
    </div>
  );
};

export default Label;
