import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Copyright from "./Copyright/Copyright";

// styled-components
const useStyles = makeStyles(() => ({
  footer: {
    position: "fixed",
    right: 0,
    bottom: 0,
    left: 0,
    paddingTop: "5px",
    paddingBottom: "5px",
    backgroundColor: "#ddd",
    textAlign: "center",
    borderTop: "1px solid #989898"
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.footer}>
      <Copyright />
    </div>
  );
}

export default Footer;
