import axios from "axios";
import { useEffect, useState } from "react";
import {
  POKEMON_API_BASE_URL,
  POKEMON_API_POKEMON_URL,
  POKEMON_IMAGES_BASE_URL,
  POKEMON_TYPES,
} from "../../app/constans";
import {
  IndexedPokemon,
  ListPokemon,
  PokemonListResponse,
  IndexedType,
  PokemonByTypeListResponse,
} from "../interfaces/pokemon.interface";
// import { useSelectedPokemons } from '../context/selectedPokemonContext';

interface UsePokemonsResult {
  pokemons: ListPokemon[];
  fetchNextPage: () => void;
  hasMorePokemon: boolean;
  pokemonTypes: IndexedType[];
  selectedType: IndexedType | null;
  setSelectedType: (type: IndexedType | null) => void;
  setPokemons: React.Dispatch<React.SetStateAction<ListPokemon[]>>;
  isLoading: boolean;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const usePokemons = (): UsePokemonsResult => {
  const [pokemons, setPokemons] = useState<ListPokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(
    POKEMON_API_POKEMON_URL
  );
  const [selectedType, setSelectedType] = useState<IndexedType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // const { addSelectedPokemon } = useSelectedPokemons();

  useEffect(() => {
    if(selectedType) {
      fetchPokemonByType()
    } else {
      fetchPokemon();
    }
  }, [selectedType, searchQuery]);

  const fetchPokemonByType = async () => {
    setIsLoading(true);
    if (selectedType) {
      const result = await axios.get<PokemonByTypeListResponse>(
        selectedType.url
      );
      if(result?.data?.pokemon) {
        const listPokemon = result.data.pokemon.map((p) => indexedPokemonToListPokemon(p.pokemon));
  
        const pokemonDetailsPromises = result.data.pokemon.map(
          (p) => fetchPokemonDetails(p.pokemon.name)
        );
  
        const pokemonDetails = await Promise.all(pokemonDetailsPromises);
  
        const pokemonsWithDetails = listPokemon.map(
          (pokemon: IndexedPokemon, index: string | number) => ({
            ...pokemon,
            height: pokemonDetails[index].height,
            weight: pokemonDetails[index].weight,
            types: pokemonDetails[index].types.map(
              (type: any) => type.type.name
            ),
          })
        );
  
        setPokemons(pokemonsWithDetails);
        setNextUrl(POKEMON_API_POKEMON_URL);
      }
    }
    setIsLoading(false);
  };

  const fetchPokemonDetails = async (pokemonName: string) => {
    try {
      const response = await axios.get(
        `${POKEMON_API_BASE_URL}/pokemon/${pokemonName}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Pokemon details:", error);
      return null;
    }
  };

  const indexedPokemonToListPokemon = (indexedPokemon: IndexedPokemon) => {
    const pokemonNumber = parseInt(
      indexedPokemon.url
        .replace(`${POKEMON_API_POKEMON_URL}/`, "")
        .replace("/", "")
    );

    return {
      name: indexedPokemon.name,
      url: indexedPokemon.url,
      image: `${POKEMON_IMAGES_BASE_URL}/${pokemonNumber}.png`,
      pokemonNumber,
    };
  };

  const fetchPokemon = async () => {
    if (nextUrl) {
      const result = await axios.get<PokemonListResponse>(nextUrl);

      if (result?.data?.results) {
        const listPokemons = result.data.results.map((p: IndexedPokemon) =>
          indexedPokemonToListPokemon(p)
        );

        const pokemonDetailsPromises = result.data.results.map(
          (p: IndexedPokemon) => fetchPokemonDetails(p.name)
        );

        const pokemonDetails = await Promise.all(pokemonDetailsPromises);

        const pokemonsWithDetails = listPokemons.map(
          (pokemon: IndexedPokemon, index: string | number) => ({
            ...pokemon,
            height: pokemonDetails[index].height,
            weight: pokemonDetails[index].weight,
            type: pokemonDetails[index].types.map(
              (type: any) => type.type.name
            ),
          })
        );

        setPokemons([...pokemons, ...pokemonsWithDetails]);
        setNextUrl(result.data.next);
      }
    }
  };

  // const handlePokemonClick = (pokemon: ListPokemon) => {
  //   addSelectedPokemon(pokemon);
    
  // };

  // Filter pokemons based on search query
  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    pokemons: filteredPokemons,
    fetchNextPage: fetchPokemon,
    hasMorePokemon: !!nextUrl,
    pokemonTypes: POKEMON_TYPES,
    selectedType,
    setSelectedType,
    setPokemons,
    isLoading,
    setSearchQuery,
    // handlePokemonClick,
    // usePokemons
  };
};

export default usePokemons;
