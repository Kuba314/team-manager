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
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Comment from "./Comment";
import { useState, useEffect } from "react";
import useInterval from "../Helpers/useInterval";
import AddDialogComment from "./AddDialogComment";
import PostAvatar from "./PostAvatar";
import EditIcon from "@mui/icons-material/Edit";

const useStyles = makeStyles({
  rightAlign: {
    marginLeft: "auto",
  },
  leftAlign: {
    marginRight: "auto",
  },
  collapse: {
    marginBottom: "8px",
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

  //useInterval(fetchData, 5000);
  return (
    <div>
      <AddDialogComment
        postId={post._id}
        open={open}
        handleClose={handleClose}
      />
      <Card align="center">
        <CardHeader
          title={post.title}
          titleTypographyProps={{ variant: "h5" }}
          avatar={<PostAvatar author={post.author.name} />}
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
              onClick={() => handleDelete(post._id)}
              size="large"
            >
              Delete
            </Button>
            <Button
              onClick={handleExpandClick}
              aria-label="show more"
              color="primary"
              variant="text"
              size="large"
            >
              Komentáře {post.comments.length}
            </Button>
            <IconButton>
              <EditIcon />
            </IconButton>
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
        <Collapse
          className={classes.collapse}
          in={expanded}
          timeout="auto"
          unmountOnExit
        >
          <Button variant="outlined" onClick={handleClickOpen}>
            Přidat komentář
          </Button>
          {post.comments.map((comment) => (
            <Comment comment={comment}></Comment>
          ))}
        </Collapse>
      </Card>
    </div>
  );
}

export default Post;
