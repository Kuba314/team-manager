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
    marginTop: "5px",
  },
  categories: {
    marginTop: "5px",
  },
});

function AddDialogEvent({ open, handleClose }) {
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
    fetch("http://localhost:3000/addevent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        body: category,
        time: timeValue,
        location: body,
        token: localStorage.getItem("token"),
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
            rows={2}
            multiline
            label="lokace"
            type="text"
            fullWidth
            variant="outlined"
          ></TextField>

          <DatePicker
            label="Basic example"
            value={dateValue}
            onChange={(newValue) => {
              setDateValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <TimePicker
            label="Basic example"
            value={timeValue}
            onChange={(newValue) => {
              setTimeValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
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

export default AddDialogEvent;
