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

  /*const handleSubmit = () => {
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
  };*/
  const [formValues, setFormValues] = useState([]);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { answer: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    alert(JSON.stringify(formValues));
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
          {formValues.map((element, index) => (
            <div className="form-inline" key={index}>
              <TextField
                type="text"
                name="answer"
                label="Odpověď"
                value={element.answer || ""}
                onChange={(e) => handleChange(index, e)}
              />
              {index ? (
                <Button
                  type="button"
                  className="button remove"
                  onClick={() => removeFormFields(index)}
                >
                  Remove
                </Button>
              ) : null}
            </div>
          ))}
          <div className="button-section">
            <Button onClick={() => addFormFields()}>Add</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button size="large">Přidat odpověd</Button>
          <Button
            size="large"
            onClick={() => {
              setFormValues([]);
              handleClose();
            }}
          >
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
