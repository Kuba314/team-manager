/**
 * @file EventCategories.js
 * Projekt: Implementace webové aplikace Team manager.
 * @author Jakub Kozubek
 * @brief Categories component to show different categories on AttendancePage.
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
function EventCategories({ handleChange, selectedCategory }) {
  const classes = useStyles();
  return (
    <div>
      <Grid className={classes.tabBox} container>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={selectedCategory} onChange={handleChange}>
            <Tab label="Tréninky" value={0} />
            <Tab label="Turnaje" value={1} />
            <Tab label="Teambuilding" value={2} />
          </Tabs>
        </Box>
      </Grid>
    </div>
  );
}

export default EventCategories;
