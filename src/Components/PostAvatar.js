import React from "react";
import { Avatar, Typography } from "@mui/material";

function PostAvatar({ author }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <Avatar>{author[0]}</Avatar>
      <Typography style={{ marginLeft: "15px" }}>{author}</Typography>
    </div>
  );
}

export default PostAvatar;
