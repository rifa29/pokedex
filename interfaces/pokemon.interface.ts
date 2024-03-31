export interface IndexedPokemon {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IndexedPokemon[];
}

export interface IndexedPokemonByType {
  pokemon: IndexedPokemon;
  slot: string;
}

export interface PokemonByTypeListResponse {
  id: number;
  pokemon: IndexedPokemonByType[];
}

export interface ListPokemon {
  name: string;
  url: string;
  image: string;
  pokemonNumber: number;
  height: number;
  weight: number;
  type: string[];
  alias?: string;
}

export interface IndexedType {
  name: string;
  url: string;
}