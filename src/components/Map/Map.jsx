import React from "react";
import { Circle, Map } from "react-leaflet";
import Skeleton from "../Skeleton/Skeleton.jsx";

const Leaflet = ({
  infectedData,
  infectedOn,
  recoveredData,
  recoveredOn,
  deathData,
  deathOn,
  date,
}) => {
  const position = [35, -40];
  const zoom = 2;
  return (
    <Map center={position} zoom={zoom}>
      {/* <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution={
          '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }
      /> */}
      {/* {infectedOn && <MyCircles data={infectedData} date={date} color="red" />}
      {recoveredOn && (
        <MyCircles data={recoveredData} date={date} color="green" />
      )}
      {deathOn && <MyCircles data={deathData} date={date} color="black" />} */}
    </Map>
  );
};

const MyCircles = (props) =>
  props.data.map((row, i) => {
    if (row[props.date] <= 0) {
      // No cases on this date
      return <Skeleton key={i} />;
    }
    if (row.Lat != null && row.Long != null) {
      return (
        <Circle
          key={i}
          center={[row.Lat, row.Long]}
          radius={1000 * Math.sqrt(row[props.date])}
          fillOpacity={0.5}
          fillColor={props.color}
          stroke={false}
        />
      );
    }
    return <Skeleton key={i} />;
  });

export default Leaflet;
