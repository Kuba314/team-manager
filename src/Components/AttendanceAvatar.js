import { Avatar, Typography } from "@mui/material";
import React from "react";

function AttendanceAvatar({ user }) {
  return (
    <div>
      <Avatar>{user.name[0]}</Avatar>
      <Typography>{user.name}</Typography>
    </div>
  );
}

export default AttendanceAvatar;
