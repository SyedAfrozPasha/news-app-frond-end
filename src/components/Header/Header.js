import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

// styled-components
const useStyles = makeStyles(() => ({
  header: {
    margin: "0 auto",
    display: "block"
  },
  appName: {
    color: "#969191",
    fontFamily: "fantasy",
  },
}));

function Header() {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <Typography variant="h4" align="center" className={classes.appName}>
        The News World
      </Typography>
    </div>
  );
}

export default Header;
