import React, { useEffect, useState } from "react";
import zod from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { getPhoto, getPokemons } from "../../service/api";
import MyModal from "../MyModal";

const NameSchema = zod.object({
  firstName: zod
    .string()
    .min(2)
    .max(12)
    .regex(/^[A-Za-z]+$/),
  lastName: zod
    .string()
    .min(2)
    .max(12)
    .regex(/^[A-Za-z]+$/),
});
type SelectedPokemons = (number | null)[];
const FourSelect = [1, 2, 3, 4];
export default function MainPage() {
  const [allPokemons, setAllPokemons] = useState<any[]>([]);
  const [selectedPokemons, setSelectedPokemons] = useState<SelectedPokemons>(
    []
  );
  const [pokemonPhotos, setPokemonPhotos] = useState<string[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(NameSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });
  const getData = async () => {
    try {
      const newPokemons = await getPokemons();
      setAllPokemons(newPokemons);
      console.log("newPokemons:", newPokemons);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const loadPokemonsPhoto = async (selectedIndex: number, slot: number) => {
    try {
      console.log("Selected Index", selectedIndex);
      console.log("slot", slot);
      const response = await getPhoto(selectedIndex);
      console.log("response", response);
      if (response) {
        const updatedPhotos = [...pokemonPhotos];
        updatedPhotos[slot - 1] = response;
        setPokemonPhotos(updatedPhotos);
        console.log("PokemonPhotos:", updatedPhotos);
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Error loading Pokemon photo", error);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      FourSelect.forEach((slot) => {
        const selectName = `pokemonSelect${slot}`;
        data[selectName] = selectedPokemons[slot - 1];
      });
      console.log("Form data:", data);
      console.log("Selected", selectedPokemons);
      setFormData(data);
      openModal();
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    console.log("useEffect is running");
    getData();
  }, []);

  return (
    <div>
      <div className="container mx-auto">
        <form
          action=""
          className="mx-auto flex justify-center flex-col"
          onSubmit={handleSubmit(onSubmit)}>
          <div className="input-wrapper flex space-x-2 justify-center mt-5 gap-x-8">
            <div className="first-name-wrapper flex flex-col mb-4">
              <label htmlFor="">Name</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    width="24"
                    height="24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="firstName"
                  className="w-full h-10 rounded-md border-2 border-gray-300 pl-10 pr-4 py-3 
               hover:border-violet-500 focus:border-violet-500 focus:outline-none"
                  placeholder="Enter your name..."
                  {...register("firstName")}
                />
              </div>
              {errors.firstName && (
                <p className="text-red-600 text-center text-xs">
                  Please type a valid name.
                </p>
              )}
            </div>
            <div className="last-name-wrapper flex flex-col mb-4 mx-2 mx-auto">
              <label htmlFor="">Last name</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    width="24"
                    height="24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="lastName"
                  className="w-full h-10 rounded-md border-2 border-gray-300 pl-10 pr-4 py-3 
               hover:border-violet-500 focus:border-violet-500 focus:outline-none"
                  placeholder="Enter your last name..."
                  {...register("lastName")}
                />
              </div>
              {errors.lastName && (
                <p className="text-red-600 text-center text-xs">
                  Please type a valid last name.
                </p>
              )}
            </div>
          </div>
          <div className="select-wrapper flex gap-x-12 items-center justify-center">
            {FourSelect.map((slot, index) => (
              <div key={index} className="select-wrapper__item">
                <label htmlFor={`pokemonSelect${slot}`}>
                  {`Select a Pokemon for slot ${slot}:`}
                </label>
                <div className="h-15 rounded-md border-2 pl-2 pr-4 py-3 hover:border-violet-500 focus:border-violet-500 focus:outline-none cursor-pointer">
                  <select
                    id={`pokemonSelect${slot}`}
                    className="w-full bg-white max-h48 cursor-pointer"
                    defaultValue=""
                    {...register(`pokemonSelect${slot}`, {
                      required: `Please select a Pokemon for slot ${slot}`,
                      onChange: (e) => {
                        const selectedIndex = parseInt(e.target.value, 10);
                        const updatedSelectedPokemons: SelectedPokemons = [
                          ...selectedPokemons,
                        ];
                        updatedSelectedPokemons[index] = selectedIndex;
                        setSelectedPokemons(updatedSelectedPokemons);
                        loadPokemonsPhoto(selectedIndex + 1, index + 1);
                      },
                    })}>
                    <option value="" disabled>
                      Select a Pokemon
                    </option>
                    {allPokemons.map((pokemon, index) => (
                      <option
                        key={index}
                        value={index}
                        disabled={selectedPokemons.includes(index)}>
                        {index + 1} {pokemon.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="pokemon-photo flex mx-auto w-40 h-40">
                  {pokemonPhotos[slot - 1] && (
                    <img
                      src={pokemonPhotos[slot - 1]}
                      alt={`Pokemon ${slot}`}
                      className=""
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            className="bg-violet-600 p-5 m-5 rounded mx-auto text-white font-semibold hover:bg-violet-500 disabled:opacity-75"
            type="submit"
            disabled={selectedPokemons.length !== 4}>
            Submit
          </button>
          <MyModal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            formData={formData}
            pokemonPhotos={pokemonPhotos}
          />
        </form>
      </div>
    </div>
  );
}
