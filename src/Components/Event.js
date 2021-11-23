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
function Event({ event }) {
  return (
    <div>
      <Card align="center">
        <CardHeader
          title={event.title}
          avatar={<Avatar>{event.author[0]}</Avatar>}
          subheader={event.category}
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {event.body}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {event.dateCreated}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Event;
