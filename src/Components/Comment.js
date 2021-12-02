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

function Comment({ comment }) {
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
            <Avatar>A</Avatar>
          </div>
          <div className={classes.content}>
            <Typography variant="h6" fontWeight="bold">
              Author
            </Typography>
            <Typography color="#EFEFEF">{comment.body}</Typography>
          </div>
          <IconButton className={classes.dltBtn}>
            <DeleteIcon />
          </IconButton>
        </div>
      </Paper>
    </div>
  );
}

export default Comment;
