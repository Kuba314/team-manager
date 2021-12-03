import React from 'react'
import {  useState } from 'react';
import {TextField, Button} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({

  addComponent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1%",
  },
});

function LoginPage({ setLogged, logged}) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
      fetch("http://localhost:3000/login", {
          method : "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
               email,
              password
          }),
      })
      .then(response => response.json())
      .then(response => {localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('email', response.user.email);
    })
    .then(setEmail(email))
    .then(setLogged(true))
      .catch((error) => {
          console.log(error)
        });;
  }

  if(logged){
    return (
      <div>Logged in {email}</div>
    )
  }
  else {
      return (
        <div>
        <div className={classes.addComponent}>
            <TextField
            InputLabelProps={{ style: { fontSize: 20 } }}
            inputProps={{ style: { fontSize: 21 } }}
            onChange = {(e) => setEmail(e.target.value)}
            id="email"
            label="Email"
            type="email"
            variant="outlined"
          ></TextField>
        </div>
          <div className={classes.addComponent}>
          <TextField
            InputLabelProps={{ style: { fontSize: 20 } }}
            inputProps={{ style: { fontSize: 21 } }}
            onChange = {(e) => setPassword(e.target.value)}
            id="password"
            label="Heslo"
            type="password"
            variant="outlined"
          ></TextField>
          </div>

          <div className={classes.addComponent}>
          <Button onClick={handleLogin}
          variant="outlined"
          >
            Přihlásit se
         </Button>
          </div>
        </div>
    )
  }
}


export default LoginPage
