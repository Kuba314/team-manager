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
  ListItemButton,
  ListItemText,
  Typography,
  Avatar,
  Collapse,
  Grid,
  Box,
} from "@mui/material";
import AttendanceAvatar from "./AttendanceAvatar";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import EditDialogEvent from "./EditDialogEvent";
const useStyles = makeStyles({
  notComeBtn: {
    //backgroundColor: "",
    backgroundColor: "#856565",
    "&:hover": {
      backgroundColor: "#cc6262",
    },
  },
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
  let gray = "#8e918f";
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

  const [attending, setAttending] = useState();
  const [attends, setAttends] = useState([]);

  const help = () => {
    var filtered = events.find((ldevent) => {
      return ldevent._id === event._id;
    });

    console.log(filtered.attendees);
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
    });

    fetchData();
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
    });
    fetchData();
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
        eventTitle={event.title}
        eventBody={event.location}
        eventCategory={event.body}
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
                secondary={convDate(event.time.toLocaleString())}
              />
            </ListItem>
          </List>
          <Box className={classes.dltBtn}>
            <Button onClick={() => handleDelete(event._id)}>Smazat</Button>
            <Button onClick={handleClickEditOpenEvent}>Edit</Button>
          </Box>
        </CardContent>
        <CardActions>
          <Box className={classes.leftAlign}>
            <Button size="large" onClick={handleExpandClick}>
              Kdo přijde
            </Button>
          </Box>
          <Box className={classes.rightAlign}>
            <Button
              size="large"
              variant="contained"
              style={{ backgroundColor: colorCome }}
              onClick={() => {
                fetchData();
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
              <AttendanceAvatar
                key={attend._id}
                user={attend}
              ></AttendanceAvatar>
            ))}
          </Grid>
        </Collapse>
      </Card>
    </div>
  );
}

export default Event;
