import React from "react";

const Button = ({ label, click }) => {
  return (
    <div
      className="cursor-pointer px-2 py-1 border-[1px] rounded-lg border-light w-fit text-sm"
      onClick={click}
    >
      {label}
    </div>
  );
};

export default Button;
