import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";

import NewsCard from "./NewsCard/NewsCard";
import SearchBar from "./SearchBar/SearchBar";
import FilterPanel from "./FilterPanel/FilterPanel";

// styled-components
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "10px",
  },
  body: {
    position: "absolute",
    left: 0,
    right: 0,
    marginTop: "3em",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "70%",
    backgroundColor: "#989898",
  },
  progress: {
    margin: "auto",
    maxWidth: "72%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
    maxWidth: "100%",
  },
  btmMargin: {
    marginTop: "3em",
  },
}));

function Body() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getArticles();
  }, [query, country, category]);

  // Get Articles (API)
  const getArticles = async () => {
    setIsLoading(true);

    let url = `http://localhost:8080/top-headlines?`;

    if (query) {
      url += `&q=${query}`;
    }

    if (country) {
      url += `&country=${country}`;
    }

    if (category) {
      url += `&category=${category}`;
    }

    if (!query && !country && !category) {
      url += `&country=us`;
    }

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
    } else {
      setIsLoading(false);
    }
  };

  // callback action (Anti-Pattern)
  const searchCallback = (data) => {
    switch (data.type) {
      case "search":
        setQuery(data.payload);
        break;
      case "country":
        setCountry(data.payload);
        break;
      case "category":
        setCategory(data.payload);
        break;
      default:
        break;
    }
  };

  return (
    <div className={classes.body}>
      <Box component="div">
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <SearchBar searchCallback={(val) => searchCallback(val)} />
            <FilterPanel searchCallback={(val) => searchCallback(val)} />
          </Paper>
          {isLoading && <LinearProgress className={classes.progress} />}
        </div>

        {data &&
          data.length > 0 &&
          data.map((article, i) => {
            return <NewsCard key={i} data={article} />;
          })}
      </Box>
      <div className={classes.btmMargin}></div>
    </div>
  );
}

export default Body;
