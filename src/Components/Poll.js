import React from "react";
import {
  Card,
  List,
  CardHeader,
  CardContent,
  CardActions,
  Box,
  Button,
  ListItem,
  Typography,
} from "@mui/material";
import Graph from "./Graph";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  options: {
    width: "150px",
    height: "50px",
  },
  list: {
    marginTop: "0px",
    marginBottom: "0px",
  },
});

function Polls({ poll, fetchData }) {
  let arr = [];
  const help = (poll) => {
    let mySet = new Set();
    for (const opt of poll.options) {
      let i = 0;
      for (const voter of poll.votes) {
        if (voter.voted_option == opt) {
          i++;
        }
      }
      mySet.add({ option: opt, voted: i });
      //console.log(opt + "voted:" + i);
    }
    arr = Array.from(mySet);
  };
  const classes = useStyles();

  return (
    <div>
      <Card align="center">
        <CardHeader title={poll.prompt} subheader={poll.author.name} />

        <CardContent className={classes.content}>
          <List>
            <Typography>Možnosti</Typography>

            <ListItem>
              {poll.options.map((option) => (
                <Button
                  className={classes.options}
                  variant="outlined"
                  size="large"
                  onClick={() => {
                    console.log(option);
                    fetch("http://localhost:3000/vote", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        poll_id: poll._id,
                        option: option,
                        token: localStorage.getItem("token"),
                      }),
                    })
                      .then(fetchData())
                      .then(help(poll));
                  }}
                >
                  {option}
                </Button>
              ))}
              {poll.options.map((opt) => {
                let i = 0;
                for (const voter of poll.votes) {
                  if (voter.voted_option == opt) {
                    i++;
                  }
                }
                //console.log(opt + "voted:" + i);
                help(poll);
              })}
              {/*<Button
                className={classes.options}
                onClick={() => {
                  //console.log(poll.options);
                  for (const opt of poll.options) {
                    let i = 0;
                    for (const voter of poll.votes) {
                      if (voter.voted_option == opt) {
                        i++;
                      }
                    }
                    //console.log(opt + "voted:" + i);
                  }
                  /*
              for (const voter of poll.votes) {
                console.log(voter.voted_option);
              }*/}
            </ListItem>
            <ListItem>
              {arr.map((res) => (
                <Button className={classes.options} disabled>
                  {/*"option: " + res.option + " votes: " + */ res.voted}
                </Button>
              ))}
            </ListItem>
          </List>
        </CardContent>
        <CardActions>
          <Box>
            <Button size="large">Kdo přijde</Button>
          </Box>
          <Box></Box>
        </CardActions>
      </Card>
    </div>
  );
}

export default Polls;
