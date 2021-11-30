import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Typography,
  Avatar,
  Box,
  Collapse,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Comment from "./Comment";
import { useState, useEffect } from "react";
import useInterval from "../Helpers/useInterval";
import AddDialogComment from "./AddDialogComment";

const useStyles = makeStyles({
  rightAlign: {
    marginLeft: "auto",
  },
  leftAlign: {
    marginRight: "auto",
  },
});

function Post({ post, handleDelete }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [comments, setComments] = useState([]); //Fetches the posts, temporarily from fakeDB
  const fetchData = () => {
    fetch("http://localhost:3000/comments")
      .then((res) => res.json())
      .then((data) => setComments(data));
  };
  // useEffect(fetchData, []);

  //useInterval(fetchData, 5000);
  return (
    <div>
      <AddDialogComment
        postId={post.id}
        open={open}
        handleClose={handleClose}
      />
      <Card align="center">
        <CardHeader
          title={post.title}
          titleTypographyProps={{ variant: "h5" }}
          avatar={<Avatar>{post.author[0]}</Avatar>}
        />

        <CardContent>
          <Typography gutterBottom variant="paragraph" component="div">
            {post.body}
          </Typography>
        </CardContent>
        <CardActions>
          <Box className={classes.leftAlign}>
            <Button
              color="primary"
              variant="text"
              onClick={() => handleDelete(post.id)}
              size="large"
            >
              Delete
            </Button>
            <Button
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              color="primary"
              variant="text"
              size="large"
            >
              Komentáře
            </Button>
          </Box>
          <Box className={classes.rightAlign}>
            <Typography variant="body2" color="text.secondary">
              {post.dateCreated}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {post.timeCreated}
            </Typography>
          </Box>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Button variant="outlined" onClick={handleClickOpen}>
            Přidat komentář
          </Button>
          {comments
            .filter((comment) => comment.postId === post.id)
            .reverse()
            .map((comment) => (
              <Comment comment={comment}></Comment>
            ))}
        </Collapse>
      </Card>
    </div>
  );
}

export default Post;
