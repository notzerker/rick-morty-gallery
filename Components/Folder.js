import React, { useState } from "react";
import Button from "./Button";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const Folder = ({ name, attributes }) => {
  const [folder, setFolder] = useState(false);

  return (
    <div className="my-2">
      <div
        className="w-full flex flex-row items-center justify-between cursor-pointer"
        onClick={() => setFolder(!folder)}
      >
        <p className="font-bold mb-2">{name}</p>
        {folder ? <AiOutlineMinus /> : <AiOutlinePlus />}
      </div>
      {folder && (
        <div className="w-full flex flex-col px-2 space-y-2 mb-4">
          {attributes.map((attribute) => {
            return (
              <Button
                label={attribute.name}
                click={attribute.click}
                key={attribute.id}
              />
            );
          })}
        </div>
      )}
      <div className="w-full h-[1px] bg-light mt-2" />
    </div>
  );
};

export default Folder;
