import axios from "axios";

const POKEMON_URL = "https://pokeapi.co/api/v2/";

export const getPokemons = async () => {
  try {
    const response = await axios.get(
      `${POKEMON_URL}pokemon?limit=1300&offset=0`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.results;
  } catch (error: any) {}
};

export const getPhoto = async (id: number) => {
  try {
    const response = await axios.get(`pokemon/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error", error);
  }
};
