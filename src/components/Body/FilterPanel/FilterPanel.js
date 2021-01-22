import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";

// styled-components
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    backgroundColor: "#fdfcfc",
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
}));

function FilterPanel({ searchCallback }) {
  const classes = useStyles();

  const [country, setCountry] = useState("");
  const [category, setCategory] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCountryList();
    getCategoryList();
  }, []);

  // Get Country List (API)
  const getCountryList = async () => {
    let url = `http://localhost:8080/getCountryList`;
    const result = await axios.get(url);

    if (result && result.data && result.data.length > 0) {
      setCountryList(result.data);
    }
  };

   // Get Category List (API)
  const getCategoryList = async () => {
    let url = `http://localhost:8080/getCategoryList`;
    const result = await axios.get(url);

    if (result && result.data && result.data.length > 0) {
      setCategoryList(result.data);
    }
  };

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);

    // callback (Anti-Pattern)
    searchCallback({
      type: "country",
      payload: event.target.value,
    });
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);

    // callback (Anti-Pattern)
    searchCallback({
      type: "category",
      payload: event.target.value,
    });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id="country-label">Country</InputLabel>
              <Select
                labelId="country-label"
                id="country-dropdown"
                value={country}
                onChange={handleChangeCountry}
              >
                {countryList.map((val) => (
                  <MenuItem key={val.code} value={val.code}>
                    {val.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category-dropdown"
                value={category}
                onChange={handleChangeCategory}
              >
                {categoryList.map((value) => (
                  <MenuItem key={value} value={value}>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default FilterPanel;
