import React from "react";

const Checkbox = ({ label }) => {
  return (
    <div className="inline-flex items-center space-x-4">
      <input type="checkbox" />
      <span>{label}</span>
    </div>
  );
};

export default Checkbox;
