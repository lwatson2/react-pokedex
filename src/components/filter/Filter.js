import React, { useRef, useState, useEffect } from "react";
import "./Filter.css";
import { Checkbox, CheckboxGroup, Grid, Button} from "@chakra-ui/react"

const Filter = ({filter, showFilter, handleSearchClick}) => {
  const [filterBoxes, setFilterBoxes] = useState([]);
  const handleFilterChange = (checkboxValues = []) => {
    
    setFilterBoxes(checkboxValues)
  };
  const submitFilters = event => {
    event.preventDefault();
    const typeFilters = filterBoxes;
    filter(typeFilters);
    showFilter();
    handleSearchClick()
  };

  const handleClearFilters = () => {
    setFilterBoxes([])
    filter([]);
    showFilter();
    handleSearchClick()
  }

  const types = [
    "fire",
    "water",
    "ice",
    "dragon",
    "fighting",
    "flying",
    "grass",
    "rock",
    "ground",
    "fairy",
    "poison",
    "dark",
    "ghost",
    "electric",
    "steel",
    "bug",
    "normal",
    "psychic"
  ];
  return (
    <React.Fragment>
      <CheckboxGroup value={filterBoxes}  onChange={handleFilterChange}>
        <Grid templateColumns='repeat(2, 1fr)' gap='4px'>
        {types.map((type, i) => {
          return (
            <Checkbox 
              style={{textTransform: 'capitalize'}}
              value={type}
            >
              {type}
            </Checkbox>
            );
          })}
          </Grid>
      </CheckboxGroup>
      <div className="filter-btn-container">
        <Button colorScheme='facebook' onClick={submitFilters}>
          {" "}
          Done{" "}
        </Button>
        <Button colorScheme='facebook' onClick={handleClearFilters}>
          Clear
        </Button>
      </div>
    </React.Fragment>
  );
};

export default Filter;
