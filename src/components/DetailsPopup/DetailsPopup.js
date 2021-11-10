import React, { useEffect } from "react";
import { CardTitle, Modal, ModalBody } from "shards-react";
import Spinner from "../Spinner/Spinner";
import styles from "./DetailsPopup.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalOpenAction } from "../../redux/actions/actions";

const DetailsPopup = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.isModalOpen);
  const character = useSelector((state) => state.characterData.data);
  const isLoading = useSelector((state) => state.characterData.isLoading);

  const toggleModal = () => {
    dispatch(setIsModalOpenAction(!isModalOpen));
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "visible";
  }, [isModalOpen]);

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
          <br />
          <CardTitle>{character.name}</CardTitle>
          <div>Species: {character.species}</div>
          <div>Gender: {character.gender}</div>
          <div>Status: {character.status}</div>
          {character.type.length ? <div>Type: {character.type}</div> : null}
          <br />
          <div>Origin: {character.origin.name}</div>
          <div>Location: {character.location.name}</div>
          <br />
          <div>Episodes:</div>
          <div>{episodesList()}</div>
        </ModalBody>
      )}
    </Modal>
  );
};

export default DetailsPopup;
