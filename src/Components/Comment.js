import { Card, Paper, CardContent, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import AddDialogComment from "./AddDialogComment";

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: "#404040",
    marginTop: "10px",
  },
});

function Comment() {
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.wrapper} variant="outlined">
        <Typography variant="h6" fontWeight="bold">
          Author
        </Typography>
        <Typography color="#EFEFEF">
          Toto je příklad komentáře k příspěvku
        </Typography>
      </Paper>
    </div>
  );
}

export default Comment;
