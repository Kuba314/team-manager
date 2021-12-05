/**
 * @file PostCategories.js
 * Projekt: Implementace webové aplikace Team manager.
 * @author Jakub Rozek
 * @brief Categories component to show different categories on DiscussionPage.
 */

import React from "react";
import { Tab, Grid, Box, Tabs } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  tabBox: {
    alignItems: "center",
    justifyContent: "center",
  },
});

function PostCategories({ handleChange, selectedCategory }) {
  const classes = useStyles();
  return (
    <div>
      <Grid className={classes.tabBox} container>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={selectedCategory} onChange={handleChange}>
            <Tab label="Tréninky" value={0} />
            <Tab label="Turnaje" value={1} />
            <Tab label="Hospoda" value={2} />
            <Tab label="Organizace" value={3} />
          </Tabs>
        </Box>
      </Grid>
    </div>
  );
}

export default PostCategories;
