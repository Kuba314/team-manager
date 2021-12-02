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
            <Tab label="Category 1" value={0} />
            <Tab label="Category 2" value={1} />
            <Tab label="Category 3" value={2} />
            <Tab label="Category 4" value={3} />
          </Tabs>
        </Box>
      </Grid>
    </div>
  );
}

export default EventCategories;
