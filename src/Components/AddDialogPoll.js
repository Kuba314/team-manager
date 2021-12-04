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
  firstans: {
    marginTop: "5px",
  },
});

function AddDialog({ open, handleClose, options, votes }) {
  let dateCreated = dateCreator();
  let author = "Charlie";
  const classes = useStyles();
  let value;
  const [title, setTitle] = useState("");
  const [answ1, setAnsw1] = useState("");
  const [answ2, setAnsw2] = useState("");
  const handleSend = () => {
    handleSubmit();
    fetch("http://localhost:3000/addPoll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: title,
        options: answers,
        token: localStorage.getItem("token"),
      }),
    }).then(handleClose());
  };
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
    console.log(formValues);
    for (const value of formValues) {
      answers.push(value.answer);
    }
    alert(answers);
    //alert(JSON.stringify(formValues[0]));
  };
  let answers = [answ1, answ2];
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
          <div className={classes.firstans}>
            <TextField
              onChange={(e) => setAnsw1(e.target.value)}
              className={classes.postText}
              size="large"
              rows={1}
              id="title"
              multiline
              label="Odpověď 1"
              type="text"
              variant="outlined"
            ></TextField>
            <TextField
              onChange={(e) => setAnsw2(e.target.value)}
              className={classes.postText}
              size="large"
              rows={1}
              id="title"
              multiline
              label="Odpověď 2"
              type="text"
              variant="outlined"
            ></TextField>
          </div>
          {formValues.map((element, index) => (
            <div className="form-inline" key={index}>
              <TextField
                type="text"
                name="answer"
                label="Odpověď"
                margin="dense"
                value={element.answer || ""}
                onChange={(e) => handleChange(index, e)}
              />
              {index ? (
                <Button
                  type="button"
                  className="button remove"
                  onClick={() => removeFormFields(index)}
                >
                  Odstranit možnost
                </Button>
              ) : null}
            </div>
          ))}
          <div className="button-section">
            <Button onClick={() => addFormFields()}>Přidat možnost</Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            size="large"
            onClick={() => {
              setFormValues([]);
              handleClose();
            }}
          >
            Zrušit
          </Button>
          <Button size="large" onClick={handleSend}>
            Přidat
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddDialog;
