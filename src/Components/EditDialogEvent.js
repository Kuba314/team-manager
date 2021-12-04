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
import DatePicker from "@mui/lab/DatePicker";
import TimePicker from "@mui/lab/TimePicker";
import dateCreator from "../Helpers/dateCreator";

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

function EditDialogEvent({
  open,
  handleClose,
  eventCategory,
  event,
  fetchData,
}) {
  const [dateValue, setDateValue] = React.useState(new Date());
  const [timeValue, setTimeValue] = React.useState(new Date());
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
    fetch("http://localhost:3000/editevent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_id: event._id,
        title: event.title,
        body: event.body,
        time: timeValue,
        location: event.location,
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
            defaultValue={event.body}
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
                setDateValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
              label="Datum"
              value={timeValue}
              onChange={(newValue) => {
                setTimeValue(newValue);
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
                value="tournament"
                control={<Radio />}
                label="Trénink"
              />
              <FormControlLabel
                value="practice"
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
