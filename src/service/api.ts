import axios from "axios";

const POKEMON_URL = "https://pokeapi.co/api/v2/";

export const getPokemons = async (limit: number, offset: number) => {
  try {
    const response = await axios.get(
      `${POKEMON_URL}pokemon?limit=${limit}&offset=${offset}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.results;
  } catch (error: any) {}
};
