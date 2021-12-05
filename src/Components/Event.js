/**
 * @file Event.js
 * Projekt: Implementace webové aplikace Team manager.
 * @author Jakub Kozubek
 * @brief Component for event which shows on AttendancePage.
 */

import React from "react";
import { useState, useEffect } from "react";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DoneIcon from "@mui/icons-material/Done";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AttendanceAvatar from "./AttendanceAvatar";
import { makeStyles } from "@mui/styles";
import EditDialogEvent from "./EditDialogEvent";

const useStyles = makeStyles({
  comeBtn: {
    backgroundColor: "#6a8565",
    "&:hover": {
      backgroundColor: "#67cc62",
    },
  },
  leftAlign: {
    marginRight: "auto",
  },
  rightAlign: {
    marginLeft: "auto",
  },
  dltBtn: {
    display: "flex",
    alignItems: "flex-start",
  },
});

function Event({ event, handleDelete }) {
  let selgreen = "#67cc62";
  let green = "#6a8565";
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [events, setEvents] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:3000/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        func(data);
      });
  };

  useEffect(fetchData, []);

  const handleExpandClick = () => {
    help();
    setExpanded(!expanded);
  };

  const [attends, setAttends] = useState([]);

  const help = () => {
    var filtered = events.find((ldevent) => {
      return ldevent._id === event._id;
    });

    console.log(filtered.attendees);
    console.log(attends.length);
  };
  const func = (data) => {
    var filtered = data.find((ldevent) => {
      return ldevent._id === event._id;
    });
    setAttends(filtered.attendees);
    for (const attend of filtered.attendees) {
      if (attend.name === localStorage.getItem("user")) {
        setColor(selgreen);
        return;
      }
    }
  };
  const leave = (filtered) => {
    fetch("http://localhost:3000/leaveevent", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        event_id: filtered._id,
        token: localStorage.getItem("token"),
      }),
    }).then(fetchData());

    setColor(green);

    return;
  };
  const join = () => {
    var filtered = events.find((ldevent) => {
      return ldevent._id === event._id;
    });

    console.log(filtered);
    for (const attend of filtered.attendees) {
      if (attend.name === localStorage.getItem("user")) {
        leave(filtered);
        return;
      }
    }
    fetch("http://localhost:3000/joinevent", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        event_id: filtered._id,
        token: localStorage.getItem("token"),
      }),
    }).then(fetchData());
  };
  const [openEditEvent, setEditOpenEvent] = useState(false);

  const handleClickEditOpenEvent = () => {
    setEditOpenEvent(true);
  };

  const handleEditCloseEvent = () => {
    setEditOpenEvent(false);
  };
  const [colorCome, setColor] = useState("#6a8565");

  const convDate = () => {
    let date = new Date(event.time);
    return date.toLocaleString();
  };
  return (
    <div>
      <EditDialogEvent
        open={openEditEvent}
        handleClose={handleEditCloseEvent}
        url={"http://localhost:3000/editpost"}
        id={event._id}
        event={event}
        fetchData={fetchData}
      />
      <Card align="center">
        <CardHeader title={event.title} subheader={event.category} />

        <CardContent>
          <List>
            <ListItem disablePadding>
              <ListItemIcon>
                <PlaceIcon />
              </ListItemIcon>
              <ListItemText primary="Místo" secondary={event.location} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <AccessTimeIcon />
              </ListItemIcon>
              <ListItemText
                primary="Čas"
                secondary={convDate(event.time.toLocaleString()).slice(0, -3)}
              />
            </ListItem>
          </List>
          <Box className={classes.dltBtn}>
            <IconButton
              disabled={event.author.name !== localStorage.getItem("user")}
              onClick={() => handleDelete(event._id)}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              disabled={event.author.name !== localStorage.getItem("user")}
              onClick={handleClickEditOpenEvent}
            >
              <EditIcon />
            </IconButton>
          </Box>
        </CardContent>
        <CardActions>
          <Box className={classes.leftAlign}>
            <Button size="large" onClick={handleExpandClick}>
              Kdo přijde {attends.length}
            </Button>
          </Box>
          <Box className={classes.rightAlign}>
            <Button
              size="large"
              variant="contained"
              style={{ backgroundColor: colorCome }}
              onClick={() => {
                fetch("http://localhost:3000/events")
                  .then((res) => res.json())
                  .then((data) => {
                    setEvents(data);
                  });
                join();
              }}
            >
              <DoneIcon></DoneIcon>Přijdu
            </Button>
          </Box>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Grid container spacing={1.5}>
            {attends.map((attend) => (
              <Grid item>
                <AttendanceAvatar
                  key={attend._id}
                  user={attend}
                ></AttendanceAvatar>
              </Grid>
            ))}
          </Grid>
        </Collapse>
      </Card>
    </div>
  );
}

export default Event;
