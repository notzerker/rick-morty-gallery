import React, { useState } from "react";
import Image from "next/image";
import { BsGenderAmbiguous } from "react-icons/bs";
import Card from "./Card";

const Character = ({ characters }) => {
  return (
    <div className="w-full grid grid-cols-4 gap-6">
      {characters.map((character) => {
        const [card, setCard] = useState(false);

        return (
          <>
            <Card
              character={character}
              close={() => setCard(false)}
              visible={card}
            />
            <div
              key={character.id}
              className="w-fit h-fit overflow-hidden hover:scale-105 transition-all cursor-pointer"
              onClick={() => setCard(true)}
            >
              <Image
                src={character.image}
                className="rounded-lg"
                width="280px"
                height="280px"
              />
              <div className="px-4 mt-2 h-8 drop-shadow-2xl">
                <h2 className="text-xs text-center">{character.name}</h2>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Character;
