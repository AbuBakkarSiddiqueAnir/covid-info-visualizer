import {
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import {
  getChipBackground,
  getPercentageChange,
  numFormatter,
} from "../../utils/card";

const style = (theme) => ({
  mainData: {
    marginTop: ".25em",
    marginBottom: ".125em",
    fontSize: "2.5rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "2.125rem",
    },
  },
  colorSuccess: {
    color: "#4CAF50",
  },
  cardGrid: {
    padding: "1em !important",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  contentMain: {
    flex: "1 0 auto",
  },
  badgeText: {
    fontWeight: 500,
    marginLeft: ".5em",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  badgeContainer: {
    display: "flex",
    alignItems: "baseline",
    marginTop: "0.5rem",
  },
});

const DataCard = ({
  label,
  todayData,
  lastUpdated,
  yesterdayData,
  classes,
  children,
}) => (
  <Grid item xs={12} md={6} className={classes.cardGrid}>
    <Paper elevation={3} component={Card} variant="outlined">
      <CardContent>
        <div className={classes.content}>
          <div className={classes.contentMain}>
            <Typography
              component="h6"
              variant="subtitle2"
              color="textSecondary"
              gutterBottom
            >
              {label.toUpperCase()}
            </Typography>
            <Typography
              variant="h4"
              component="h3"
              className={`${classes.mainData} ${
                label === "total recoveries" ? classes.colorSuccess : ""
              }`}
            >
              {todayData.toLocaleString()}
            </Typography>
            <Typography color="textSecondary">
              {new Date(lastUpdated).toDateString()}
            </Typography>

            <div className={classes.badgeContainer}>
              <Chip
                label={getPercentageChange(todayData, yesterdayData)}
                style={getChipBackground(todayData, yesterdayData, label)}
                component="span"
              />
              <Typography
                component="span"
                color="textSecondary"
                variant="subtitle1"
                className={classes.badgeText}
              >
                {`from yesterday (${numFormatter(yesterdayData)})`}
              </Typography>
            </div>
          </div>

          <div>{children}</div>
        </div>
      </CardContent>
    </Paper>
  </Grid>
);

export default withStyles(style)(DataCard);
