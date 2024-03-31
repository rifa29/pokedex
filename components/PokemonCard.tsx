import { useContext, useState } from "react";
import { ListPokemon } from "@/interfaces/pokemon.interface";
import { SelectedPokemonsContext } from "@/context/selectedPokemonContext";

interface PokemonCardProps {
  pokemon: ListPokemon;
  hasBeenSaved: boolean;
  isSavedPage: boolean;
  // onDeletePokemon?: (pokemonName: string) => void;
}

const PokemonCard = ({ pokemon, hasBeenSaved, isSavedPage }: PokemonCardProps) => {
  const selectedPokemon = useContext(SelectedPokemonsContext);
  const [alias, setAlias] = useState<string>("");
  const [showAliasInput, setShowAliasInput] = useState<boolean>(false);

  // const handleSaveClick = () => {
  //   selectedPokemon?.addSelectedPokemon(pokemon);
  // };
  const handleSaveClick = () => {
    if (!hasBeenSaved) {
      setShowAliasInput(true);
    } else {
      selectedPokemon?.removeSelectedPokemon(pokemon.name);
    }
  };

  const handleAliasSaveClick = () => {
    selectedPokemon?.addSelectedPokemon({ ...pokemon, alias });
    setShowAliasInput(false);
    setAlias("");
  };

  const handleDeleteClick = () => {
    selectedPokemon?.removeSelectedPokemon(pokemon.name);
  };

  return (
    <div className="bg-white shadow-lg p-4 rounded-lg border-8 border-blue-500">
      {isSavedPage && (
        <>
          <div className="mt-2 text-sm text-gray-500">
            Alias: {pokemon.alias}
          </div>
        </>
      )}
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
        {showAliasInput ? (
          <div className="mt-2">
            <input
              type="text"
              placeholder="Enter Alias"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              className="w-full h-10 rounded-lg border border-gray-300 px-3 focus:outline-none focus:border-blue-500"
            />
            <button
              className="w-full h-10 rounded-lg text-center mt-3 bg-blue-400 hover:bg-blue-300"
              onClick={handleAliasSaveClick}
            >
              Save with Alias
            </button>
          </div>
        ) : (
          <>
            {!isSavedPage && (
              <button
                className={`w-full h-10 rounded-lg text-center mt-3 ${
                  hasBeenSaved ? "bg-gray-200" : "bg-blue-400 hover:bg-blue-300"
                }`}
                onClick={handleSaveClick}
                disabled={hasBeenSaved}
              >
                {hasBeenSaved ? "Saved" : "Save"}
              </button>
            )}
            {isSavedPage && (
              <button
                className={`w-full h-10 rounded-lg text-center mt-3 bg-red-400 hover:bg-red-300`}
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonCard;
