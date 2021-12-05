/**
 * @file AttendancePage.js
 * Projekt: Implementace webové aplikace Team manager.
 * @author Jakub Kozubek
 * @brief Page for showing events.
 */

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
    fetchData();
    setOpen(false);
  };
  const [events, setEvents] = useState([]); //Fetches the eventss, temporarily from fakeDB
  const fetchData = () => {
    fetch("http://localhost:3000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  };

  const handleDelete = (id) => {
    fetch("http://localhost:3000/deleteevent", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        event_id: id,
        token: localStorage.getItem("token"),
      }),
    });
    const newEvents = events.filter((event) => id !== event._id);
    setEvents(newEvents);
  };
  useEffect(fetchData, []);
  const [selectedCategory, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let categories = {
    0: "practice",
    1: "tournament",
    2: "teambuilding",
  };
  return (
    <div>
      <AddDialogEvent
        open={open}
        handleClose={handleClose}
        fetchData={fetchData}
      />
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
            .filter((event) => event.body === categories[selectedCategory])
            .reverse()
            .map((event) => (
              <Grid item key={event._id} xs={12} md={6} lg={4}>
                <Event handleDelete={handleDelete} event={event}></Event>
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
}

export default AttendancePage;
