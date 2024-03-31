import { ListPokemon } from "../interfaces/pokemon.interface";
// import { useSelectedPokemons } from "../context/selectedPokemonContext";

interface PokemonCardProps {
  pokemon: ListPokemon;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  // const { handlePokemonClick } = usePokemons();

  // const handleSaveClick = () => {
  //   handlePokemonClick(pokemon);
  // };
  return (
    <div className="bg-white shadow-lg p-4 rounded-lg border-8 border-blue-500">
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="w-[150px] mx-auto"
      />
      <div className="border border-blue-300 mt-3 p-2 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold ">{pokemon.name}</div>
          <div className="text-sm text-gray-400">
            {pokemon.height}m | {pokemon.weight}kg
          </div>
        </div>
        <div className="mt-2 flex">
          {pokemon?.type?.map((type, index) => (
            <span
              key={index}
              className="flex h-6 items-center bg-gray-200 rounded-full px-4 text-sm text-gray-700 mr-2"
            >
              {type}
            </span>
          ))}
        </div>
        <button className="w-full h-10 bg-blue-400 rounded-lg text-center mt-3">Save</button>
      </div>
    </div>
  );
};

export default PokemonCard;
