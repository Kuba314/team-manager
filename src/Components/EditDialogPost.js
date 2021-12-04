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
    paddingTop: "10px",
  },
  categories: {
    marginTop: "5px",
  },
});

function EditDialogPost({ open, handleClose, url, post, fetchData }) {
  const classes = useStyles();
  const [category, setCategory] = useState(post.category);
  let value;
  //Set categories based on selected radio button
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  //Hooks for validation
  const [errTitle, setErrTitle] = useState(false);
  const [errBody, setErrBody] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrTitle(false);
    setErrBody(false);
    //Check whether one of the fields is empty
    if (body === "") {
      setErrBody(true);
    }
    if (title === "") {
      setErrTitle(true);
    }

    if (title === "" || body === "") {
      return;
    }
    //make a request to edit the post
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post_id: post._id,
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
        <DialogTitle>Změna příspěvku</DialogTitle>
        <DialogContent>
          {/*Text field for title*/}
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            error={errTitle}
            autoFocus
            required
            defaultValue={post.title}
            margin="dense"
            id="title"
            label="Titulek"
            type="text"
            fullWidth
            variant="outlined"
          />
          {/*Text field for title*/}
          <TextField
            onChange={(e) => setBody(e.target.value)}
            error={errBody}
            required
            defaultValue={post.body}
            className={classes.postText}
            size="large"
            rows={6}
            id="title"
            multiline
            label={"Text příspěvku"}
            type="text"
            fullWidth
            variant="outlined"
          ></TextField>
          {/*Radio button group for selecting a category*/}
          <FormControl className={classes.categories} component="fieldset">
            <FormLabel component="legend">Kategorie</FormLabel>
            <RadioGroup
              row
              defaultValue={post.category}
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
        {/*Buttons for closing the dialog and submiting it*/}
        <DialogActions>
          <Button size="large" onClick={handleClose}>
            Zrušit
          </Button>
          <Button size="large" onClick={handleSubmit}>
            Potvrdit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditDialogPost;
