/**
 * @file LoginPage.js
 * Projekt: Implementace webové aplikace Team manager.
 * @author Josef Škorpík
 * @brief Page for login.
 */

import React from "react";
import { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  addComponent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1%",
  },
  log: {
    marginTop: "13px",
  },
});

function LoginPage({ setLogged, logged }) {
  const navigate = useNavigate();
  const classes = useStyles();
  const [errUsername, setErrUsername] = useState(false);
  const [errPassw, setErrPassw] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    //Check if either of the fields were empty, turn them red
    setErrUsername(false);
    setErrPassw(false);
    if (username === "") {
      setErrUsername(true);
    }
    if (password === "") {
      setErrPassw(true);
    }

    if (username === "" || password === "") {
      return;
    }
    //log in the user, get back a token, store it in localStorage, redirect the user
    //to the discussion page
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => localStorage.setItem("token", data.token))
      .then(localStorage.setItem("user", username))
      .then(setLogged(true))
      .then(() => navigate("/discussion"));
  };

  return (
    <div>
      <div className={classes.log}>
        <Typography variant="h5" align="center">
          Přihlášení
        </Typography>
      </div>
      <div className={classes.addComponent}>
        <TextField
          required
          error={errUsername}
          InputLabelProps={{ style: { fontSize: 20 } }}
          inputProps={{ style: { fontSize: 21 } }}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          label="Přihlašovací jméno"
          type="text"
          variant="outlined"
        ></TextField>
      </div>
      <div className={classes.addComponent}>
        <TextField
          required
          error={errPassw}
          InputLabelProps={{ style: { fontSize: 20 } }}
          inputProps={{ style: { fontSize: 21 } }}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          label="Heslo"
          type="password"
          variant="outlined"
        ></TextField>
      </div>
      <div className={classes.addComponent}>
        <Button onClick={handleLogin} variant="outlined">
          Přihlásit se
        </Button>
      </div>
    </div>
  );
}

export default LoginPage;
