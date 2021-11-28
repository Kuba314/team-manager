import React from 'react'
import {Button, TextField} from "@mui/material";
import {useState} from 'react'

function RegisterPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const handleRegister = () => {
        fetch("http://localhost:3000/register", {
            method : "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                 email,
                password
            }),
        })
        .then(console.log("registered succesful"))
        .catch((error) => {
            console.log(error)
          });;
    };
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
          <Button onClick={handleRegister}>Registrovat</Button>
        </div>
    )
}

export default RegisterPage
