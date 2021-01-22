import React, { useEffect, useState } from "react";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
// import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
// import Checkbox from "@material-ui/core/Checkbox";

import Paper from "@material-ui/core/Paper";
import "./FilterPanel.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "10px",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "70%",
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
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function FilterPanel({searchCallback, isFilterLoading}) {
  const classes = useStyles();

  const [country, setCountry] = useState("US");
  const [category, setCategory] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCountryList();
    getCategoryList();
  }, []);

  const getCountryList = async () => {
    let url = `http://localhost:8080/getCountryList`;
    const result = await axios.get(url);
    console.log("RESULTS-COUNTY:", result);

    if (result && result.data && result.data.length > 0) {
      setCountryList(result.data);
    }
  };

  const getCategoryList = async () => {
    let url = `http://localhost:8080/getCategoryList`;
    const result = await axios.get(url);
    console.log("RESULTS-COUNTY:", result);

    if (result && result.data && result.data.length > 0) {
      setCategoryList(result.data);
    }
  };

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
    searchCallback({
      type: "country",
      payload: event.target.value
    });
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
    searchCallback({
      type: "category",
      payload: event.target.value
    });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
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
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
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
      {isFilterLoading && <LinearProgress className={classes.progress} />}
    </div>
  );
}

export default FilterPanel;
