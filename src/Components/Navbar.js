import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar color="primary" position="static">
      <Toolbar>
        <Button
          color="secondary"
          variant="contained"
          component={Link}
          to={"/attendance"}
        >
          Docházka
        </Button>
        <Button
          color="secondary"
          variant="contained"
          component={Link}
          to={"/discussion"}
        >
          Diskuze
        </Button>
        <Button>Three</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
