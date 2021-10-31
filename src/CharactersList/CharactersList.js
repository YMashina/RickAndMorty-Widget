import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import CharacterSmallCard from "../CharacterSmallCard/CharacterSmallCard";

const CharactersList = ({ characters }) => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{
        200: 1,
        400: 2,
        600: 3,
        800: 4,
        1000: 5,
        1200: 6,
      }}
    >
      <Masonry gutter={"1rem"}>
        {characters.map(
          ({ id, name, status, species, gender, type, image }) => {
            return (
              <CharacterSmallCard
                key={id}
                id={id}
                name={name}
                image={image}
                status={status}
                species={species}
                gender={gender}
                type={type}
              />
            );
          }
        )}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default CharactersList;
