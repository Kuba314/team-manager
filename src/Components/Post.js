import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Typography,
  Avatar,
  Box
} from "@mui/material";
import {makeStyles} from "@mui/styles"


const useStyles = makeStyles({
  rightAlign: {
    marginLeft : "auto",
  },
  leftAlign: {
    marginRight : "auto",
  }
});
function Post({ post, handleDelete }) {
  const classes = useStyles();
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
        
      </CardContent>
      <CardActions>
        <Box className={classes.leftAlign}>
        <Button color="primary" variant="text" size="small" onClick={() => handleDelete(post.id)}>
          Delete
        </Button>
        <Button color="primary" variant="text" size="small">Komentáře</Button>
        </Box>
        <Box className={classes.rightAlign}>
        <Typography variant="body2" color="text.secondary">
          {post.dateCreated}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.timeCreated}
        </Typography>
        </Box>
      </CardActions>
    </Card>
  );
}

export default Post;
