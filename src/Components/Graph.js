import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  cont: {
    width: "15%",
  },
});
function Graph() {
  const classes = useStyles();
  return <div className={classes.cont}></div>;
}

export default Graph;
