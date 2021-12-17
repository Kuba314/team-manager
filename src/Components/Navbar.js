/**
 * @file Navbar.js
 * Projekt: Implementace webové aplikace Team manager.
 * @author Jakub Kozubek
 * @brief Dialog for adding an event.
 */

import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { Link } from "react-router-dom";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  btnGroup: {
    border: 0,
  },
  btn: {
    minWidth: "120px",
  },
});
function Navbar(logged, setLogged) {
  const classes = useStyles();
  const [selected, setSelected] = React.useState(window.location.pathname);
  const handleSelected = (event, newSelected) => {
    if (newSelected !== null) {
      setSelected(newSelected);
    }
  };
  //conditionally renders the navbar based on the user being logged in or not
  if (
    localStorage.getItem("user") === null ||
    localStorage.getItem("user") === ""
  ) {
    return (
      <AppBar enableColorOnDark color="default" position="static">
        <Toolbar>
          {localStorage.getItem("username")}
          <Button
            size="large"
            edge="start"
            color="inherit"
            component={Link}
            to={"/register"}
          >
            Registrace
          </Button>
          <Button
            size="large"
            edge="start"
            color="inherit"
            component={Link}
            to={"/login"}
          >
            Přihlášení
          </Button>
        </Toolbar>
      </AppBar>
    );
  } else {
    return (
      <AppBar enableColorOnDark color="default" position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <ToggleButtonGroup
              variant="text"
              className={classes.btnGroup}
              value={selected}
              onChange={handleSelected}
              exclusive
            >
              <ToggleButton
                className={classes.btn}
                style={{ borderRadius: "4px", border: "0px" }}
                size="large"
                variant="text"
                value="/attendance"
                component={Link}
                to={"/attendance"}
              >
                Docházka
              </ToggleButton>
              <ToggleButton
                className={classes.btn}
                style={{ borderRadius: "4px", border: "0px" }}
                size="large"
                value="/discussion"
                component={Link}
                to={"/discussion"}
              >
                Diskuze
              </ToggleButton>
              <ToggleButton
                className={classes.btn}
                style={{ borderRadius: "4px", border: "0px" }}
                size="large"
                value="/poll"
                component={Link}
                to={"/poll"}
              >
                Ankety
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          <Button
            size="large"
            edge="start"
            color="inherit"
            component={Link}
            onClick={() => {
              fetch("http://localhost:3000/logout", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  token: localStorage.getItem("token"),
                }),
              })
                .then(localStorage.clear())
                .then(setLogged(false));
            }}
            to={"/login"}
          >
            Odhlášení
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
