import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import Papa from "papaparse";
import React, { useEffect, useState } from "react";
import DataSelector from "../../components/DataSelector/DataSelector.jsx";
import DateSlider from "../../components/DateSlider/DateSlider.jsx";
import Leaflet from "../../components/Map/Map.jsx";
import { deathUrl, infectedUrl, recoveredUrl } from "../../utils/csvLinks";

const Overtime = ({ setLocation }) => {
  const pullAndParseUrl = (url) => {
    return axios
      .get(url)
      .then((response) => Papa.parse(response.data, { header: true }));
  };
  const [datam, setDatam] = useState({
    infectedData: [],
    deathData: [],
    recoveredData: [],
    date: "1/22/20",
    infectedOn: true,
    deathOn: false,
    recoveredOn: false,
  });

  const handleDateChange = (selectedDate) => {
    this.setState({ date: selectedDate });
  };

  const toggleInfectedData = () => {
    this.setState({ infectedOn: !this.state.infectedOn });
  };

  const toggleRecoveredData = () => {
    this.setState({ recoveredOn: !this.state.recoveredOn });
  };

  const toggleDeathData = () => {
    this.setState({ deathOn: !this.state.deathOn });
  };

  useEffect(() => {
    const parsedInfectedData = pullAndParseUrl(infectedUrl);
    const parsedRecoveredData = pullAndParseUrl(recoveredUrl);
    const parsedDeathData = pullAndParseUrl(deathUrl);
    // eslint-disable-next-line no-undef
    setLocation("overtime");
    parsedInfectedData.then((result) => {
      setDatam((prev, _) => {
        return {
          ...prev,
          infectedData: result.data,
        };
      });
    });

    parsedRecoveredData.then((result) => {
      this.setDatam({ recoveredData: result.data });
    });

    parsedDeathData.then((result) => {
      this.setDatam({ deathData: result.data });
    });
  }, []);

  return (
    <div className="overtime">
      <Grid container justify="center" alignItems="center" spacing={3}>
        <Grid item xs={10} sm={8}>
          <Typography id="title" variant="h4" className="overtime__title">
            Visualizing COVID-19 Over Time
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Leaflet
            infectedData={datam.infectedData}
            infectedOn={datam.infectedOn}
            recoveredData={datam.recoveredData}
            recoveredOn={datam.recoveredOn}
            deathData={datam.deathData}
            deathOn={datam.deathOn}
            date={datam.date}
          />
        </Grid>
        <Grid item xs={8}>
          {datam.date}
          <DateSlider handleDateChange={handleDateChange} />
        </Grid>
        <Grid item xs={8}>
          <DataSelector
            toggleInfectedData={toggleInfectedData}
            infectedOn={datam.infectedOn}
            toggleRecoveredData={toggleRecoveredData}
            recoveredOn={datam.recoveredOn}
            toggleDeathData={toggleDeathData}
            deathOn={datam.deathOn}
          />
        </Grid>
        <Grid item xs={8}>
          <Typography id="title" variant="caption">
            This is a depiction of the spread of COVID-19 over time. We rely on
            the Johns Hopkins CSSE Data Repository, which is updated once a day
            at around 23:59 UTC. For that reason, the most recent data our
            slider allows users to select is yesterday&apos;s.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
