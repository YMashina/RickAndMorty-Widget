import React, { useContext, useEffect, useState } from "react";
import { CardTitle, Modal, ModalBody, ModalHeader } from "shards-react";
import { Context } from "../context";
import axios from "axios";
import Spinner from "../Spinner/Spinner";
import styles from "./DetailsPopup.module.scss";

const DetailsPopup = ({ id }) => {
  const { toggleModal, isModalOpen } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState(null);

  const getCharacterById = async () => {
    const character = await axios.get(
      `https://rickandmortyapi.com/api/character/${id}`
    );
    return character;
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "visible";
  }, [isModalOpen]);

  useEffect(async () => {
    setIsLoading(true);
    if (id) {
      const char = await getCharacterById();
      setCharacter(char.data);
      setIsLoading(false);
    }
  }, [id]);

  const episodesList = () => {
    let episodes = "";
    character.episode.forEach((episode, index, allEpisodes) => {
      episodes =
        episodes +
        episode.replace("https://rickandmortyapi.com/api/episode/", "");
      if (index < allEpisodes.length - 1) episodes = episodes + ", ";
    });
    return episodes;
  };

  return (
    <Modal
      open={isModalOpen}
      toggle={toggleModal}
      className={styles.hideScrollbar}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <ModalBody className={`${styles.scroll} ${styles.hideScrollbar}`}>
          <img src={character.image} />
          <p />
          <CardTitle>{character.name}</CardTitle>
          <div>Species: {character.species}</div>
          <div>Gender: {character.gender}</div>
          <div>Status: {character.status}</div>
          {character.type.length ? <div>Type: {character.type}</div> : null}
          <p />
          <div>Origin: {character.origin.name}</div>
          <div>Location: {character.location.name}</div>
          <p />
          <div>Episodes:</div>
          <div>{episodesList()}</div>
        </ModalBody>
      )}
    </Modal>
  );
};

export default DetailsPopup;
