import { makeStyles } from "@mui/styles";
import React from "react";
import Navbar from "./Navbar";

const useStyles = makeStyles({
  cont: {
    background: "dark",
  },
});

function Layout({ children }) {
  const classes = useStyles();
  return (
    <div>
      <Navbar />

      <div className={classes.cont}>{children}</div>
    </div>
  );
}

export default Layout;
