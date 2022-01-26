import React, { useState } from "react";
import Card from "./Card";
import Image from "next/image";

const Individual = ({ character }) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Card
        character={character}
        visible={visible}
        close={() => setVisible(false)}
      />
      <div
        className="w-fit h-fit overflow-hidden hover:scale-105 transition-all cursor-pointer"
        onClick={() => setVisible(true)}
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
};

export default Individual;
