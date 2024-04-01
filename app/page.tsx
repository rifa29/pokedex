"use client";

import PokemonList from "@/components/PokemonList";
import usePokemons from "@/hooks/usePokemons";
import { IndexedType } from "@/interfaces/pokemon.interface";

export default function Home() {
  const {
    pokemons,
    hasMorePokemon,
    fetchNextPage,
    pokemonTypes,
    setSelectedType,
    selectedType,
    setPokemons,
    isLoading,
    setSearchQuery
  } = usePokemons();

  const handleSelectedType = (type: IndexedType | null) => {
    if (type) {
      setSelectedType(type);
    } else {
      setPokemons([]);
      setSelectedType(null);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <main className="max-w-[1200px] mx-auto py-10">
      <div className="mb-10">
        {pokemonTypes.map((type) => (
          <button
            key={type.name}
            className="text-blue-500 mx-2 bg-gray-200 mb-4 px-4 py-2 rounded-md"
            onClick={() => handleSelectedType(type)}
          >
            {type.name}
          </button>
        ))}
      </div>
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Search Pokemon..."
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-md px-3 py-2 mb-4"
        />
        <a href="/savedPokemon" className="text-blue-500">See saved pokemons</a>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <PokemonList pokemons={pokemons} isSavedPage={false} />
        )}
      </div>
      {hasMorePokemon ? (
        <button
          className="w-[300px] h-14 bg-blue-600 text-white text-center mx-auto rounded-lg block"
          onClick={fetchNextPage}
        >
          Load More
        </button>
      ) : null}
    </main>
  );
}
