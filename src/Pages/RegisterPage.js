/**
 * @file RegisterPage.js
 * Projekt: Implementace webové aplikace Team manager.
 * @author Josef Škorpík
 * @brief Page for registration.
 */

import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  addComponent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1%",
  },
  reg: {
    marginTop: "13px",
  },
});

function RegisterPage() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [errUsername, setErrUsername] = useState(false);
  const [errPassw, setErrPassw] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = () => {
    setErrUsername(false);
    setErrPassw(false);
    //check that the fields were not empty
    if (username === "") {
      setErrUsername(true);
    }
    if (password === "") {
      setErrPassw(true);
    }

    if (username === "" || password === "") {
      return;
    }
    //creates a user in the db
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ username: username, password: password }),
    }).then(() => navigate("/login"));
  };
  return (
    <div>
      <div className={classes.reg}>
        <Typography align="center" variant="h5">
          Registrace
        </Typography>
      </div>
      <div className={classes.addComponent}>
        <TextField
          error={errUsername}
          required
          InputLabelProps={{ style: { fontSize: 20 } }}
          inputProps={{ style: { fontSize: 20 } }}
          onChange={(e) => setUsername(e.target.value)}
          id="username"
          label="Přezdívka"
          type="nickname"
          variant="outlined"
        ></TextField>
      </div>
      <div className={classes.addComponent}>
        <TextField
          error={errPassw}
          required
          InputLabelProps={{ style: { fontSize: 20 } }}
          inputProps={{ style: { fontSize: 20 } }}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          label="Heslo"
          type="password"
          variant="outlined"
        ></TextField>
      </div>
      <div className={classes.addComponent}>
        <Button onClick={handleRegister} variant="outlined">
          Registrovat
        </Button>
      </div>
    </div>
  );
}

export default RegisterPage;
