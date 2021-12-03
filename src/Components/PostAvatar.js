import React from "react";
import { Avatar, Typography } from "@mui/material";

function PostAvatar({ author }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "left" }}
    >
      <Avatar>{author[0]}</Avatar>
      <Typography style={{ marginTop: "5px", fontStyle: "italic" }}>
        {author}
      </Typography>
    </div>
  );
}

export default PostAvatar;
