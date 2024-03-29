import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { fetchGlobalData, fetchGlobalDayBeforeData } from "../../api";
import { ReactComponent as CasesLogo } from "../../assets/casesv2.svg";
import { ReactComponent as ActiveLogo } from "../../assets/coronav2.svg";
import { ReactComponent as DeathsLogo } from "../../assets/deathv2.svg";
import { ReactComponent as RecoverLogo } from "../../assets/recoverv2.svg";
import DataCard from "../Card/Card.jsx";
import Skeleton from "../Skeleton/Skeleton.jsx";

const useStyles = makeStyles({
  cardContainer: {
    padding: "1rem .75rem",
  },
  logo: {
    width: "3.5em",
    height: "3.5em",
  },
});

const CardList = () => {
  const classes = useStyles();
  const [data, setData] = useState({});
  const [dayBeforeData, setDayBeforeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [firstResponse, secondResponse] = await Promise.all([
        fetchGlobalData(),
        fetchGlobalDayBeforeData(),
      ]);
      const {
        data: { active, cases, deaths, recovered, updated: lastUpdated },
      } = firstResponse;

      const {
        data: {
          cases: dayBeforeCases,
          deaths: dayBeforeDeaths,
          recovered: dayBeforeRecovered,
        },
      } = secondResponse;

      setData({ active, cases, deaths, recovered, lastUpdated });
      setDayBeforeData([dayBeforeCases, dayBeforeDeaths, dayBeforeRecovered]);
    };
    fetchData();
  }, []);

  if (!data.cases || dayBeforeData.length === 0) {
    return <Skeleton />;
  }
  const yesterday = dayBeforeData.reduce(
    (accm, bdata) => accm.concat(Object.keys(bdata)),
    []
  );

  const [yesterdayCases, yesterdayDeaths, yesterdayRecovered] = dayBeforeData;
  const [date] = yesterday;
  const yesterdayActiveCases =
    yesterdayCases[date] - yesterdayDeaths[date] - yesterdayRecovered[date];

  return (
    <div className={classes.cardContainer}>
      <Grid container spacing={3} justify="center">
        <DataCard
          label="total cases"
          todayData={data.cases}
          yesterdayData={yesterdayCases[date]}
          lastUpdated={data.lastUpdated}
        >
          <CasesLogo className={classes.logo} />
        </DataCard>
        <DataCard
          label="total deaths"
          todayData={data.deaths}
          yesterdayData={yesterdayDeaths[date]}
          lastUpdated={data.lastUpdated}
        >
          <DeathsLogo className={classes.logo} />
        </DataCard>
        <DataCard
          label="total recoveries"
          todayData={data.recovered}
          yesterdayData={yesterdayRecovered[date]}
          lastUpdated={data.lastUpdated}
        >
          <RecoverLogo className={classes.logo} />
        </DataCard>
        <DataCard
          label="active cases"
          todayData={data.active}
          yesterdayData={yesterdayActiveCases}
          lastUpdated={data.lastUpdated}
        >
          <ActiveLogo className={classes.logo} />
        </DataCard>
      </Grid>
    </div>
  );
};

export default CardList;
