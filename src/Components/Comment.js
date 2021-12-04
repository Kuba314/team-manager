import { Paper, Typography, Avatar, IconButton } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import AddDialogComment from "./AddDialogComment";

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: "#404040",
    marginTop: "10px",
    display: "inline-block",
    padding: "2px 10px",
  },
  avatar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  content: {
    marginLeft: "10px",
    display: "flex",
    flexDirection: "column",
  },
  dltBtn: {
    marginLeft: "5px",
    borderRadius: "0px",
  },
});

function Comment({ comment, fetchData }) {
  const classes = useStyles();
  return (
    <div align="left">
      <Paper
        className={classes.wrapper}
        style={{ backgroundColor: "#404040" }}
        variant="outlined"
      >
        <div className={classes.avatar}>
          <div>
            <Avatar>{comment.author.name[0]}</Avatar>
          </div>
          <div className={classes.content}>
            <Typography variant="h6" fontWeight="bold">
              {comment.author.name}
            </Typography>
            <Typography color="#EFEFEF">{comment.text}</Typography>
          </div>
          <IconButton
            className={classes.dltBtn}
            onClick={() => {
              fetch("http://localhost:3000/deletecomment", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                  comment_id: comment._id,
                  token: localStorage.getItem("token"),
                }),
              }).then(fetchData());
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </Paper>
    </div>
  );
}

export default Comment;
