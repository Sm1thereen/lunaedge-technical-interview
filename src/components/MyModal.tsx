import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const MyModal = ({
  isOpen,
  onRequestClose,
  formData,
  pokemonPhotos,
}: {
  isOpen: boolean;
  onRequestClose: () => void;
  formData: any;
  pokemonPhotos: string[];
}) => {
  if (!isOpen || !formData) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Form Data Modal">
      <h2 className="text-center font-bold text-xl">Form Data</h2>
      <div className="name-wrapper text-center">
        <p>
          First Name: <span className="font-bold ">{formData.firstName}</span>
        </p>
        <p>
          Last Name: <span className="font-bold ">{formData.lastName}</span>
        </p>
      </div>
      <div className="pokemon-wrapper flex justify-center my-10 gap-x-7">
        {pokemonPhotos.map((photo, index) => (
          <div
            key={index}
            className="border rounded-lg overflow-hidden shadow-lg hover:scale-125 cursor-pointer transition">
            <p className="p-4 font-bold">Pokemon {index + 1}</p>
            {photo && (
              <img
                src={photo}
                alt={`Pokemon ${index + 1}`}
                className="w-full h-40 object-cover"
              />
            )}
          </div>
        ))}
      </div>
      <div className="button-wrapper flex mx-auto">
        <button
          className="bg-violet-600 p-5 m-5 rounded flex justify-center mx-auto text-white font-semibold hover:bg-violet-500  transition"
          onClick={onRequestClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default MyModal;
