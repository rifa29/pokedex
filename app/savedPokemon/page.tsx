"use client";

import { useContext } from 'react';
import PokemonList from "@/components/PokemonList";
import { SelectedPokemonsContext } from "@/context/selectedPokemonContext";

export default function Home() {
  const selectedPokemon = useContext(SelectedPokemonsContext);

  return (
    <main className="w-[1200px] mx-auto py-10">
      <a href="/" className='text-blue-500 mb-4 block'>Back to pokemon list</a>
      <div className="grid grid-cols-4 gap-4 mb-8">
        <PokemonList pokemons={selectedPokemon?.selectedPokemons || []} isSavedPage={true} />
      </div>
    </main>
  );
}
