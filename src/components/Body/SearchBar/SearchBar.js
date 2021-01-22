import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";

// styled-components
const useStyles = makeStyles((theme) => ({
  searchbar: {
    margin: "0 auto",
    paddingBottom: "16px",
  },
}));

function SearchBox({ searchCallback }) {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");

  const searchArticles = (searchQuery) => {
    if (searchQuery) {

      // callback (Anti-Pattern)
      searchCallback({
        type: "search",
        payload: searchQuery,
      });
    }
  };

  return (
    <div className={classes.searchbar}>
      <SearchBar
        onChange={(newValue) => setSearchValue(newValue)}
        onRequestSearch={() => searchArticles(searchValue)}
        placeholder="Search for news articles..."
        autoFocus
      />
    </div>
  );
}

export default SearchBox;
