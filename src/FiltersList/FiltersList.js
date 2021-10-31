import React, { useContext } from "react";
import styles from "./FiltersList.module.scss";
import { Button } from "shards-react";
import { Context } from "../context";

const FiltersList = () => {
  const { filter, setFilter } = useContext(Context);

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
                  setFilter(filterCopy);
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
