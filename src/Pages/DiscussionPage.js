import { Grid, Button } from "@mui/material";
import React from "react";
import { useEffect, useState, useRef } from "react";
import Post from "../Components/Post";
import { makeStyles } from "@mui/styles";
import AddDialog from "../Components/AddDialog";
import Categories from "../Components/Categories";

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
    marginTop: "0.5%",
  },
});
function DiscussionPage({ ondiscussion }) {
  const classes = useStyles(); //This enables custom css overrides

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    fetchData();
    setOpen(false);
  };
  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      const tick = () => {
        savedCallback.current();
      };
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
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
    await fetch("http://localhost:3000/posts/" + id, { method: "DELETE" });
    const newPosts = posts.filter((post) => post.id !== id);
    setPosts(newPosts);
  };

  return (
    <div>
      <AddDialog open={open} handleClose={handleClose} />;
      {/*Just a wrapper div as component can only return one element*/}
      <div className={classes.addButton}>
        <Button color="primary" variant="contained" onClick={handleClickOpen}>
          Přidat příspěvek
        </Button>
      </div>
      <Categories
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
