import React from "react";
import { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";
import Event from "../Components/Event";
import { makeStyles } from "@mui/styles";
import EventCategories from "../Components/EventCategories";
import AddDialogEvent from "../Components/AddDialogEvent";

const useStyles = makeStyles({
  tabBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  cont: {
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "1%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1%",
    marginBottom: "5px",
  },
});

function AttendancePage() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    //fetchData();
    setOpen(false);
  };
  const [events, setEvents] = useState([]); //Fetches the eventss, temporarily from fakeDB
  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);
  const [selectedCategory, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let categories = {
    0: "tournament",
    1: "practice",
    2: "cat3",
    3: "cat4",
  };
  return (
    <div>
      <AddDialogEvent open={open} handleClose={handleClose} />
      <div className={classes.addButton}>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Přidat příspěvek
        </Button>
      </div>
      <EventCategories
        handleChange={handleChange}
        setValue={setValue}
        selectedCategory={selectedCategory}
      ></EventCategories>
      <div className={classes.cont}>
        <Grid container spacing={3}>
          {/*Filters eventss based on category, then creates a events component from them*/}
          {events
            .filter((event) => event.category === categories[selectedCategory])
            .map((event) => (
              <Grid item key={event.id} xs={12} md={6} lg={4}>
                <Event event={event}></Event>
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
}

export default AttendancePage;
