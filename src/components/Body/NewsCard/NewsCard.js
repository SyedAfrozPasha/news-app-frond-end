import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "10px",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "70%",
    backgroundColor: "#ddd"
  },
  image: {
    width: "200px",
    height: "150px",
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  link: {
    "&:hover": {
      textDecoration: "none",
    },
  },
  headline: {
    fontWeight: 700
  },
}));

export default function NewsCard({ data }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Link
          className={classes.link}
          color="inherit"
          href={data.url}
          target="_blank"
          rel="noopener"
        >
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img
                  className={classes.img}
                  alt={data.title}
                  src={data.urlToImage}
                />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    className={classes.headline}
                  >
                    {data.title}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {data.description}
                  </Typography>
                </Grid>
                {data.author && (
                  <Grid item>
                    <Typography variant="caption">
                      By {data.author}
                    </Typography>
                  </Grid>
                )}
                {data.publishedAt && (
                  <Grid item>
                    <Typography variant="caption">
                      {new Date(data.publishedAt).toDateString()}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Link>
      </Paper>
    </div>
  );
}
