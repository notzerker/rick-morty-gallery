import React from "react";
import Character from "../Components/Character";

const Main = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-col items-center justify-center mb-4 py-8">
        <p className="mb-8 text-xl text-gray-500">{numCharacters}</p>
        <form
          id="form"
          className="flex flex-row space-x-2"
          onSubmit={async (event) => {
            event.preventDefault();
            const results = await fetch("/api/SearchCharacters", {
              method: "post",
              body: JSON.stringify(lol),
            });
            const { characters, error } = await results.json();
            if (error) {
              setError(error);
              setVisible(true);
            } else {
              setCharacters(characters);
            }
          }}
        >
          <input
            className="inline border-gray-300 border-[1px] px-4 py-2 rounded-lg focus:drop-shadow-md focus:border-black focus:outline-none"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <button
            className="cursor-pointer p-3 rounded-md border-gray-300 border-[1px] hover:drop-shadow-md"
            disabled={search === ""}
            type="submit"
          >
            <AiOutlineSearch />
          </button>
          <button
            className="cursor-pointer p-3 rounded-md border-gray-300 border-[1px]"
            form="form"
            disabled={search === ""}
            onClick={async () => {
              setSearch("");
              setCharacters(initialState.characters);
            }}
          >
            <AiOutlineClose />
          </button>
        </form>
        <div className="w-full flex flex-row justify-between items-start px-8">
          <div className="w-64 flex flex-col">
            <h1 className="font-bold text-4xl">FILTER</h1>
            <button
              className="text-sm cursor-pointer border-gray-300 border-[1px] rounded-lg mt-2"
              onClick={() => setGender("male")}
            >
              male
            </button>
            <button
              className="text-sm cursor-pointer border-gray-300 border-[1px] rounded-lg mt-2"
              onClick={() => setGender("female")}
            >
              female
            </button>
          </div>
          <Character characters={characters} />
        </div>
      </div>
    </div>
  );
};

export default Main;
