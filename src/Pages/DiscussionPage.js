import { Grid, Button } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import Post from "../Components/Post";
import { makeStyles } from "@mui/styles";
import AddDialogPost from "../Components/AddDialogPost";
import PostCategories from "../Components/PostCategories";
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

function DiscussionPage({ ondiscussion }) {
  const classes = useStyles(); //This enables custom css overrides

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    fetchData();
    setOpen(false);
  };

  const [posts, setPosts] = useState([]); //Fetches the posts, temporarily from fakeDB
  const fetchData = () => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  };
  useEffect(fetchData, []);

  useInterval(fetchData, 5000);
  // uses a useState hook to change categories
  const [selectedCategory, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let categories = {
    0: "cat1",
    1: "cat2",
    2: "cat3",
    3: "cat4",
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
      <AddDialogPost open={open} handleClose={handleClose} />
      {/*Just a wrapper div as component can only return one element*/}
      <div className={classes.addButton}>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Přidat příspěvek
        </Button>
      </div>
      <PostCategories
        handleChange={handleChange}
        setValue={setValue}
        selectedCategory={selectedCategory}
      />
      <div className={classes.cont}>
        {/*Container for posts*/}
        <Grid container spacing={3}>
          {/*Filters posts based on category, then creates a post component from them*/}
          {posts
            .filter((post) => post.category === categories[selectedCategory])
            .reverse()
            .map((post) => (
              <Grid item key={post.id} xs={12}>
                <Post post={post} handleDelete={handleDelete}></Post>
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
}

export default DiscussionPage;
