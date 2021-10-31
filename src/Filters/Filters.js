import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Filters.module.scss";
import {
  ButtonToolbar,
  FormInput,
  FormSelect,
  InputGroup,
  Button,
  Collapse,
  InputGroupAddon,
} from "shards-react";
import { Context } from "../context";
import FiltersList from "../FiltersList/FiltersList";

const Filters = () => {
  const [isCollapseOpen, setIsCollapseOpen] = useState(false);
  const nameRef = useRef();
  const statusRef = useRef();
  const genderRef = useRef();
  const speciesRef = useRef();
  const typeRef = useRef();
  const collapseBoxRef = useRef();
  const collapseButtonRef = useRef();

  const { setFilter, filter } = useContext(Context);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        isCollapseOpen &&
        collapseBoxRef.current &&
        !collapseBoxRef.current.contains(e.target) &&
        e.target !== collapseButtonRef.current
      ) {
        setIsCollapseOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
  });

  const applyFilters = (nameSearch = false) => {
    const filters = { ...filter };
    if (!nameSearch) {
      if (statusRef.current.value === "noMatter") filters.status = null;
      else filters.status = statusRef.current.value;
      if (genderRef.current.value === "noMatter") filters.gender = null;
      else filters.gender = genderRef.current.value;
      filters.species = speciesRef.current.value;
      filters.type = typeRef.current.value;
    }
    filters.name = nameRef.current.value;

    setFilter(filters);
    return filters;
  };

  const handleKeyPress = (event, nameSearch = false) => {
    if (event.key === "Enter") {
      applyFilters(nameSearch);
    }
  };

  return (
    <div className={styles.searchBar}>
      <ButtonToolbar className={"mb-2"}>
        <InputGroup size="sm" className={styles.searchBarAdaptive}>
          <FormInput
            size="sm"
            placeholder="Search by name..."
            className={styles.inputFont}
            innerRef={nameRef}
            onKeyPress={(e) => handleKeyPress(e, true)}
          />
          <InputGroupAddon type={"append"}>
            <Button
              theme="secondary"
              size={"sm"}
              onClick={() => applyFilters(true)}
            >
              Search
            </Button>
          </InputGroupAddon>
        </InputGroup>

        <FiltersList />

        <Button
          className={styles.moreFiltersButton}
          outline
          theme="secondary"
          size={"sm"}
          innerRef={collapseButtonRef}
          onClick={() => setIsCollapseOpen(!isCollapseOpen)}
        >
          More filters
        </Button>
      </ButtonToolbar>

      <div className={styles.filterCollapse}>
        <Collapse open={isCollapseOpen} innerRef={collapseBoxRef}>
          <div
            className={styles.collapse}
            onKeyPress={(e) => handleKeyPress(e)}
          >
            <div>
              <div>Status:</div>
              <FormSelect
                size="sm"
                className="mb-2"
                style={{ width: "10rem" }}
                innerRef={statusRef}
              >
                <option value="noMatter">-</option>
                <option value="alive">Alive</option>
                <option value="dead">Dead</option>
                <option value="unknown">Unknown</option>
              </FormSelect>
            </div>
            <div>
              <div>Gender:</div>
              <FormSelect
                size="sm"
                className="mb-2"
                style={{ width: "10rem" }}
                innerRef={genderRef}
              >
                <option value="noMatter">-</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="genderless">Genderless</option>
                <option value="unknown">unknown</option>
              </FormSelect>
            </div>
            <div>Species:</div>
            <InputGroup size="sm" className="mb-2">
              <FormInput placeholder="Species" innerRef={speciesRef} />
            </InputGroup>
            <div>Type:</div>
            <InputGroup size="sm" className="mb-2">
              <FormInput placeholder="Type" innerRef={typeRef} />
            </InputGroup>
            <Button outline size={"sm"} onClick={() => applyFilters()}>
              Apply
            </Button>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default Filters;
