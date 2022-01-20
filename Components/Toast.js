import React from "react";

const Toast = ({ text, visisble, set }) => {
  setTimeout(() => {
    set(false);
  }, 5000);

  return (
    <div
      class={`bg-red-100 border border-red-400 text-red-700 w-fit px-4 py-3 rounded absolute top-12 ${
        visisble ? "absolute" : "hidden"
      }`}
      role="alert"
    >
      <span class="block sm:inline">{text}</span>
    </div>
  );
};

export default Toast;
