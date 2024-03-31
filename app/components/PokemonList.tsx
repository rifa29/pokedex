import { ListPokemon } from "../interfaces/pokemon.interface";
import PokemonCard from "./PokemonCard";
// import { useSelectedPokemons } from "../context/selectedPokemonContext";

interface PokemonListProps {
  pokemons: ListPokemon[];
}

const PokemonList = ({ pokemons }: PokemonListProps) => {
  // const { handlePokemonClick } = usePokemons();
  return (
    <>
      {pokemons.length > 0
        ? pokemons.map((p) => {
            return <PokemonCard key={p.name} pokemon={p} />;
          })
        : null}
    </>
  );
};

export default PokemonList;
