import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@material-ui/core/Box";
import "./Body.scss";

import NewsCard from "./NewsCard/NewsCard";
import SearchBar from "./SearchBar/SearchBar";
import FilterPanel from "./FilterPanel/FilterPanel";

function Body() {
  const [data, setData] = useState([]);

  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("us");
  const [category, setCategory] = useState("");
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isFilterLoading, setIsFilterLoading] = useState(false);

  useEffect(() => {
    getTopHeadlines();
  }, [query, country, category]);

  const getTopHeadlines = async () => {
    setIsFilterLoading(true);

    let url = `http://localhost:8080/top-headlines?&country=${country}`;

    if (query) {
      setIsSearchLoading(true);
      setIsFilterLoading(false);
      url += `&q=${query}`;
    }

    if (category) {
      url += `&category=${category}`;
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
      setIsSearchLoading(false);
      setIsFilterLoading(false);
    } else {
      setIsSearchLoading(false);
      setIsFilterLoading(false);
    }
    console.log("RESULTS:", result);
  };

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
    }
  };

  return (
    <div className="body">
      <Box component="div">
        <SearchBar
          searchCallback={(val) => searchCallback(val)}
          isSearchLoading={isSearchLoading}
        />

        <FilterPanel
          searchCallback={(val) => searchCallback(val)}
          isFilterLoading={isFilterLoading}
        />

        {data &&
          data.length > 0 &&
          data.map((article, i) => {
            return <NewsCard key={i} data={article} />;
          })}
      </Box>
      <div className="btm-margin"></div>
    </div>
  );
}

export default Body;
