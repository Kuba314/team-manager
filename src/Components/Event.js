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
  Box,
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
  leftAlign: {
    marginRight: "auto",
  },
  rightAlign: {
    marginLeft: "auto",
  },
});

function Event({ event }) {
  let selgreen = "#67cc62";
  let green = "#6a8565";
  let gray = "#8e918f";
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [colorCome, setColor] = useState("#6a8565");
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
          <Box className={classes.leftAlign}>
            <Button size="large" expand={expanded} onClick={handleExpandClick}>
              Kdo přijde
            </Button>
          </Box>
          <Box className={classes.rightAlign}>
            <Button
              size="large"
              variant="contained"
              style={{ backgroundColor: colorCome }}
              onClick={() => {
                if (colorCome === selgreen) {
                  setColor(green);
                  return;
                }
                setColor(selgreen);
              }}
            >
              <DoneIcon></DoneIcon>Přijdu
            </Button>
          </Box>
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
