"use client";

import React, { createContext, useContext, useState } from "react";
import { ListPokemon } from "../interfaces/pokemon.interface";
import { useEffect } from "react";

interface SelectedPokemonsContextType {
  selectedPokemons: ListPokemon[];
  addSelectedPokemon: (pokemon: ListPokemon) => void;
  removeSelectedPokemon: (pokemonName: string) => void;
}

export const SelectedPokemonsContext = createContext<
  SelectedPokemonsContextType | undefined
>(undefined);

export const useSelectedPokemons = () => {
  const context = useContext(SelectedPokemonsContext);
  if (!context) {
    throw new Error(
      "useSelectedPokemons must be used within a SelectedPokemonsProvider"
    );
  }
  return context;
};

interface ISelectedPokemonProvider {
  children: React.ReactNode;
}

export const SelectedPokemonsProvider = ({ children }: ISelectedPokemonProvider) => {
  if (typeof window !== 'undefined') {
    const [selectedPokemons, setSelectedPokemons] = useState<ListPokemon[]>(
      JSON.parse(localStorage.getItem("selectedPokemon") || '[]') || []
    );

    useEffect(() => {
      localStorage.setItem("selectedPokemon", JSON.stringify(selectedPokemons));
    }, [selectedPokemons]);
    

    const addSelectedPokemon = (pokemon: ListPokemon) => {
      setSelectedPokemons((prevState) => [...prevState, pokemon]);
    };

    const removeSelectedPokemon = (pokemonName: string) => {
      setSelectedPokemons((prevState) =>
        prevState.filter((pokemon) => pokemon.name !== pokemonName)
      );
    };
    

    return (
      <SelectedPokemonsContext.Provider
        value={{ selectedPokemons, addSelectedPokemon, removeSelectedPokemon }}
      >
        {children}
      </SelectedPokemonsContext.Provider>
    );
    }
};
