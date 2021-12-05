/**
 * @file EditDialogEvent.js
 * Projekt: Implementace webové aplikace Team manager.
 * @author Jakub Kozubek
 * @brief Dialog for editing an event.
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

function EditDialogEvent({ open, handleClose, event, fetchData }) {
  const [dateValue, setDateValue] = React.useState(new Date());
  const [timeValue, setTimeValue] = React.useState(new Date());
  const [datetimeValue, setDateTimeValue] = React.useState(event.time);
  const classes = useStyles();
  const [category, setCategory] = useState(event.body);
  let value;
  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const [title, setTitle] = useState(event.title);
  const [body, setBody] = useState(event.location);

  const handleSubmit = () => {
    fetch("http://localhost:3000/editevent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_id: event._id,
        title: title,
        body: category,
        time: timeValue,
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
        <DialogTitle>Změnit příspěvek</DialogTitle>
        <DialogContent className={classes.wrapper}>
          <div className={classes.postText}>
            <TextField
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              defaultValue={event.title}
              margin="dense"
              id="title"
              label="Popis"
              type="text"
              fullWidth
              variant="outlined"
            />
          </div>
          <TextField
            onChange={(e) => setBody(e.target.value)}
            className={classes.postText}
            defaultValue={event.location}
            size="large"
            rows={2}
            id="title"
            multiline
            label="Místo"
            type="text"
            fullWidth
            variant="outlined"
          ></TextField>
          <div className={classes.bottomtexts}>
            <DatePicker
              label="Čas"
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
              label="Datum"
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
              defaultValue={event.body}
              aria-label="Kategorie"
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

export default EditDialogEvent;
