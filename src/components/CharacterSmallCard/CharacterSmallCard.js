import React from "react";
import styles from "./CharacterSmallCard.module.scss";
import { Card, CardBody, CardImg, CardTitle } from "shards-react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCharacterDataAction,
  setIsModalOpenAction,
} from "../../redux/actions/actions";
import { fetchCharacter } from "../../redux/actions/asyncActions";

const CharacterSmallCard = ({
  id,
  name,
  image,
  status,
  gender,
  species,
  type,
}) => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.isModalOpen);

  const clickCard = () => {
    dispatch(setIsModalOpenAction(!isModalOpen));
    dispatch(fetchCharacter(id));
  };

  return (
    <Card className={styles.smallCard} onClick={clickCard}>
      <CardImg top src={image} />
      <CardBody>
        <CardTitle>{name}</CardTitle>
        <div>Species: {species}</div>
        <div>Gender: {gender}</div>
        <div>Status: {status}</div>
        {type.length ? <div>Type: {type}</div> : null}
      </CardBody>
    </Card>
  );
};

export default CharacterSmallCard;
