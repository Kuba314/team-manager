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

function Polls({ poll }) {
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
      console.log(opt + "voted:" + i);
    }
    arr = Array.from(mySet);
  };
  const classes = useStyles();

  return (
    <div>
      <Card align="center">
        <CardHeader title={poll.prompt} subheader={poll.author.name} />

        <CardContent className={classes.content}>
          {poll.options.map((option) => (
            <Button
              size="large"
              onClick={() => {
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
                });
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
            console.log(opt + "voted:" + i);
            help(poll);
          })}
          <Button
            onClick={() => {
              //console.log(poll.options);
              for (const opt of poll.options) {
                let i = 0;
                for (const voter of poll.votes) {
                  if (voter.voted_option == opt) {
                    i++;
                  }
                }
                console.log(opt + "voted:" + i);
              }
              /*
              for (const voter of poll.votes) {
                console.log(voter.voted_option);
              }*/
            }}
          >
            test
          </Button>
          <Box>
            {arr.map((res) => (
              <h3>{"option: " + res.option + " votes: " + res.voted}</h3>
            ))}
          </Box>
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
