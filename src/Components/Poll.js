/**
 * @file Poll.js
 * Projekt: Implementace webové aplikace Team manager.
 * @author Josef Škorpík
 * @brief Component for poll shown in PollPage.
 */

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
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
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

function Polls({ poll, setPolls, handleDelete }) {
  const [selected, setSelected] = React.useState();
  const handleSelected = (event, newSelected) => {
    if (newSelected !== null) {
      setSelected(newSelected);
    }
  };
  let arr = [];
  //function for tracking how many votes each option has
  const help = (poll) => {
    let mySet = new Set();
    for (const opt of poll.options) {
      let i = 0;
      for (const voter of poll.votes) {
        if (voter.voted_option === opt) {
          i++;
        }
      }
      mySet.add({ option: opt, voted: i });
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
              <ToggleButtonGroup
                variant="text"
                className={classes.btnGroup}
                value={selected}
                onChange={handleSelected}
                exclusive
              >
                {/*Renders button for each option, while allowing user to click on it to vote*/}
                {poll.options.map((option) => (
                  <ToggleButton
                    className={classes.options}
                    variant="outlined"
                    value={option}
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
                        .then(() => {
                          fetch("http://localhost:3000/polls")
                            .then((res) => res.json())
                            .then((data) => setPolls(data));
                        })
                        .then(help(poll));
                    }}
                  >
                    {option}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              {poll.options.map((opt) => {
                for (const voter of poll.votes) {
                  if (voter.voted_option == opt) {
                  }
                }
                help(poll);
              })}
            </ListItem>
            {/*Shows the current vote count for each option*/}
            <ListItem>
              {arr.map((res) => (
                <Button className={classes.options} disabled>
                  {res.voted}
                </Button>
              ))}
            </ListItem>
          </List>
        </CardContent>
        <CardActions>
          <Box>
            <Button
              size="large"
              disabled={poll.author.name != localStorage.getItem("user")}
              onClick={() => handleDelete(poll._id)}
            >
              Smazat anketu
            </Button>
          </Box>
          <Box></Box>
        </CardActions>
      </Card>
    </div>
  );
}

export default Polls;
