import React from "react";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  addComponent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1%",
  },
});

function LoginPage({ setLogged, logged }) {
  const navigate = useNavigate();
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
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
      <div className={classes.addComponent}>
        <TextField
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
