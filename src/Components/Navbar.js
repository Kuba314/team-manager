import React from "react";
import { AppBar, Toolbar, Button, Box  } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  return (
   
    <AppBar enableColorOnDark color="default" position="static">
      <Toolbar >
      <Box  sx={{ flexGrow: 1 }}>
        <Button
          size="large"
          edge="start"
          color="inherit"
          component={Link}
          to={"/attendance"}
        >
          Docházka
        </Button>
        <Button
          size="large"
          edge="start"
          color="inherit"
          component={Link}
          to={"/discussion"}
        >
          Diskuze
        </Button>
        <Button>Three</Button>
        </Box>
        <Button
            size="large"
            edge="start"
            color="inherit">Login</Button>
          </Toolbar>
    </AppBar>
    
  );
}

export default Navbar;
