import { Avatar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  wrapper: {
    marginLeft: "7px",
    marginBottom: "7px",
  },
});
function AttendanceAvatar({ user }) {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Avatar>{user.name[0]}</Avatar>
      <Typography>{user.name}</Typography>
    </div>
  );
}

export default AttendanceAvatar;
