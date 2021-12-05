/**
 * @file AddDialogPost.js
 * Projekt: Implementace webové aplikace Team manager.
 * @author Jakub Rozek
 * @brief Dialog for adding an a post.
 */

import React from "react";
import { useState } from "react";
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

import DialogTitle from "@mui/material/DialogTitle";

const useStyles = makeStyles({
  postText: {
    marginBottom: "5px",
  },
  categories: {
    marginTop: "5px",
  },
});

function AddDialog({ open, handleClose, url, id, fetchData }) {
  const classes = useStyles();
  const [category, setCategory] = useState("cat1");
  let value;
  //reflect the selected category
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errTitle, setErrTitle] = useState(false);
  const [errBody, setErrBody] = useState(false);
  const handleSubmit = (e) => {
    //Check if the fields were filled in
    e.preventDefault();
    setErrTitle(false);
    setErrBody(false);

    if (body === "") {
      setErrBody(true);
    }
    if (title === "") {
      setErrTitle(true);
    }

    if (title === "" || body === "") {
      return;
    }
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: id,
        title: title,
        body: body,
        category: category,
        token: localStorage.getItem("token"),
      }),
    })
      .then(fetchData())
      .then(handleClose());
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nový příspěvek</DialogTitle>
        <DialogContent>
          <div className={classes.postText}>
            <TextField
              onChange={(e) => setTitle(e.target.value)}
              error={errTitle}
              autoFocus
              required
              margin="dense"
              id="title"
              label="Titulek"
              type="text"
              fullWidth
              variant="outlined"
            />
          </div>
          <TextField
            onChange={(e) => setBody(e.target.value)}
            error={errBody}
            required
            size="large"
            rows={6}
            id="title"
            multiline
            label={"Text příspěvku"}
            type="text"
            fullWidth
            variant="outlined"
          ></TextField>
          <FormControl className={classes.categories} component="fieldset">
            <FormLabel component="legend">Kategorie</FormLabel>
            <RadioGroup
              row
              defaultValue="cat1"
              aria-label="Kategorie"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="cat1"
                control={<Radio />}
                label="Tréninky"
              />
              <FormControlLabel
                value="cat2"
                control={<Radio />}
                label="Turnaje"
              />
              <FormControlLabel
                value="cat3"
                control={<Radio />}
                label="Hospoda"
              />
              <FormControlLabel
                value="cat4"
                control={<Radio />}
                label="Organizace"
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
