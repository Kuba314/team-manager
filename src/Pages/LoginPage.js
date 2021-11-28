import React from 'react'
import { useContext, useState } from 'react';
import {TextField, Button} from "@mui/material";

function LoginPage({ setLogged, logged}) {
  
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
{
  if(logged){
    return (
      <div>Logged in {email}</div>
    )
  }
  else {
      return (
        <div>
            <TextField
            InputLabelProps={{ style: { fontSize: 20 } }}
            inputProps={{ style: { fontSize: 20 } }}
            onChange = {(e) => setEmail(e.target.value)}
            id="email"
            label="Emails"
            type="email"
            variant="standard"
          ></TextField>
          <TextField
            InputLabelProps={{ style: { fontSize: 20 } }}
            inputProps={{ style: { fontSize: 20 } }}
            onChange = {(e) => setPassword(e.target.value)}
            id="password"
            label="Heslo"
            type="password"
            variant="standard"
          ></TextField>
          <Button onClick={handleLogin}>Přihlásit se</Button>
        </div>
    )
  }
}
}

export default LoginPage
