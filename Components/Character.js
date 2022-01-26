import React from "react";
import { BsGenderAmbiguous } from "react-icons/bs";
import Card from "./Card";
import Individual from "./Individual";

const Character = ({ characters }) => {
  return (
    <div className="w-full grid grid-cols-4 gap-6">
      {characters.map((character) => {
        return <Individual character={character} key={character.key} />;
      })}
    </div>
  );
};

export default Character;
