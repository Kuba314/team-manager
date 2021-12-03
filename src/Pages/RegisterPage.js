import React from "react";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  addComponent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1%",
  },
});

function RegisterPage() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = () => {
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
  };
  return (
    <div>
      <div className={classes.addComponent}>
        <TextField
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
          InputLabelProps={{ style: { fontSize: 20 } }}
          inputProps={{ style: { fontSize: 20 } }}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          label="Email"
          type="email"
          variant="outlined"
        ></TextField>
      </div>

      <div className={classes.addComponent}>
        <TextField
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
