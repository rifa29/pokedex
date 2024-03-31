import React, { createContext, useContext, useState } from 'react';
import { ListPokemon } from '../interfaces/pokemon.interface';

interface SelectedPokemonsContextType {
  selectedPokemons: ListPokemon[];
  addSelectedPokemon: (pokemon: ListPokemon) => void;
  removeSelectedPokemon: (pokemonName: string) => void;
}

const SelectedPokemonsContext = createContext<SelectedPokemonsContextType | undefined>(undefined);

export const useSelectedPokemons = () => {
  const context = useContext(SelectedPokemonsContext);
  if (!context) {
    throw new Error('useSelectedPokemons must be used within a SelectedPokemonsProvider');
  }
  return context;
};

export const SelectedPokemonsProvider: React.FC = ({ children }) => {
  const [selectedPokemons, setSelectedPokemons] = useState<ListPokemon[]>([]);

  const addSelectedPokemon = (pokemon: ListPokemon) => {
    setSelectedPokemons(prevState => [...prevState, pokemon]);
  };

  const removeSelectedPokemon = (pokemonName: string) => {
    setSelectedPokemons(prevState => prevState.filter(pokemon => pokemon.name !== pokemonName));
  };

  return (
    <SelectedPokemonsContext.Provider value={{ selectedPokemons, addSelectedPokemon, removeSelectedPokemon }}>
      {children}
    </SelectedPokemonsContext.Provider>
  );
};
