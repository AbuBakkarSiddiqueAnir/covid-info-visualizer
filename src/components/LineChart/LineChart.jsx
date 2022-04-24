import { makeStyles } from "@material-ui/core/styles";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";

const useStyles = makeStyles({
  chartContainer: {
    position: "relative",
    margin: "auto",
  },
});

const LineChart = ({ casesOrDeaths, name }) => {
  const classes = useStyles();

  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: undefined,
    },
    xAxis: {
      categories: Object.entries(casesOrDeaths).map(([key]) => {
        const event = new Date(key);
        const options = { month: "short", day: "numeric" };
        return event.toLocaleDateString("en-US", options);
      }),
    },
    series: [
      {
        name,
        color: "#33CCFF",
        lineWidth: 5,
        data: Object.entries(casesOrDeaths).map(([, val]) => val),
      },
    ],
    yAxis: {
      title: {
        text: "Total Coronavirus Cases",
      },
    },
  };

  return (
    <div className={classes.chartContainer}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default LineChart;
