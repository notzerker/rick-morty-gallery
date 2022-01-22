import React from "react";
import Checkbox from "./Checkbox";

const Filters = ({ categories }) => {
  return (
    <div className="flex flex-col justify-start items-center">
      {categories.map((category) => (
        <Checkbox label={category.name} key={category.id} id={category.id} />
      ))}
    </div>
  );
};

export default Filters;
