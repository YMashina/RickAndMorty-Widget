import React, { useCallback, useEffect, useState } from "react";
import styles from "./App.module.scss";
import Filters from "../Filters/Filters";
import CharactersList from "../CharactersList/CharactersList";
import DetailsPopup from "../DetailsPopup/DetailsPopup";
import axios from "axios";
import { Context } from "../context";
import { Pagination } from "@mui/material";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailsId, setDetailsId] = useState(null);
  const [displayCharacters, setDisplayCharacters] = useState([]);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setIsError] = useState({ exists: false, message: "" });
  const [filter, setFilter] = useState({
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
  });

  const getAllCharacters = useCallback(
    async (page) => {
      axios
        .get(
          `https://rickandmortyapi.com/api/character?page=${page}${createFilterRequest()}`
        )
        .then((res) => {
          setDisplayCharacters(res.data.results);
          setNumPages(res.data.info.pages);
          if (res.data.results.length === 0)
            setIsError({ exists: true, message: "Nothing found" });
          else {
            setIsError({ exists: false, message: "" });
          }
        })
        .catch((e) => {
          if (e.response.status === 404) {
            setDisplayCharacters([]);
            setIsError({ exists: true, message: "Nothing found" });
          } else {
            setIsError({ exists: true, message: e.response.message });
          }
        });
    },
    [currentPage, filter]
  );

  const createFilterRequest = () => {
    let filterRequest = "";
    if (filter.name) filterRequest += `&name=${filter.name}`;
    if (filter.status) filterRequest += `&status=${filter.status}`;
    if (filter.species) filterRequest += `&species=${filter.species}`;
    if (filter.type) filterRequest += `&type=${filter.type}`;
    if (filter.gender) filterRequest += `&gender=${filter.gender}`;
    return filterRequest;
  };

  useEffect(async () => {
    setIsLoading(true);
    await getAllCharacters(currentPage);
    setIsLoading(false);
  }, [currentPage, filter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Context.Provider
      value={{ toggleModal, isModalOpen, setDetailsId, setFilter, filter }}
    >
      <div className={styles.widget}>
        <DetailsPopup id={detailsId} />
        <Filters />
        {error.exists ? <Error message={error.message} /> : null}
        {isLoading ? (
          <Spinner />
        ) : (
          <CharactersList characters={displayCharacters} />
        )}

        {displayCharacters.length !== 0 ? (
          <Pagination
            className={styles.pagination}
            page={currentPage}
            count={numPages}
            size="small"
            onChange={(e, page) => {
              setCurrentPage(page);
            }}
          />
        ) : null}
      </div>
    </Context.Provider>
  );
}

export default App;
