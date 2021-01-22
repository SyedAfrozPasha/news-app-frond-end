import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import "./Header.scss";

const useStyles = makeStyles((theme) => ({
  appName: {
    color: "#969191",
    fontFamily: "fantasy"
  }
}));

function Header() {

  const classes = useStyles();

  return (
    <div className="header">
      <Typography variant="h4" align="center" className={classes.appName}>
        The News World
      </Typography>
    </div>
  );
}

export default Header;
