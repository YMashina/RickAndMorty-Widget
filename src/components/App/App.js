import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import Filters from "../Filters/Filters";
import CharactersList from "../CharactersList/CharactersList";
import DetailsPopup from "../DetailsPopup/DetailsPopup";
import { Pagination } from "@mui/material";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "../../redux/actions/asyncActions";
import { createFilterRequest } from "./constants";

const App = () => {
  const dispatch = useDispatch();

  const { numPages, characters } = useSelector(
    (state) => state.displayCharacters
  );

  const error = useSelector((state) => state.error);
  const isLoading = useSelector((state) => state.displayCharacters.isLoading);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCharacters(currentPage, createFilterRequest()));
  }, [currentPage]);

  const handlePaginationChange = (e, page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.widget}>
      <DetailsPopup />
      <Filters />
      {error.exists ? <Error message={error.message} /> : null}
      {isLoading ? <Spinner /> : <CharactersList characters={characters} />}

      {characters.length !== 0 && numPages && !isLoading ? (
        <Pagination
          className={styles.pagination}
          page={currentPage}
          count={numPages}
          size="small"
          onChange={handlePaginationChange}
        />
      ) : null}
    </div>
  );
};

export default App;
