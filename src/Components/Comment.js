import { Card, Paper, CardContent, Typography, Avatar } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import AddDialogComment from "./AddDialogComment";
import { Box } from "@mui/system";

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: "#404040",
    marginTop: "10px",
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
});

function Comment({ dummyText }) {
  const classes = useStyles();
  return (
    <div align="left">
      <Paper className={classes.wrapper} variant="outlined">
        <div className={classes.avatar}>
          <div>
            <Avatar>A</Avatar>
          </div>
          <div className={classes.content}>
            <Typography variant="h6" fontWeight="bold">
              Author
            </Typography>
            <Typography color="#EFEFEF">{dummyText}</Typography>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default Comment;
