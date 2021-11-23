import React from "react";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Event from "../Components/Event";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  tabBox: {
    alignItems: "center",
    justifyContent: "center",
  },
  cont: {
    marginLeft: "10%",
    marginRight: "10%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "0.5%",
  },
});

function AttendancePage() {
  const classes = useStyles();
  const [events, setEvents] = useState([]); //Fetches the eventss, temporarily from fakeDB
  useEffect(() => {
    fetch("http://localhost:3000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);
  return (
    <div className={classes.cont}>
      <Grid container spacing={3}>
        {/*Filters eventss based on category, then creates a events component from them*/}
        {events.map((event) => (
          <Grid item key={event.id} xs={12} md={6} lg={4}>
            <Event event={event}></Event>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default AttendancePage;
