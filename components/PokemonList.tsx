import { useContext } from "react";
import { SelectedPokemonsContext } from "../context/selectedPokemonContext";
import { ListPokemon } from "../interfaces/pokemon.interface";
import PokemonCard from "./PokemonCard";

interface PokemonListProps {
  pokemons: ListPokemon[];
  isSavedPage: boolean;
}

const PokemonList = ({ pokemons, isSavedPage }: PokemonListProps) => {
  const selectedPokemonStore = useContext(SelectedPokemonsContext);
  const selectedPokemonNames = selectedPokemonStore?.selectedPokemons.map(item => item.name)
  return (
    <>
      {pokemons.length > 0
        ? pokemons.map((p) => {
            return <PokemonCard key={p.name} pokemon={p} hasBeenSaved={Boolean(selectedPokemonNames?.includes(p.name))} isSavedPage={isSavedPage}/>;
          })
        : null}
    </>
  );
};

export default PokemonList;
