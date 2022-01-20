import React from "react";
import Image from "next/image";
import { BsGenderAmbiguous } from "react-icons/bs";

const Character = ({ characters }) => {
  console.log(characters);

  return (
    <div className="p-8 grid grid-cols-5 gap-6">
      {characters.map((character) => {
        return (
          <div
            key={character.id}
            className="w-fit h-[25rem] border-gray-100 border-[1px] rounded-lg overflow-hidden hover:-translate-y-1 hover"
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
            <div className="bg-[#212121] w-full h-12 border-t-[1px] border-gray-100 flex flex-row items-center justify-between px-4">
              <BsGenderAmbiguous />
              <p className="text-xs">{character.gender}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Character;
