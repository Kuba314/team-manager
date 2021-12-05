/**
 * @file Post.js
 * Projekt: Implementace webové aplikace Team manager.
 * @author Jakub Rozek
 * @brief Post component shown in DiscussionPage.
 */

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Typography,
  Box,
  Collapse,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Comment from "./Comment";
import { useState } from "react";
import useInterval from "../Helpers/useInterval";
import AddDialogComment from "./AddDialogComment";
import PostAvatar from "./PostAvatar";
import EditIcon from "@mui/icons-material/Edit";
import EditDialogPost from "./EditDialogPost";

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

function Post({ post, handleDelete, fetchData }) {
  const classes = useStyles();
  const [openComment, setOpenComment] = useState(false);

  const handleClickOpenComemnt = () => {
    setOpenComment(true);
  };

  const handleCloseComment = () => {
    fetchData();
    setOpenComment(false);
  };

  const [expandedComment, setExpandedComment] = React.useState(false);

  const handleExpandClick = () => {
    setExpandedComment(!expandedComment);
  };
  const [openEditComment, setEditOpenComment] = useState(false);

  const handleClickEditOpenComemnt = () => {
    setEditOpenComment(true);
  };

  const handleEditCloseComment = () => {
    fetchData();
    setEditOpenComment(false);
  };
  const convDate = () => {
    let date = new Date(post.created);
    return date.toLocaleString();
  };

  useInterval(fetchData, 5000);
  return (
    <div>
      <EditDialogPost
        fetchData={fetchData}
        open={openEditComment}
        handleClose={handleEditCloseComment}
        url={"http://localhost:3000/editpost"}
        post={post}
      />
      <AddDialogComment
        postId={post._id}
        fetchData={fetchData}
        open={openComment}
        handleClose={handleCloseComment}
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
              disabled={post.author.name !== localStorage.getItem("user")}
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
            {
              <IconButton
                disabled={post.author.name !== localStorage.getItem("user")}
                onClick={handleClickEditOpenComemnt}
              >
                <EditIcon />
              </IconButton>
            }
          </Box>
          <Box className={classes.rightAlign}>
            <Typography variant="body2" color="text.secondary">
              {convDate(post.created).slice(0, -3)}
            </Typography>
          </Box>
        </CardActions>
        <Collapse
          className={classes.collapse}
          in={expandedComment}
          timeout="auto"
          unmountOnExit
        >
          <Button variant="outlined" onClick={handleClickOpenComemnt}>
            Přidat komentář
          </Button>
          {post.comments.map((comment) => (
            <Comment
              key={comment._id}
              fetchData={fetchData}
              post={post}
              comment={comment}
            ></Comment>
          ))}
        </Collapse>
      </Card>
    </div>
  );
}

export default Post;
