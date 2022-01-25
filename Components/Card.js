import Image from "next/image";
import React, { useState } from "react";

const Card = ({ character, visible, close }) => {
  const Trait = ({ desc, trait }) => {
    return (
      <div className="flex flex-col rounded-lg w-44 h-16 p-2 bg-light items-start justify-center px-4 shadow-lg">
        <p className="text-gray-500 text-xs">{trait}</p>
        <p className="text-gray-900 text-xs font-bold">{desc}</p>
      </div>
    );
  };

  return (
    <div
      className={`${
        visible ? "fixed" : "hidden"
      } w-full h-screen bg-gray-300/80 top-0 left-0 z-50 flex items-center justify-center`}
      onClick={close}
    >
      <div className="w-[64rem] h-[30rem] rounded-lg bg-dark flex flex-row items-center justify-between shadow-lg relative">
        <div className="h-[30rem] w-[58rem] relative">
          <Image
            src={character.image}
            className="object-cover rounded-l-lg"
            layout="fill"
          />
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <p className="font-bold text-3xl text-center">{character.name}</p>
          <div className="grid grid-cols-2 auto-cols-auto gap-2 mt-4">
            <Trait desc={character.status} trait="Status: " />
            <Trait desc={character.gender} trait="Gender: " />
            <Trait desc={character.id} trait="ID: " />
            <Trait desc={character.location.name} trait="Location: " />
            <Trait desc={character.origin.name} trait="Origin: " />
            <Trait desc={character.species} trait="Species: " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
