/**
 * @file AddDialogEvent.js
 * Projekt: Implementace webové aplikace Team manager.
 * @author Jakub Kozubek
 * @brief Dialog for adding an event.
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
import DatePicker from "@mui/lab/DatePicker";
import TimePicker from "@mui/lab/TimePicker";

import DialogTitle from "@mui/material/DialogTitle";

const useStyles = makeStyles({
  postText: {
    marginBottom: "5px",
  },
  categories: {
    marginTop: "5px",
  },
  bottomtexts: {
    marginTop: "10px",
  },
});

function AddDialogEvent({ open, handleClose, fetchData }) {
  const [dateValue, setDateValue] = React.useState(new Date());
  const [timeValue, setTimeValue] = React.useState(new Date());
  const [datetimeValue, setDateTimeValue] = React.useState(new Date());

  const classes = useStyles();
  const [category, setCategory] = useState("practice");
  let value;
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errTitle, setErrTitle] = useState(false);
  const [errBody, setErrBody] = useState(false);
  const handleSubmit = (e) => {
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
    fetch("http://localhost:3000/addevent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        body: category,
        time: datetimeValue,
        location: body,
        token: localStorage.getItem("token"),
      }),
    })
      .then(fetchData())
      .then(handleClose());
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nová událost</DialogTitle>
        <DialogContent className={classes.wrapper}>
          <div className={classes.postText}>
            <TextField
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              margin="dense"
              error={errTitle}
              id="title"
              label="Popis"
              type="text"
              fullWidth
              variant="outlined"
            />
          </div>
          <TextField
            onChange={(e) => setBody(e.target.value)}
            size="large"
            error={errBody}
            rows={2}
            multiline
            label="Místo"
            type="text"
            fullWidth
            variant="outlined"
          ></TextField>

          <div className={classes.bottomtexts}>
            <DatePicker
              className={classes.date}
              label="Datum"
              margin="dense"
              value={dateValue}
              onChange={(newValue) => {
                let datetime = new Date(
                  newValue.getFullYear(),
                  newValue.getMonth(),
                  newValue.getDate(),
                  timeValue.getHours(),
                  timeValue.getMinutes(),
                  timeValue.getSeconds()
                );
                setDateValue(newValue);
                setDateTimeValue(datetime);
              }}
              renderInput={(params) => <TextField {...params} />}
            />

            <TimePicker
              label="Čas"
              value={timeValue}
              onChange={(newValue) => {
                let datetime = new Date(
                  dateValue.getFullYear(),
                  dateValue.getMonth(),
                  dateValue.getDate(),
                  newValue.getHours(),
                  newValue.getMinutes(),
                  newValue.getSeconds()
                );
                setTimeValue(newValue);
                setDateTimeValue(datetime);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <FormControl className={classes.categories} component="fieldset">
            <FormLabel component="legend">Typ události</FormLabel>
            <RadioGroup
              row
              aria-label="Kategorie"
              defaultValue="practice"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="practice"
                control={<Radio />}
                label="Trénink"
              />
              <FormControlLabel
                value="tournament"
                control={<Radio />}
                label="Turnaj"
              />
              <FormControlLabel
                value="teambuilding"
                control={<Radio />}
                label="Teambuilding"
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

export default AddDialogEvent;
