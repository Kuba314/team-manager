import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import dateCreator from "../Helpers/dateCreator";

import DialogTitle from "@mui/material/DialogTitle";

const useStyles = makeStyles({
  postText: {
    marginTop: "5px",
  },
  categories: {
    marginTop: "5px",
  },
});

function AddDialog({ open, handleClose, options, votes }) {
  let dateCreated = dateCreator();
  let author = "Charlie";
  const classes = useStyles();
  let value;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  /*
  const addAnswer = () => {
      fetch("http://localhost:3000/posts", {

      }
      )
  }*/
  const handleSubmit = () => {
    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        title,
        body,
        author,
        dateCreated,
      }),
    }).then(handleClose());
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nová anketa</DialogTitle>
        <DialogContent className={classes.wrapper}>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            size="large"
            margin="dense"
            rows={2}
            id="title"
            label="Anketní otázka"
            type="text"
            fullWidth
            variant="outlined"
          />
        <TextField
            onChange={(e) => setBody(e.target.value)}
            className={classes.postText}
            size="large"
            rows={1}
            id="title"
            multiline
            label="Odpověď1"
            type="text"
            variant="outlined"
          ></TextField>
           <TextField
            onChange={(e) => setBody(e.target.value)}
            className={classes.postText}
            size="large"
            rows={1}
            id="title"
            multiline
            label="Odpověď2"
            type="text"
            variant="outlined"
          ></TextField>
        
        </DialogContent>
        <DialogActions>
        <Button size="large" onClick={/*addAnswer*/handleSubmit}>
            Přidat odpověd
          </Button>
          <Button size="large" onClick={handleClose}>
            Zrušit anketu
          </Button>
          <Button size="large" onClick={handleSubmit}>
            Zveřejnit anketu
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddDialog;
