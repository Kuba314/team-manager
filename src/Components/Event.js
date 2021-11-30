import React from "react";
import { useState } from "react";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Typography,
  Avatar,
  Collapse,
  Grid,
} from "@mui/material";
import AttendanceAvatar from "./AttendanceAvatar";

function Event({ event }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      <Card align="center">
        <CardHeader
          title={event.title}
          avatar={<Avatar>{event.author[0]}</Avatar>}
          subheader={event.category}
        />

        <CardContent>
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <PlaceIcon />
              </ListItemIcon>
              <ListItemText primary="Místo" secondary="Hřiště za parkem" />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <AccessTimeIcon />
              </ListItemIcon>
              <ListItemText primary="Čas" secondary="30. 11. 2021 14:16:55" />
            </ListItem>
          </List>
        </CardContent>
        <CardActions>
          <Button size="large" expand={expanded} onClick={handleExpandClick}>
            Kdo přijde
          </Button>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Grid container spacing={1.5}>
            <Grid item xs={3}>
              <AttendanceAvatar></AttendanceAvatar>
            </Grid>
            <Grid item xs={3}>
              <AttendanceAvatar></AttendanceAvatar>
            </Grid>
            <Grid item xs={3}>
              <AttendanceAvatar></AttendanceAvatar>
            </Grid>
            <Grid item xs={3}>
              <AttendanceAvatar></AttendanceAvatar>
            </Grid>

            <Grid item xs={3}>
              <AttendanceAvatar></AttendanceAvatar>
            </Grid>
            <Grid item xs={3}>
              <AttendanceAvatar></AttendanceAvatar>
            </Grid>
          </Grid>
        </Collapse>
      </Card>
    </div>
  );
}

export default Event;
