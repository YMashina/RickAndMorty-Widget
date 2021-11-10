import React from "react";
import styles from "./FiltersList.module.scss";
import { Button } from "shards-react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterAction } from "../../redux/actions/actions";
import { fetchCharacters } from "../../redux/actions/asyncActions";
import { createFilterRequest } from "../App/constants";

const FiltersList = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  return (
    <div className={styles.listOfFiltersApplied}>
      {Object.keys(filter).map((key) => {
        if (filter && filter[key] && filter[key].length && key !== "name") {
          return (
            <span key={key} className={styles.filtersListButton}>
              <Button
                outline
                pill
                theme="dark"
                size={"sm"}
                onClick={() => {
                  const filterCopy = { ...filter };
                  filterCopy[key] = "";
                  dispatch(setFilterAction(filterCopy));
                  dispatch(fetchCharacters(1, createFilterRequest(filterCopy)));
                }}
              >
                × {key}: {filter[key]}
              </Button>
            </span>
          );
        } else return null;
      })}
    </div>
  );
};

export default FiltersList;
