import React, { useContext } from "react";
import styles from "./CharacterSmallCard.module.scss";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Col,
  Container,
  Row,
} from "shards-react";
import { Context } from "../context";

const CharacterSmallCard = ({
  id,
  name,
  image,
  status,
  gender,
  key,
  species,
  type,
}) => {
  const { toggleModal, setDetailsId } = useContext(Context);

  return (
    <Card
      className={styles.smallCard}
      onClick={() => {
        toggleModal();
        setDetailsId(id);
      }}
    >
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
