import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
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
        <Typography>Logged in as </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
