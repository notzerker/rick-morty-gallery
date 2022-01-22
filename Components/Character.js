import React from "react";
import Image from "next/image";
import { BsGenderAmbiguous } from "react-icons/bs";

const Character = ({ characters }) => {
  return (
    <div className="w-full grid grid-cols-4 gap-6">
      {characters.map((character) => {
        return (
          <div
            key={character.id}
            className="w-fit h-fit border-gray-300 border-[1px] rounded-lg overflow-hidden hover:scale-105 shadow-lg transition-all"
          >
            <Image
              src={character.image}
              className="rounded-t-lg"
              width="280px"
              height="280px"
            />
            <div className="px-4 mt-2 h-20 drop-shadow-2xl">
              <h2 className="text-sm font-bold">{character.name}</h2>
              <p className="text-xs">Origin: {character.origin.id}</p>
              <p className="text-xs">Location: {character.location.name}</p>
            </div>
            {/* <div className="w-full h-12 border-t-[1px] border-gray-300 flex flex-row items-center justify-between px-4">
              <BsGenderAmbiguous />
              <p className="text-xs">{character.gender}</p>
            </div> */}
          </div>
        );
      })}
    </div>
  );
};

export default Character;
