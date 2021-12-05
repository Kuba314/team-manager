/**
 * @file PollPage.js
 * Projekt: Implementace webové aplikace Team manager.
 * @author Josef Škorpík
 * @author Jakub Kozubek
 * @brief Page for showing polls.
 */

import { Grid, Button } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import Poll from "../Components/Poll";
import { makeStyles } from "@mui/styles";
import AddDialogPoll from "../Components/AddDialogPoll";
import useInterval from "../Helpers/useInterval";

const useStyles = makeStyles({
  cont: {
    marginLeft: "10%",
    marginRight: "10%",
    marginBottom: "2%",
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

function PollPage() {
  const classes = useStyles(); //This enables custom css overrides

  const [open, setOpen] = useState(false);
  //open and close the add dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    fetchData();
    setOpen(false);
  };
  //delete a poll, re-render the page with new values
  const handleDelete = (id) => {
    fetch("http://localhost:3000/deletepoll", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        poll_id: id,
        token: localStorage.getItem("token"),
      }),
    });
    const newPolls = polls.filter((poll) => id !== poll._id);
    setPolls(newPolls);
  };
  //fetch the polls at the start, then with every change
  const [polls, setPolls] = useState([]);
  const fetchData = () => {
    fetch("http://localhost:3000/polls")
      .then((res) => res.json())
      .then((data) => setPolls(data));
  };
  useEffect(fetchData, []);

  useInterval(fetchData, 5000);

  return (
    <div>
      <AddDialogPoll
        fetchData={fetchData}
        open={open}
        handleClose={handleClose}
      />
      <div className={classes.addButton}>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Přidat anketu
        </Button>
      </div>
      <div className={classes.cont}>
        {/*Container for polls
        map every poll into a poll component*/}
        <Grid container spacing={3}>
          {polls.reverse().map((poll) => (
            <Grid item key={poll._id} xs={12}>
              <Poll
                polls={polls}
                setPolls={setPolls}
                poll={poll}
                fetchData={fetchData}
                handleDelete={handleDelete}
              ></Poll>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default PollPage;
