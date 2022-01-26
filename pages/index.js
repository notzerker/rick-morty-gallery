import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { ApolloClient, InMemoryCache, gql, split } from "@apollo/client";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { BsGenderAmbiguous } from "react-icons/bs";
import { GiChewedSkull } from "react-icons/gi";
import { RiAliensFill } from "react-icons/ri";
import useStore from "../components/Store";
import Character from "../components/Character";
import Navbar from "../components/Navbar";
import Folder from "../components/Folder";
import Label from "../components/Label";

export default function Home(results) {
  const initialState = results;
  const [characters, setCharacters] = useState(initialState.characters);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);
  const gender = useStore((state) => state.gender);
  const setGender = useStore((state) => state.setGender);
  const status = useStore((state) => state.status);
  const setStatus = useStore((state) => state.setStatus);
  const search = useStore((state) => state.search);
  const setSearch = useStore((state) => state.setSearch);
  const species = useStore((state) => state.species);
  const setSpecies = useStore((state) => state.setSpecies);
  const numCharacters = characters.length;

  useEffect(() => {
    async function query() {
      const results = await fetch("/api/SearchCharacters", {
        method: "post",
        body: JSON.stringify(filter),
      });
      const { characters, error } = await results.json();
      if (error) {
        setError(error);
      } else {
        setCharacters(characters);
      }
    }
    query();
  }, [gender, status, species]);

  const filter = {
    search,
    gender,
    status,
    species,
  };

  const attributes = [
    [
      {
        id: 1,
        name: "Male",
        click: () => setGender("male"),
      },
      {
        id: 2,
        name: "Female",
        click: () => setGender("female"),
      },
      {
        id: 3,
        name: "Unknown",
        click: () => setGender("unknown"),
      },
      {
        id: 4,
        name: "Genderless",
        click: () => setGender("genderless"),
      },
    ],
    [
      {
        id: 1,
        name: "Alive",
        click: () => setStatus("alive"),
      },
      {
        id: 2,
        name: "Dead",
        click: () => setStatus("dead"),
      },
      {
        id: 3,
        name: "Unknown",
        click: () => setStatus("unknown"),
      },
    ],
    [
      {
        id: 1,
        name: "Human",
        click: () => setSpecies("human"),
      },
      {
        id: 2,
        name: "Alien",
        click: () => setSpecies("alien"),
      },
      {
        id: 3,
        name: "Robot",
        click: () => setSpecies("robot"),
      },
      {
        id: 4,
        name: "Humanoid",
        click: () => setSpecies("humanoid"),
      },
    ],
  ];

  return (
    <div>
      <Head>
        <title>Rick & Morty</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <div className="flex flex-col items-center justify-between mb-4 py-8">
        <div className="w-full flex flex-row justify-between items-start px-8">
          <div className="w-1/4 flex flex-col sticky top-32">
            <form
              id="form"
              className="flex flex-row space-x-2 mb-[18px]"
              onSubmit={async (event) => {
                event.preventDefault();
                const results = await fetch("/api/SearchCharacters", {
                  method: "post",
                  body: JSON.stringify(filter),
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
                className="inline border-light border-[1px] px-4 py-2 bg-transparent rounded-lg focus:drop-shadow-md focus:border-black focus:outline-none placeholder-black"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              ></input>
              <button
                className="cursor-pointer p-3 rounded-md border-light border-[1px] hover:drop-shadow-md"
                disabled={search === ""}
                type="submit"
              >
                <AiOutlineSearch />
              </button>
              <button
                className="cursor-pointer p-3 rounded-md border-light border-[1px]"
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
            <div className="w-full h-[1px] bg-light mb-8" />
            <div className="h-[32rem] overflow-scroll flex flex-col">
              <Folder
                name="Gender"
                attributes={attributes[0]}
                icon={<BsGenderAmbiguous />}
              />
              <Folder
                name="Status"
                attributes={attributes[1]}
                icon={<GiChewedSkull />}
              />
              <Folder
                name="Species"
                attributes={attributes[2]}
                icon={<RiAliensFill />}
              />
            </div>
          </div>
          <div className="w-full px-8">
            <div className="mb-6 flex flex-row space-x-4">
              <h1 className="font-bold text-4xl uppercase inline">
                Characters{" "}
              </h1>
              <p className="text-4xl text-light">{"//"}</p>
              <p className="text-4xl text-light inline">{numCharacters}</p>
            </div>
            <div className="w-full h-[1px] bg-light mb-8" />
            <div className="w-full h-8 flex flex-row space-x-4 items-center justify-start mb-4">
              <div className="flex flex-row space-x-2 items-center">
                <p className="uppercase font-bold text-dark">Filters</p>
              </div>
              {gender !== "" ? (
                <Label
                  title="Gender"
                  sub={gender}
                  click={() => setGender("")}
                />
              ) : (
                ""
              )}
              {status !== "" ? (
                <Label
                  title="Status"
                  sub={status}
                  click={() => setStatus("")}
                />
              ) : (
                ""
              )}
              {species !== "" ? (
                <Label
                  title="Species"
                  sub={species}
                  click={() => setSpecies("")}
                />
              ) : (
                ""
              )}
            </div>
            <Character characters={characters} />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql/",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query {
        characters(page: 1) {
          info {
            count
            pages
          }
          results {
            name
            id
            gender
            status
            species
            location {
              id
              name
            }
            origin {
              id
              name
            }
            episode {
              id
              episode
              air_date
            }
            image
          }
        }
      }
    `,
  });

  return {
    props: {
      characters: data.characters.results,
      info: data.characters.info,
    },
  };
}
