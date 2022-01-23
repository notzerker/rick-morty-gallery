import React, { useEffect, useState } from "react";
import useStore from "../Components/Store";
import Head from "next/head";
import Image from "next/image";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Character from "../Components/Character";
import Toast from "../Components/Toast";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import Navbar from "../Components/Navbar";
import Button from "../Components/Button";
import Folder from "../Components/Folder";
import Card from "../Components/Card";

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

  const lol = {
    search,
    gender,
    status,
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
  ];

  const test = ["hello", "hello"];

  const numCharacters = characters.length;

  const check = () => {};

  async function query() {
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
  }

  useEffect(() => {
    query();
  }, [gender, status]);

  return (
    <div>
      <Head>
        <title>Rick & Morty</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      {/* <Toast text={error} visisble={visible} set={setVisible} /> */}
      <div className="flex flex-col items-center justify-between mb-4 py-8 ">
        <div className="w-full flex flex-row justify-between items-start px-8">
          <div className="w-1/4 flex flex-col sticky top-32">
            <form
              id="form"
              className="flex flex-row space-x-2 mb-[18px]"
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
            <div className="w-full h-[1px] bg-gray-300 mb-12" />
            {/* <h1 className="font-bold text-4xl mb-4">FILTER</h1> */}
            <Folder name="Gender" attributes={attributes[0]} />
            <Folder name="Status" attributes={attributes[1]} />
          </div>
          <div className="w-full px-8">
            <div className="mb-6 flex flex-row space-x-4">
              <h1 className="font-bold text-4xl uppercase inline">
                Characters{" "}
              </h1>
              <p className="text-4xl text-gray-300">{"//"}</p>
              <p className="text-4xl text-gray-300 inline">{numCharacters}</p>
            </div>
            <div className="w-full h-[1px] bg-gray-300 mb-12" />
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
