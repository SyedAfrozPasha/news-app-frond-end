import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@material-ui/core/Box";
import "./Body.scss";

import NewsCard from "./NewsCard/NewsCard";
import SearchBar from "./SearchBar/SearchBar";

function Body() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getTopHeadlines();
  }, []);

  const getTopHeadlines = async (country = "in") => {
    let url = `http://localhost:8080/top-headlines?country=us`;
    const result = await axios.get(url);

    if (
      result &&
      result.data &&
      result.data.status === "ok" &&
      result.data.articles &&
      result.data.articles.length > 0
    ) {
      setData(result.data.articles);
    }
    console.log("RESULTS:", result);
  };

  const searchCallback = (newArticles) => {
    setData(newArticles);
  }

  return (
    <div className="body">
      <Box component="div">

        <SearchBar searchCallback={(val) => searchCallback(val)}/>

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
