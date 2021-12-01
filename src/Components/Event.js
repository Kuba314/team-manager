import React from "react";
import { useState } from "react";
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
} from "@mui/material";
import AttendanceAvatar from "./AttendanceAvatar";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
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
});

function Event({ event }) {
  let selred = "#eb5e5e";
  let red = "#856565";
  let selgreen = "#67cc62";
  let green = "#6a8565";
  let gray = "#8e918f";
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [colorCome, setColor] = useState("#6a8565");
  const [colorNotCome, setNotColor] = useState("#856565");
  return (
    <div>
      <Card align="center">
        <CardHeader title={event.title} subheader={event.category} />

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
          <Button
            size="large"
            variant="contained"
            style={{ backgroundColor: colorCome }}
            onClick={() => {
              if (colorCome === selgreen) {
                setNotColor(red);
                setColor(green);
                return;
              }
              setColor(selgreen);
              setNotColor(gray);
            }}
          >
            <DoneIcon></DoneIcon>Přijdu
          </Button>
          <Button
            size="large"
            variant="contained"
            style={{ backgroundColor: colorNotCome }}
            onClick={() => {
              if (colorNotCome === selred) {
                setNotColor(red);
                setColor(green);
                return;
              }
              setNotColor(selred);
              setColor(gray);
            }}
          >
            <CloseIcon></CloseIcon>Nepřijdu
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
