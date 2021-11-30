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

function AddDialog({ open, handleClose }) {
  let dateCreated = dateCreator();
  let author = "Charlie";
  const classes = useStyles();
  const [category, setCategory] = useState("cat1");
  let value;
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        title,
        body,
        category,
        author,
        dateCreated,
      }),
    }).then(handleClose());
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nový příspěvek</DialogTitle>
        <DialogContent className={classes.wrapper}>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            margin="dense"
            id="title"
            label="Titulek"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            onChange={(e) => setBody(e.target.value)}
            className={classes.postText}
            size="large"
            rows={6}
            id="title"
            multiline
            label="Text příspěvku"
            type="text"
            fullWidth
            variant="outlined"
          ></TextField>
          <FormControl className={classes.categories} component="fieldset">
            <FormLabel component="legend">Kategorie</FormLabel>
            <RadioGroup
              row
              aria-label="Kategorie"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="cat1"
                control={<Radio />}
                label="Category1"
              />
              <FormControlLabel
                value="cat2"
                control={<Radio />}
                label="Category2"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button size="large" onClick={handleClose}>
            Zrušit
          </Button>
          <Button size="large" onClick={handleSubmit}>
            Přidat
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddDialog;
