import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Box,
  Button,
} from "@mui/material";
import Graph from "./Graph";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
    justifyContent: "center",
  },
});
function Polls() {
  const classes = useStyles();
  return (
    <div>
      <Card align="center">
        <CardHeader title={"Anketa"} subheader={"autor"} />

        <CardContent className={classes.content}>
          <Graph></Graph>
        </CardContent>
        <CardActions>
          <Box>
            <Button size="large">Kdo přijde</Button>
          </Box>
          <Box>
            <Button>placeholder</Button>
          </Box>
        </CardActions>
      </Card>
    </div>
  );
}

export default Polls;
