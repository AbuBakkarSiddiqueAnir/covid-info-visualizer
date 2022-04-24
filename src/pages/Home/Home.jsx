import React, { lazy, Suspense, useEffect } from "react";
import { Skeleton } from "../../components";

const CardList = lazy(() => import("../../components/CardList/CardList.jsx"));
const DataTable = lazy(() =>
  import("../../components/DataTable/DataTable.jsx")
);
const Chart = lazy(() => import("../../components/Chart/Chart.jsx"));

const Home = ({ setLocation }) => {
  useEffect(() => {
    setLocation("home");
  });

  return (
    <div className="homepage">
      <CardList />

      <Suspense fallback={<Skeleton />}>
        <DataTable />
        <Chart />
      </Suspense>
    </div>
  );
};

export default Home;
