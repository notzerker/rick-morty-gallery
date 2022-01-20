import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Character from "../Components/Character";
import Toast from "../Components/Toast";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

export default function Home(results) {
  const initialState = results;
  const [characters, setCharacters] = useState(initialState.characters);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen text-white">
      <Head>
        <title>Apollo GraphQL</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Toast text={error} visisble={visible} set={setVisible} />
      <div className="flex flex-col items-center justify-center mb-4 py-8">
        <h1 className="text-7xl mb-2 font-black mt-8">Rick and Morty</h1>
        <p className="mb-8 text-sm">Made with NextJS, GraphQL, and Apollo.</p>
        <form
          id="form"
          className="flex flex-row space-x-2"
          onSubmit={async (event) => {
            event.preventDefault();
            const results = await fetch("/api/SearchCharacters", {
              method: "post",
              body: search,
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
            className="inline border-gray-100 border-[1px] px-4 py-2 rounded-lg bg-[#1c1c1c] focus:drop-shadow-md focus:border-white focus:outline-none"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <button
            className="cursor-pointer p-3 rounded-md border-gray-100 border-[1px] hover:drop-shadow-md"
            disabled={search === ""}
            type="submit"
          >
            <AiOutlineSearch />
          </button>
          <button
            className="cursor-pointer p-3 rounded-md border-gray-100 border-[1px]"
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
        <Character characters={characters} />
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
    },
  };
}
