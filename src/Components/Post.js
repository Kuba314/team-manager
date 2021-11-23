import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Typography,
  Avatar,
} from "@mui/material";

function Post({ post, handleDelete }) {
  return (
    <Card align="center">
      <CardHeader
        title={post.title}
        avatar={<Avatar>{post.author[0]}</Avatar>}
        subheader={post.category}
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.body}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.dateCreated}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.timeCreated}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleDelete(post.id)}>
          Delete
        </Button>
        <Button size="small">Komentáře</Button>
      </CardActions>
    </Card>
  );
}

export default Post;
