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

  const [posts, setPosts] = useState([]);
  const fetchData = () => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  };
  useEffect(fetchData, []);

  useInterval(fetchData, 5000);

  const [selectedCategory, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDelete = async (id) => {
    await fetch("http://localhost:3000/posts/" + id, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    });
    const newPosts = posts.filter((post) => post.id !== id);
    setPosts(newPosts);
  };

  return (
    <div>
      <AddDialogPoll open={open} handleClose={handleClose} />
      <div className={classes.addButton}>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Přidat anketu
        </Button>
      </div>
      <div className={classes.cont}>
        {/*Container for posts*/}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Poll></Poll>
          </Grid>
          <Grid item xs={12}>
            <Poll></Poll>
          </Grid>
          <Grid item xs={12}>
            <Poll></Poll>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default PollPage;
