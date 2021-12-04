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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    fetchData();
    setOpen(false);
  };

  const handleDelete = (id) => {
    fetch("http://localhost:3000/deletepoll", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        poll_id: id,
        token: localStorage.getItem("token"),
      }),
    });
    const newPolls = polls.filter((poll) => id != poll._id);
    setPolls(newPolls);
  };

  const [polls, setPolls] = useState([]);
  const fetchData = () => {
    fetch("http://localhost:3000/polls")
      .then((res) => res.json())
      .then((data) => setPolls(data));
  };
  useEffect(fetchData, []);

  //useInterval(fetchData, 5000);

  const [selectedCategory, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        {/*Container for posts*/}
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
