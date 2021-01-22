import React, { useState } from "react";
import axios from "axios";
// import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "material-ui-search-bar";
import LinearProgress from "@material-ui/core/LinearProgress";
// import Typography from "@material-ui/core/Typography";
import "./SearchBar.scss";

function SearchBox({ searchCallback }) {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const searchArticles = async (searchQuery) => {
    if (searchQuery) {
        setIsLoading(true);
      let url = `http://localhost:8080/getAllNews?q=${searchQuery}`;
      const result = await axios.get(url);

      if (
        result &&
        result.data &&
        result.data.status === "ok" &&
        result.data.articles &&
        result.data.articles.length > 0
      ) {
        setData(result.data.articles);
        setIsLoading(false);
        searchCallback(result.data.articles);
      }
      console.log("RESULTS:", result);
    }
  };

  return (
    <div className="searchbar">
      <SearchBar
        onChange={(newValue) => setSearchValue(newValue)}
        onRequestSearch={() => searchArticles(searchValue)}
        placeholder="Search for news articles..."
        autoFocus
      />
      {isLoading && <LinearProgress />}
    </div>
  );
}

export default SearchBox;
